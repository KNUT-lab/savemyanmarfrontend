import axios from "axios";
import { API } from "../constants";

// Function to login user
export async function login(username, password) {
  try {
    const response = await axios.post(
      `${API}/login`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    localStorage.setItem("auth_token", response.data.access);
    return response.data;
    //localStorage
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Function to logout user
export function logout() {
  localStorage.removeItem("auth_token");
  // You can add additional cleanup here if needed
}

// Function to check if user is authenticated
export function isAuthenticated() {
  return !!localStorage.getItem("auth_token");
}

// Function to get the auth token
export function getToken() {
  return localStorage.getItem("auth_token");
}

// Add authorization header with JWT token
export function authHeader() {
  const token = getToken();

  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}
