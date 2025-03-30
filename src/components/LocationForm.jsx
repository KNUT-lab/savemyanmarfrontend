import { createSignal } from "solid-js";
import { submitHelpRequest } from "../utils/api";

export function LocationForm(props) {
  const [formData, setFormData] = createSignal({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [submitError, setSubmitError] = createSignal(null);
  const [submitSuccess, setSubmitSuccess] = createSignal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData(),
      [name]: value,
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    props.showLocation();

    const location = props.userLocation();
    const submitData = {
      ...formData(),
      lat: location?.lat || "",
      lon: location?.lon || "",
    };

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await submitHelpRequest(submitData);
      setSubmitSuccess(true);

      // Reset form after successful submission
      setFormData({
        name: "",
        phone: "",
        address: "",
        comment: "",
      });
    } catch (error) {
      setSubmitError("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={submitForm} class="bg-white shadow-md rounded-lg p-6">
      {submitSuccess() && (
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Your help request has been submitted successfully!
        </div>
      )}

      {submitError() && (
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {submitError()}
        </div>
      )}

      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData().name}
          onInput={handleChange}
          required
          disabled={isSubmitting()}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="phone" class="block text-gray-700 font-medium mb-2">
          Phone:
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData().phone}
          onInput={handleChange}
          required
          disabled={isSubmitting()}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="address" class="block text-gray-700 font-medium mb-2">
          Address:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData().address}
          onInput={handleChange}
          required
          disabled={isSubmitting()}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your address"
        />
      </div>

      <div class="mb-4">
        <label for="comment" class="block text-gray-700 font-medium mb-2">
          Comment:
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

      <input
        type="hidden"
        id="latField"
        name="lat"
        value={props.userLocation()?.lat || ""}
      />
      <input
        type="hidden"
        id="lonField"
        name="lon"
        value={props.userLocation()?.lon || ""}
      />

      <button
        type="submit"
        disabled={isSubmitting()}
        class={`w-full font-bold py-2 px-4 rounded-md transition duration-300 ${
          isSubmitting()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isSubmitting() ? "Submitting..." : "အကူအညီရယူရန်"}
      </button>
    </form>
  );
}
