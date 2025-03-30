import { API } from "../constants";

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

export async function fetchCities() {
  try {
    const response = await fetch(`${API}/cities`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
}

export async function fetchHelpList(pageUrl = null) {
  try {
    const url = pageUrl || `${API}/helplist`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching help list:", error);
    throw error;
  }
}
