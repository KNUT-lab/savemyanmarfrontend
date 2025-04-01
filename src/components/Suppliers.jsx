import { createSignal, onMount } from "solid-js";
import { authHeader } from "../utils/auth";

export function Suppliers() {
  const [suppliers, setSuppliers] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);

  onMount(async () => {
    try {
      // Example of fetching suppliers with authentication
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || ""}/suppliers`,
        {
          headers: {
            ...authHeader(),
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setSuppliers(data);
    } catch (err) {
      console.error("Failed to fetch suppliers:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class="bg-white shadow rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-6">Suppliers</h1>

      {error() && (
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error()}
        </div>
      )}

      {loading() ? (
        <div class="flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {suppliers().length > 0 ? (
                suppliers().map((supplier) => (
                  <tr key={supplier.id}>
                    <td class="px-6 py-4 whitespace-nowrap">{supplier.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      {supplier.contact}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          supplier.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {supplier.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:text-blue-700">
                      <button>View Details</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colspan="4" class="px-6 py-4 text-center text-gray-500">
                    No suppliers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
