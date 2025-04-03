import { createSignal, createEffect, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { fetchBlogPostById } from "../utils/api";

export function BlogDetail() {
  const params = useParams();
  const [post, setPost] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);

  createEffect(async () => {
    try {
      setLoading(true);
      const data = await fetchBlogPostById(params.id);
      setPost(data);
    } catch (err) {
      console.error("Error fetching blog post:", err);
      setError("Failed to load blog post. Please try again later.");
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class="max-w-4xl mx-auto">
      <Show
        when={!loading()}
        fallback={<div class="text-center py-8">Loading post...</div>}
      >
        <Show
          when={!error()}
          fallback={
            <div class="bg-red-100 p-4 rounded text-red-700">{error()}</div>
          }
        >
          <Show when={post()} fallback={<div>Post not found</div>}>
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <Show when={post().imageUrl}>
                <div class="relative h-64 md:h-96">
                  <img
                    src={post().imageUrl || "/placeholder.svg"}
                    alt={post().title}
                    class="w-full h-full object-cover"
                  />
                </div>
              </Show>

              <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                  <h1 class="text-3xl font-bold">{post().title}</h1>
                  <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {post().category}
                  </span>
                </div>

                <div class="text-gray-500 mb-6">
                  <span>
                    Posted on {new Date(post().createdAt).toLocaleDateString()}
                  </span>
                  <Show when={post().author}>
                    <span> by {post().author}</span>
                  </Show>
                </div>

                <div class="prose max-w-none">
                  {post()
                    .content.split("\n")
                    .map((paragraph, index) => (
                      <p class="mb-4" key={index}>
                        {paragraph}
                      </p>
                    ))}
                </div>

                <div class="mt-8 pt-6 border-t border-gray-200">
                  <a
                    href="/blog"
                    class="inline-flex items-center text-blue-500 hover:text-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back to all posts
                  </a>
                </div>
              </div>
            </div>
          </Show>
        </Show>
      </Show>
    </div>
  );
}
