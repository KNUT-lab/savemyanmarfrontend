import { createSignal, onMount, createEffect, ErrorBoundary } from "solid-js";
import { LocationForm } from "./components/LocationForm";
import { Header } from "./components/Header";
import { Debug } from "./components/Debug";
import { NavBar } from "./components/Navbar";
// Fallback component for error boundary
function ErrorFallback(props) {
  return (
    <div class="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
      <h2 class="text-lg font-bold mb-2">Something went wrong!</h2>
      <p class="mb-2">{props.error.toString()}</p>
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={props.resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  );
}

function App() {
  const [userLocation, setUserLocation] = createSignal(null);
  const [locationText, setLocationText] = createSignal("သင့်ရဲ့နေရပ်....");
  const [error, setError] = createSignal(null);
  const [isLoaded, setIsLoaded] = createSignal(false);
  const [debugInfo, setDebugInfo] = createSignal({
    componentsLoaded: false,
    locationAttempted: false,
    error: null,
  });

  onMount(() => {
    console.log("App component mounted");
    setDebugInfo((prev) => ({ ...prev, componentsLoaded: true }));
    getLocation();
    setIsLoaded(true);
  });

  createEffect(() => {
    console.log("App render effect, isLoaded:", isLoaded());
  });

  const getLocation = () => {
    setDebugInfo((prev) => ({ ...prev, locationAttempted: true }));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(storeLocation, (err) => {
        console.error("Geolocation error:", err);
        setError(`Geolocation error: ${err.message}`);
        setDebugInfo((prev) => ({ ...prev, error: err.message }));
      });
    } else {
      setLocationText("Geolocation is not supported by this browser.");
      setDebugInfo((prev) => ({ ...prev, error: "Geolocation not supported" }));
    }
  };

  const storeLocation = (position) => {
    console.log("Got location:", position);
    const location = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
    setUserLocation(location);
    showLocation();
  };

  const showLocation = () => {
    const location = userLocation();
    if (location) {
      setLocationText(`Latitude: ${location.lat}, Longitude: ${location.lon}`);
    }
  };

  return (
    <ErrorBoundary
      fallback={(err, reset) => (
        <ErrorFallback error={err} resetErrorBoundary={reset} />
      )}
    >
      <NavBar />
      <div class="container mx-auto px-4 py-8 max-w-md">
        {!isLoaded() ? (
          <div class="text-center">Loading application...</div>
        ) : (
          <>
            <Header />

            {error() && (
              <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error()}
              </div>
            )}

            <LocationForm
              userLocation={userLocation}
              showLocation={showLocation}
            />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
