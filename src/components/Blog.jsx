import { createSignal, createEffect, For, Show } from "solid-js";
import { fetchBlogPosts } from "../utils/api";

export function Blog() {
  const [posts, setPosts] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);

  createEffect(async () => {
    try {
      setLoading(true);
      const data = await fetchBlogPosts();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError("Failed to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Emergency Updates & Blog</h1>

      <Show
        when={!loading()}
        fallback={<div class="text-center py-8">Loading blog posts...</div>}
      >
        <Show
          when={!error()}
          fallback={
            <div class="bg-red-100 p-4 rounded text-red-700">{error()}</div>
          }
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <For each={posts()} fallback={<div>No posts available.</div>}>
              {(post) => (
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                  <Show when={post.imageUrl}>
                    <img
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      class="w-full h-48 object-cover"
                    />
                  </Show>
                  <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                      <h2 class="text-xl font-semibold">{post.title}</h2>
                      <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {post.category}
                      </span>
                    </div>
                    <p class="text-gray-600 mb-3 line-clamp-3">
                      {post.content}
                    </p>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <a
                        href={`/blog/${post.id}`}
                        class="text-blue-500 hover:text-blue-700"
                      >
                        Read more →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>
      </Show>
    </div>
  );
}
