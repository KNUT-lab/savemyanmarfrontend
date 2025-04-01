import { createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { login } from "../utils/auth";
import { Header } from "./Header";

export function Login() {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  createEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      navigate("/suppliers", { replace: true });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username() || !password()) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoading(true);
      const response = await login(username(), password());
      if (response.access) {
        localStorage.setItem("auth_token", response.access);
        navigate("/suppliers", { replace: true });
      } else {
        setError("Authentication failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-6 space-y-6">
      <Header />
      <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <h2 class="text-center text-3 xl font-bold text-gray-900">Sign in</h2>
        {error() && (
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
            {error()}
          </div>
        )}
        <form class="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              value={username()}
              onInput={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading()}
            class="w-full py-3 text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
          >
            {loading() ? (
              <>
                <svg
                  class="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
