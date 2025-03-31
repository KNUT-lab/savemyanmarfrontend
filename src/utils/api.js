import axios from "axios";
import { API } from "../constants";

export async function submitHelpRequest(data) {
  try {
    const response = await axios.post(`${API}/help`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting help request:", error);
    throw error;
  }
}

export async function fetchCities() {
  try {
    const response = await axios.get(`${API}/cities`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
}

export async function fetchCategories() {
  try {
    const response = await axios.get(`${API}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function fetchHelpList(pageUrl = null) {
  try {
    const url = pageUrl || `${API}/helplist`;
    console.log("Fetching help list from:", url);

    const response = await axios.get(url);
    console.log("Help list response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching help list:", error);
    throw error;
  }
}

export async function fetchHelpById(id) {
  try {
    console.log(`Fetching help details for ID: ${id}`);

    // Change POST to GET
    const response = await axios.get(`${API}/helps/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Help details response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching help details:", error);
    throw error;
  }
}
