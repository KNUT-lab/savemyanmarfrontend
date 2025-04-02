import { createSignal, onMount, createEffect, For } from "solid-js";
import { submitHelpRequest, fetchCities, fetchCategories } from "../utils/api";
import { useNavigate } from "@solidjs/router";

export function AddSuppliers() {
  const [userLocation, setUserLocation] = createSignal(null);
  const [locationText, setLocationText] = createSignal(
    "သင့်ရဲ့နေရပ် ရယူနေသည်....",
  );
  const [locationStatus, setLocationStatus] = createSignal("loading"); // loading, success, error
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [submitError, setSubmitError] = createSignal(null);
  const [submitSuccess, setSubmitSuccess] = createSignal(false);
  const [cities, setCities] = createSignal([]);
  const [categories, setCategories] = createSignal([]);
  const [selectedCategories, setSelectedCategories] = createSignal([]);
  const navigate = useNavigate();

  onMount(() => {
    getLocation();
  });

  const getLocation = () => {
    setLocationStatus("loading");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(storeLocation, (err) => {
        console.error("Geolocation error:", err);
        setLocationStatus("error");
        setLocationText(
          "တည်နေရာရယူရန် မအောင်မြင်ပါ။ ကျေးဇူးပြု၍ ခွင့်ပြုချက်စစ်ဆေးပါ။",
        );
      });
    } else {
      setLocationStatus("error");
      setLocationText("Geolocation is not supported by this browser.");
    }
  };

  const storeLocation = (position) => {
    const location = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
    setUserLocation(location);
    setLocationStatus("success");
    showLocation();
  };

  const showLocation = () => {
    const location = userLocation();
    if (location) {
      setLocationText(
        `Latitude: ${location.lat.toFixed(6)}, Longitude: ${location.lon.toFixed(6)}`,
      );
    }
  };

  const [formData, setFormData] = createSignal({
    id: "",
    name: "",
    phone: "",
    address: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData(),
      [name]: value,
    });
  };

  const toggleCategory = (categoryId) => {
    const current = selectedCategories();
    if (current.includes(categoryId)) {
      setSelectedCategories(current.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...current, categoryId]);
    }
  };

  createEffect(async () => {
    try {
      const data = await fetchCities();
      setCities(data.cities || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
    try {
      const data = await fetchCategories();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  });

  const submitForm = async (event) => {
    event.preventDefault();

    if (selectedCategories().length === 0) {
      setSubmitError("ကျေးဇူးပြု၍ အနည်းဆုံး အကူအညီအမျိုးအစားတစ်ခု ရွေးချယ်ပါ။");
      return;
    }

    const location = userLocation();
    if (!location) {
      setSubmitError(
        "တည်နေရာရယူရန် မအောင်မြင်ပါ။ ကျေးဇူးပြု၍ ထပ်မံကြိုးစားပါ။",
      );
      return;
    }

    const submitData = {
      ...formData(),
      cat: selectedCategories().join(","), // Join multiple categories with comma
      lat: location.lat,
      lon: location.lon,
    };

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await submitHelpRequest(submitData);
      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Reset form after successful submission
      setFormData({
        id: "",
        name: "",
        phone: "",
        address: "",
        comment: "",
      });
      setSelectedCategories([]);
    } catch (error) {
      setSubmitError("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div class="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold text-blue-800 mb-6">အကူအညီပေးရန်</h2>

      <div
        class={`mb-6 p-4 rounded-lg flex items-center ${
          locationStatus() === "loading"
            ? "bg-blue-50 text-blue-700"
            : locationStatus() === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
        }`}
      >
        <div class="mr-3">
          {locationStatus() === "loading" && (
            <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
          )}
          {locationStatus() === "success" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {locationStatus() === "error" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <p class="text-sm">{locationText()}</p>
        {locationStatus() === "error" && (
          <button
            onClick={getLocation}
            class="ml-auto text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded"
          >
            ပြန်လည်ကြိုးစားရန်
          </button>
        )}
      </div>

      <form onSubmit={submitForm} class="space-y-6">
        {submitSuccess() && (
          <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm">အကူအညီပေးသူ ထည့်ခြင်း အောင်မြင်ပါတယ်</p>
                <div class="mt-2">
                  <a
                    href="/suppliers"
                    class="text-sm font-medium text-green-800 underline hover:text-green-900"
                  >
                    List ကို ကြည့်ရန်
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {submitError() && (
          <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm">{submitError()}</p>
              </div>
            </div>
          </div>
        )}

        <div class="space-y-4">
          <div>
            <label for="name" class="block text-gray-700 font-medium mb-2">
              နာမည်:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData().name}
              onInput={handleChange}
              disabled={isSubmitting()}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label for="phone" class="block text-gray-700 font-medium mb-2">
              ဖုန်းနံပါတ်:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData().phone}
              onInput={handleChange}
              disabled={isSubmitting()}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label for="address" class="block text-gray-700 font-medium mb-2">
              လိပ်စာ:
            </label>
            <select
              id="cities"
              name="address"
              value={formData().address}
              onChange={(e) =>
                setFormData({ ...formData(), address: e.target.value })
              }
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">မြို့နယ်ရွေးချယ်ရန်</option>
              <For each={cities()}>
                {(city) => <option value={city.id}>{city.name}</option>}
              </For>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-2">
              လိုအပ်သောအကူအညီ: (တစ်ခုထက်ပို၍ ရွေးချယ်နိုင်သည်)
            </label>
            <div class="grid grid-cols-2 gap-2 mt-2">
              <For each={categories()}>
                {(category) => (
                  <div
                    class={`border rounded-md p-3 cursor-pointer transition-colors ${
                      selectedCategories().includes(category.id)
                        ? "bg-blue-50 border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        checked={selectedCategories().includes(category.id)}
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        onChange={() => {}} // SolidJS requires this even though we handle it in the div onClick
                      />
                      <label
                        for={`category-${category.id}`}
                        class="ml-2 block text-sm text-gray-900 cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  </div>
                )}
              </For>
            </div>
            {selectedCategories().length > 0 && (
              <div class="mt-2 text-sm text-gray-500">
                ရွေးချယ်ထားသော အကူအညီအမျိုးအစား: {selectedCategories().length}
              </div>
            )}
          </div>

          <div>
            <label for="comment" class="block text-gray-700 font-medium mb-2">
              အကြောင်းအရာ:
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData().comment}
              onInput={handleChange}
              disabled={isSubmitting()}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            ></textarea>
          </div>
        </div>

        <input
          type="hidden"
          id="latField"
          name="lat"
          value={userLocation()?.lat || ""}
        />
        <input
          type="hidden"
          id="lonField"
          name="lon"
          value={userLocation()?.lon || ""}
        />

        <div class="space-y-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting() || locationStatus() === "error"}
            class={`w-full font-bold text-xl py-4 px-4 rounded-md transition duration-300 flex items-center justify-center ${
              isSubmitting() || locationStatus() === "error"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {isSubmitting() ? (
              <>
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Submitting...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                အကူအညီပေးရန်
              </>
            )}
          </button>
          <button
            type="button"
            class="w-full font-medium py-3 px-4 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300 flex items-center justify-center"
            onClick={() => navigate("/suppliers")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            မထည့်တော့ပါ
          </button>
        </div>
      </form>
    </div>
  );
}
