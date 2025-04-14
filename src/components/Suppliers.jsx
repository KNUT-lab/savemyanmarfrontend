import { createSignal, createEffect, Show, For } from "solid-js";
import { fetchSuppliersList } from "../utils/api";
import { Pagination } from "./Pagination";
import { useNavigate } from "@solidjs/router";

export function Suppliers() {
  const [helpData, setHelpData] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);
  const [activeCategory, setActiveCategory] = createSignal(null);
  const navigate = useNavigate();

  const loadHelpList = async (pageUrl = null) => {
    setLoading(true);
    try {
      const data = await fetchSuppliersList(pageUrl);
      console.log("Backend Paginated?", data.backend_pagination_used)
  
      // Group by all category names instead of only the first
      const grouped = {};
      for (const item of data.results) {
        const categories = item.cat_names || ["Unknown"];
        for (const cat of categories) {
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(item);
        }
      }
  
      setHelpData({
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: grouped,
      });
    } catch (err) {
      console.error("Error fetching help list:", err);
      setError("Failed to load help requests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Load data when component mounts
  createEffect(() => {
    loadHelpList();
  });

  const handlePageChange = (url) => {
    loadHelpList(url);
  };

  const handleViewDetails = (helpId) => {
    navigate(`#`);
  };

  return (
    <div class="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-blue-800">အကူအညီပေးနိုင်သူများ</h2>
        <button
          type="button"
          class="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300 flex items-center gap-2"
          onClick={() => navigate("/add-supplier")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          ထပ်ထည့်ရန်
        </button>
      </div>

      <Show when={loading()}>
        <div class="flex justify-center my-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Show>

      <Show when={error()}>
        <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4">
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error()}
          </div>
        </div>
      </Show>
      <Show when={helpData() && !loading()}>
        <div>
          <div class="mb-6 overflow-x-auto">
            <div class="flex space-x-2">
              <button
                onClick={() => setActiveCategory(null)}
                class={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  activeCategory() === null
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                အားလုံး
              </button>
              <For each={Object.keys(helpData().results || {})}>
                {(category) => (
                  <button
                    onClick={() => setActiveCategory(category)}
                    class={`px-3 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap ${
                      activeCategory() === category
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                )}
              </For>
            </div>
          </div>

          <For each={Object.entries(helpData().results || {})}>
            {([category, requests]) => (
              <Show
                when={
                  activeCategory() === null || activeCategory() === category
                }
              >
                <div class="mb-8">
                  <h3 class="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                    {category}
                  </h3>

                  <Show when={requests.length === 0}>
                    <p class="text-gray-500 italic py-4 text-center bg-gray-50 rounded-md">
                      No requests in this category
                    </p>
                  </Show>

                  <For each={requests}>
                    {(request) => {
                    console.log("request in loop",request); 
                    return (
                      <div class="border border-gray-200 rounded-md p-4 mb-4 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                        <div class="flex justify-between items-start">
                          <div>
                            <p class="font-medium text-lg">
                              {request.name || "Anonymous"}
                            </p>
                            <div class="flex items-center mt-1">
                              <span class="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-2">
                                {request.cat_names.join(", ")}
                              </span>
                              <p class="text-gray-600 text-sm">
                                ဖုန်းနံပါတ်: {request.phone_number}
                              </p>
                            </div>
                            <p class="text-gray-600 mt-2 text-sm">
                              {request.note}
                            </p>
                          </div>
                          <div class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {new Date(request.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <div class="mt-3 text-xs text-gray-500 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {request.latitude}, {request.longitude}
                        </div>
                        <div class="mt-4 flex justify-end">
                          <button
                            onClick={() => handleViewDetails(request.id)}
                            class="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition text-sm flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            အသေးစိတ်ကြည့်ရှုရန်
                          </button>
                        </div>
                      </div>
                    )}}
                  </For>
                </div>
              </Show>
            )}
          </For>

          <Pagination
            count={helpData().count || 0}
            next={helpData().next}
            previous={helpData().previous}
            onPageChange={handlePageChange}
          />
        </div>
      </Show>
    </div>
  );
}
