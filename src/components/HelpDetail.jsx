import { createSignal, createEffect, Show } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import { fetchHelpById } from "../utils/api";
import L from "leaflet"; // Import Leaflet

export function HelpDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [helpData, setHelpData] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);
  const [mapLoaded, setMapLoaded] = createSignal(false);

  createEffect(() => {
    loadHelpData();
  });

  const loadHelpData = async () => {
    if (!params.id) {
      setError("No help ID provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // POST the ID to /helps endpoint and get data from response
      const data = await fetchHelpById(params.id);
      setHelpData(data.request);

      // Initialize map after data is loaded
      if (data.request?.lat && data.request?.lon) {
        initMap(data.request.lat, data.request.lon);
      }
    } catch (err) {
      console.error("Error fetching help details:", err);
      setError("Failed to load help request details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const initMap = (lat, lon) => {
    // Make sure we have the leaflet library loaded
    if (typeof window !== "undefined") {
      if (typeof L === "undefined") {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.integrity =
          "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
        script.crossOrigin = "";

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        link.crossOrigin = "";

        document.head.appendChild(link);
        document.body.appendChild(script);

        script.onload = () => {
          createMap(lat, lon);
          setMapLoaded(true);
        };
      } else {
        createMap(lat, lon);
        setMapLoaded(true);
      }
    }
  };

  const createMap = (lat, lon) => {
    // Clear any existing map
    const mapElement = document.getElementById("map");
    if (mapElement && mapElement.innerHTML) {
      mapElement.innerHTML = "";
    }

    // Create the map
    const map = L.map("map").setView([lat, lon], 15);

    // Add the tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a marker at the help location
    L.marker([lat, lon])
      .addTo(map)
      .bindPopup(helpData()?.name || "Help location")
      .openPopup();
  };

  return (
    <div class="bg-white shadow-md rounded-lg p-6">
      <div class="flex items-center mb-6">
        <button
          onClick={() => navigate("/help-list")}
          class="mr-4 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to List
        </button>
        <h2 class="text-2xl font-bold text-blue-800">Help Request Details</h2>
      </div>

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
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Contact Information
            </h3>

            <div class="space-y-3">
              <div>
                <div class="text-sm text-gray-500">Name</div>
                <div class="font-medium">{helpData().name || "Anonymous"}</div>
              </div>

              <div>
                <div class="text-sm text-gray-500">Phone</div>
                <div class="font-medium">
                  {helpData().phone || "Not provided"}
                </div>
              </div>

              <div>
                <div class="text-sm text-gray-500">Location</div>
                <div class="font-medium">
                  {helpData().city || "Not specified"}
                </div>
              </div>

              <div>
                <div class="text-sm text-gray-500">Note</div>
                <div class="mt-1 p-2 bg-white rounded border border-gray-100">
                  {helpData().note || "No additional notes provided."}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Map Location
            </h3>
            <div
              id="map"
              class="h-64 bg-gray-100 rounded-lg flex items-center justify-center"
            >
              <Show when={!mapLoaded()}>
                <div class="text-gray-500">Loading map...</div>
              </Show>
            </div>
            <div class="mt-2 text-sm text-gray-600">
              Coordinates: {helpData().lat}, {helpData().lon}
            </div>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">Actions</h3>
          <div class="flex space-x-3">
            <button
              onClick={() => (window.location.href = `tel:${helpData().phone}`)}
              class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
              disabled={!helpData().phone}
            >
              Call Now
            </button>
            <button
              onClick={() => navigate("/help-list")}
              class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition"
            >
              Back to List
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}
