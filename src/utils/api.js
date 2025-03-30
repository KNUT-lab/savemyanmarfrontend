// API URL configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_ENDPOINTS = {
  HELP_REQUESTS: `${API_BASE_URL}${import.meta.env.VITE_API_HELP_ENDPOINT}`,
};

// API helper function for submitting help requests
export async function submitHelpRequest(data) {
  try {
    const response = await fetch(API_ENDPOINTS.HELP_REQUESTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting help request:", error);
    throw error;
  }
}
