import { createSignal } from "solid-js";
import { createBlogPost } from "../utils/api";

export function CreateBlogPost() {
  const [title, setTitle] = createSignal("");
  const [content, setContent] = createSignal("");
  const [category, setCategory] = createSignal("general");
  const [image, setImage] = createSignal(null);
  const [imagePreview, setImagePreview] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");
  const [success, setSuccess] = createSignal(false);

  const categories = [
    { id: "general", name: "General" },
    { id: "warning", name: "Emergency Warning" },
    { id: "update", name: "Situation Update" },
    { id: "resource", name: "Resource Information" },
    { id: "safety", name: "Safety Tips" },
  ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title() || !content()) {
      setError("Title and content are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("title", title());
      formData.append("content", content());
      formData.append("category", category());
      if (image()) {
        formData.append("image", image());
      }

      await createBlogPost(formData);

      // Reset form
      setTitle("");
      setContent("");
      setCategory("general");
      setImage(null);
      setImagePreview("");
      setSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error creating blog post:", err);
      setError("Failed to create blog post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Create New Blog Post</h1>

      {success() && (
        <div
          class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
          role="alert"
        >
          <p>Blog post created successfully!</p>
        </div>
      )}

      {error() && (
        <div
          class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          role="alert"
        >
          <p>{error()}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} class="bg-white rounded-lg shadow-md p-6">
        <div class="mb-4">
          <label for="title" class="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title()}
            onInput={(e) => setTitle(e.target.value)}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
            required
          />
        </div>

        <div class="mb-4">
          <label for="category" class="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            value={category()}
            onChange={(e) => setCategory(e.target.value)}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div class="mb-4">
          <label for="image" class="block text-gray-700 font-medium mb-2">
            Image (Optional)
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imagePreview() && (
            <div class="mt-2">
              <img
                src={imagePreview() || "/placeholder.svg"}
                alt="Preview"
                class="h-40 object-contain"
              />
            </div>
          )}
        </div>

        <div class="mb-4">
          <label for="content" class="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content()}
            onInput={(e) => setContent(e.target.value)}
            rows="10"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your post content here..."
            required
          ></textarea>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            disabled={loading()}
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading() ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
