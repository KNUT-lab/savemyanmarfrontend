import axios from "axios";
import { API } from "../constants";
import { authHeader } from "./auth";

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include auth token in all requests
apiClient.interceptors.request.use(
  (config) => {
    // Add auth header to the request if available
    const headers = authHeader();
    if (headers.Authorization) {
      config.headers.Authorization = headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Export the original API functions but use the apiClient
export async function submitHelpRequest(data) {
  try {
    const response = await apiClient.post("/help", data);
    //return response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error submitting help request:", error);
    throw error;
  }
}

export async function fetchCities() {
  try {
    const response = await apiClient.get("/cities");
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
}

export async function fetchCategories() {
  try {
    const response = await apiClient.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function fetchHelpList(pageUrl = null) {
  try {
    const url = pageUrl || "/helplist";
    console.log("Fetching help list from:", url);

    const response = await apiClient.get(url);
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
    const response = await apiClient.get(`/helps/${id}`);
    console.log("Help details response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching help details:", error);
    throw error;
  }
}

// Add this new function for submitting comments
export async function submitComment(helpId, commentText) {
  try {
    const response = await apiClient.post(`/helps/${helpId}/submitComments`, {
      text: commentText,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
}

// Add this function to fetch comments for a help request
export async function fetchComments(helpId) {
  try {
    const response = await apiClient.get(`/helps/${helpId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}
export async function fetchSuppliersList(pageUrl = null) {
  try {
    const url = pageUrl || "/generalsuppliers";
    console.log("Fetching supplers list from:", url);

    const response = await apiClient.get(url);
    console.log("Supplers list response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching supplers list:", error);
    throw error;
  }
}

// Blog related API functions
export async function fetchBlogPosts() {
  try {
    const response = await apiClient.get("/blog");
    return response.data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
}

export async function fetchBlogPostById(id) {
  try {
    const response = await apiClient.get(`/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog post with ID ${id}:`, error);
    throw error;
  }
}

export async function createBlogPost(formData) {
  try {
    // Use multipart/form-data for file uploads
    const response = await axios.post(`${API}/blog`, formData, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
}

export async function updateBlogPost(id, formData) {
  try {
    const response = await axios.put(`${API}/blog/${id}`, formData, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating blog post with ID ${id}:`, error);
    throw error;
  }
}

export async function deleteBlogPost(id) {
  try {
    const response = await apiClient.delete(`/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog post with ID ${id}:`, error);
    throw error;
  }
}
