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
            <strong>Email:</strong>{" "}
            <a href="mailto:help@myansafe.com">help@myansafe.com</a>
          </p>
          <p class="mb-2">
            <strong>Phone:</strong>{" "}
            <a href="tel:+959770626791">+95 9 770 626 791</a>
          </p>
          <p class="mb-2">
            <strong>Backup Phones:</strong>{" "}
            <a href="tel:+959442152648">+95 9 442 152 648</a> ,
            <a href="tel:+959447799957">+95 9 447 799 957</a>
          </p>
        </div>
      </div>
    </div>
  );
}
