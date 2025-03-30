import { API } from "./constants";

export async function submitHelpRequest(data) {
  try {
    const response = await fetch(`${API}/help`, {
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
