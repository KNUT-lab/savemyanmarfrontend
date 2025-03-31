import { Header } from "./Header";
// Contact page component
export function Contact() {
  return (
    <div>
      <Header />
      <div class="max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-blue-800 mb-4">Contact Us</h2>
        <p class="text-gray-600 mb-4">
          If you have any questions or need assistance, please don't hesitate to
          contact us.
        </p>
        <div class="bg-white shadow-md rounded-lg p-6">
          <p class="mb-2">
            <strong>Email:</strong> <a herf="mailto:contact@myansafe.com">contact@myansafe.com</a>
          </p>
          <p class="mb-2">
            <strong>Phone:</strong> <a herf="tel:+95123456789">+95 123 456 789</a>
          </p>
        </div>
      </div>
    </div>
  );
}
