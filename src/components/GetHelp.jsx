import { createSignal, onMount } from "solid-js";
import { LocationForm } from "./LocationForm";

export function GetHelp() {
  const [userLocation, setUserLocation] = createSignal(null);
  const [locationText, setLocationText] = createSignal(
    "သင့်ရဲ့နေရပ် ရယူနေသည်....",
  );

  onMount(() => {
    getLocation();
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(storeLocation, (err) => {
        console.error("Geolocation error:", err);
      });
    } else {
      setLocationText("Geolocation is not supported by this browser.");
    }
  };

  const storeLocation = (position) => {
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
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-bold text-blue-800 mb-6">
        အကူအညီတောင်းခံရန် / Request Emergency Help
      </h2>
      <p class="mb-4 text-gray-600">{locationText()}</p>
      <LocationForm userLocation={userLocation} showLocation={showLocation} />
    </div>
  );
}
