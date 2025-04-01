import { createSignal, createEffect, onMount, Show, For } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import { fetchHelpById, submitComment, fetchComments } from "../utils/api";
import { SolidLeafletMap } from "solidjs-leaflet";
import { isAuthenticated } from "../utils/auth";

export function HelpDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [helpData, setHelpData] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);
  const [mapLoaded, setMapLoaded] = createSignal(false);
  const [mapInstance, setMapInstance] = createSignal(null);
  const [comments, setComments] = createSignal([]);
  const [newComment, setNewComment] = createSignal("");
  const [submittingComment, setSubmittingComment] = createSignal(false);
  const [loadingComments, setLoadingComments] = createSignal(false);

  // Reference to map container
  let mapContainer;

  onMount(() => {
    // First load the data
    loadHelpData();
    // Load comments separately
    loadComments();
  });

  // Effect to initialize map when data is ready
  createEffect(() => {
    if (
      !loading() &&
      helpData() &&
      helpData()?.lat &&
      helpData()?.lon &&
      window.google &&
      window.google.maps
    ) {
      console.log("Conditions met for map initialization");
      // Use requestAnimationFrame to ensure DOM is ready
      window.requestAnimationFrame(() => {
        setTimeout(() => {
          initMap(helpData().lat, helpData().lon);
        }, 300);
      });
    }
  });

  const loadHelpData = async () => {
    if (!params.id) {
      setError("No help ID provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchHelpById(params.id);
      setHelpData(data.request);
    } catch (err) {
      console.error("Error fetching help details:", err);
      setError("Failed to load help request details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    if (!params.id) return;

    setLoadingComments(true);
    try {
      const data = await fetchComments(params.id);
      setComments(data.comments || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      // We don't set an error state here to avoid disrupting the main UI
    } finally {
      setLoadingComments(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment().trim() || submittingComment()) return;

    setSubmittingComment(true);

    try {
      const response = await submitComment(params.id, newComment());
      setComments([
        ...comments(),
        {
          id: response.id || Date.now(),
          text: newComment(),
          author: response.author || "You",
          timestamp: response.timestamp || new Date().toISOString(),
        },
      ]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Failed to post comment. Please try again.");
    } finally {
      setSubmittingComment(false);
    }
  };

  const goBackToList = () => {
    navigate("/help-list");
  };

  // Mock initMap function to resolve the error.  In a real application,
  // this would be replaced with the actual map initialization logic.
  const initMap = (lat, lon) => {
    console.log(`Initializing map at ${lat}, ${lon}`);
    // In a real application, you would initialize your map here.
    // For example, if you were using Google Maps:
    // const map = new google.maps.Map(mapContainer, {
    //   center: { lat: lat, lng: lon },
    //   zoom: 12
    // });
  };

  return (
    <div class="bg-white shadow-md rounded-lg p-3 sm:p-6 mx-auto max-w-7xl">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <button
          onClick={goBackToList}
          class="mb-3 sm:mb-0 mr-4 text-blue-600 hover:text-blue-800 flex items-center text-sm sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 sm:h-5 sm:w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>စာရင်းသို့ပြန်သွားရန်</span>
        </button>
        <h2 class="text-xl sm:text-2xl font-bold text-blue-800 text-center sm:text-right">
          အကူအညီလိုသူရဲ့အသေးစိတ်အချက်အလက်များ
        </h2>
      </div>

      <Show when={loading()}>
        <div class="flex justify-center my-6 sm:my-8">
          <div class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-500"></div>
        </div>
      </Show>

      <Show when={error()}>
        <div class="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded mb-4 text-sm sm:text-base">
          {error()}
        </div>
      </Show>

      <Show when={helpData() && !loading()}>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div class="bg-gray-50 p-3 sm:p-4 rounded-lg order-2 md:order-1">
            <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 border-b pb-2">
              ဆက်သွယ်ရန် အချက်အလက်များ
            </h3>

            <div class="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <div>
                <div class="text-xs sm:text-sm text-gray-500">နာမည်</div>
                <div class="font-medium">{helpData().name || "Anonymous"}</div>
              </div>

              <div>
                <div class="text-xs sm:text-sm text-gray-500">ဖုန်းနံပါတ်</div>
                <div class="font-medium">
                  {helpData().phone || "Not provided"}
                </div>
              </div>

              <div>
                <div class="text-xs sm:text-sm text-gray-500">မြို့</div>
                <div class="font-medium">
                  {helpData().city || "Not specified"}
                </div>
              </div>

              <div>
                <div class="text-xs sm:text-sm text-gray-500">အကြောင်းအရာ</div>
                <div class="mt-1 p-2 bg-white rounded border border-gray-100 text-sm sm:text-base break-words">
                  {helpData().note || "No additional notes provided."}
                </div>
              </div>
            </div>
          </div>

          <div class="order-1 md:order-2">
            <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">
              တည်နေရာ
            </h3>
            <div
              ref={mapContainer}
              class="h-48 sm:h-56 md:h-64 bg-gray-100 rounded-lg flex items-center justify-center w-full"
              style="min-height: 250px; position: relative; overflow: hidden;"
            >
              <SolidLeafletMap
                center={[helpData().lat, helpData().lon]}
                id="map"
                zoom={17}
                onMapReady={(l, m) => {
                  const icon = l.icon({
                    iconUrl:
                      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                    shadowUrl:
                      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                  });
                  const marker = l
                    .marker([helpData().lat, helpData().lon], {
                      icon,
                    })
                    .addTo(m);
                  marker.bindPopup("Hello World!");
                }}
              />
            </div>
            <div class="mt-2 text-xs sm:text-sm text-gray-600">
              Coordinates: {helpData()?.lat || "-"}, {helpData()?.lon || "-"}
            </div>
          </div>
        </div>

        {/* Improved Actions Section */}
        <div class="mt-6 pt-4 border-t">
          <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-3">
            Actions
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => (window.location.href = `tel:${helpData().phone}`)}
              class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition text-sm sm:text-base flex items-center justify-center"
              disabled={!helpData().phone}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              အခုဆက်သွယ်ရန်
            </button>
            <button
              onClick={goBackToList}
              class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition text-sm sm:text-base flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              List သို့ပြန်သွားရန်
            </button>
          </div>
        </div>

        {/* Improved Comments Section */}
        <div class="mt-6 pt-4 border-t">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base sm:text-lg font-semibold text-gray-800">
              Comments
            </h3>
            <div class="text-sm text-gray-500">
              {comments().length}{" "}
              {comments().length === 1 ? "comment" : "comments"}
            </div>
          </div>

          {/* Comments list with improved styling */}
          <div class="space-y-4 mb-6">
            <Show when={loadingComments()}>
              <div class="flex justify-center py-4">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            </Show>

            <Show when={!loadingComments() && comments().length === 0}>
              <div class="bg-gray-50 p-4 rounded-md text-center">
                <p class="text-gray-500 text-sm">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            </Show>

            <For each={comments()}>
              {(comment) => (
                <div class="bg-gray-50 p-4 rounded-md">
                  <div class="flex justify-between items-start mb-2">
                    <div class="flex items-center">
                      <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-2">
                        {comment.author
                          ? comment.author.charAt(0).toUpperCase()
                          : "U"}
                      </div>
                      <span class="font-medium">
                        {comment.author || "User"}
                      </span>
                    </div>
                    <span class="text-xs text-gray-500">
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p class="text-sm text-gray-700">{comment.text}</p>
                </div>
              )}
            </For>
          </div>

          {/* Comment form with improved styling */}
          <Show
            when={isAuthenticated()}
            fallback={
              <div class="bg-blue-50 p-4 rounded-md flex flex-col sm:flex-row items-center justify-between">
                <p class="text-sm text-blue-700 mb-3 sm:mb-0">
                  Please log in to post a comment
                </p>
                <button
                  onClick={() => navigate("/login")}
                  class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md w-full sm:w-auto"
                >
                  Log In to Comment
                </button>
              </div>
            }
          >
            <form onSubmit={handleCommentSubmit} class="space-y-3">
              <div>
                <label
                  for="comment"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Add a comment
                </label>
                <textarea
                  id="comment"
                  value={newComment()}
                  onInput={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  class="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              </div>
              <div class="flex justify-end">
                <button
                  type="submit"
                  disabled={!newComment().trim() || submittingComment()}
                  class="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-md text-sm flex items-center"
                >
                  {submittingComment() ? (
                    <>
                      <div class="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Posting...
                    </>
                  ) : (
                    "Post Comment"
                  )}
                </button>
              </div>
            </form>
          </Show>
        </div>
      </Show>
    </div>
  );
}
