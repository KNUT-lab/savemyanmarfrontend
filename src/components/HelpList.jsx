import { createSignal, createEffect, Show, For } from "solid-js";
import { fetchHelpList } from "../utils/api";
import { Pagination } from "./Pagination";
import { useNavigate } from "@solidjs/router";

export function HelpList() {
  const [helpData, setHelpData] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);
  const navigate = useNavigate();

  const loadHelpList = async (pageUrl = null) => {
    setLoading(true);
    try {
      const data = await fetchHelpList(pageUrl);
      console.log("Fetched help data:", data);
      setHelpData(data);
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
    navigate(`/help/${helpId}`);
  };

  return (
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-bold text-blue-800 mb-6">
        အကူအညီတောင်းခံမှုများ
      </h2>

      <Show when={loading()}>
        <div class="flex justify-center my-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Show>

      <Show when={error()}>
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error()}
        </div>
      </Show>

      <Show when={helpData() && !loading()}>
        <div>
          <For each={Object.entries(helpData().results || {})}>
            {([category, requests]) => (
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">
                  {category}
                </h3>

                <Show when={requests.length === 0}>
                  <p class="text-gray-500 italic">
                    No requests in this category
                  </p>
                </Show>

                <For each={requests}>
                  {(request) => (
                    <div class="border border-gray-200 rounded-md p-4 mb-4 hover:bg-gray-50">
                      <div class="flex justify-between items-start">
                        <div>
                          <p class="font-medium">
                            {request.name || "Anonymous"}
                          </p>
                          <p class="text-red-600">
                            လိုအပ်သောအကူအညီ: {request.cat}
                          </p>
                          <p class="text-gray-600">
                            ဖုန်းနံပါတ်: {request.phone_number}
                          </p>
                          <p class="text-gray-600 mt-2">{request.note}</p>
                        </div>
                        <div class="text-sm text-gray-500">
                          {new Date(request.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div class="mt-3 text-sm text-gray-600">
                        Location: {request.latitude}, {request.longitude}
                      </div>
                      <div class="mt-4">
                        <button
                          onClick={() => handleViewDetails(request.id)}
                          class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition text-sm"
                        >
                          အသေးစိတ်ကြည့်ရှုရန်
                        </button>
                      </div>
                    </div>
                  )}
                </For>
              </div>
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
