import { createSignal, For } from "solid-js";
import { createBlogPost } from "../utils/api";

export function CreateBlogPost() {
  const [title, setTitle] = createSignal("");
  const [content, setContent] = createSignal("");
  const [category, setCategory] = createSignal("general");
  const [images, setImages] = createSignal([]);
  const [imagePreviews, setImagePreviews] = createSignal([]);
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

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length) {
      setImages([...images(), ...files]);

      // Generate previews for all new files
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews((prev) => [...prev, e.target.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
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

      // Append all images to formData
      images().forEach((image, index) => {
        formData.append(`images`, image); // Use 'images' as the field name
      });
      console.log(formData);
      await createBlogPost(formData);

      // Reset form
      setTitle("");
      setContent("");
      setCategory("general");
      setImages([]);
      setImagePreviews([]);
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
            <For each={categories}>
              {(cat) => <option value={cat.id}>{cat.name}</option>}
            </For>
          </select>
        </div>

        <div class="mb-4">
          <label for="images" class="block text-gray-700 font-medium mb-2">
            Images
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            onChange={handleImagesChange}
            multiple
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {imagePreviews().length > 0 && (
            <div class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              <For each={imagePreviews()}>
                {(preview, index) => (
                  <div class="relative group">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt={`Preview ${index() + 1}`}
                      class="h-40 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index())}
                      class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </For>
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
