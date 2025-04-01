import { Header } from "./Header";

export function Contact() {
  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto p-3 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-3 sm:mb-4">
          Contact Us
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
          If you have any questions or need assistance, please don't hesitate to
          contact us.
        </p>
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4">
          <p className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
            <strong>Email:</strong>
            <a
              href="mailto:help@myansafe.com"
              title="Send us an email"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <i className="fas fa-envelope text-blue-500"></i>{" "}
              help@myansafe.com
            </a>
          </p>
          <p className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
            <strong>Phone:</strong>
            <a
              href="tel:+959770626791"
              title="Call us"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <i className="fas fa-phone text-green-500"></i> +95 9 770 626 791
            </a>
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm sm:text-base">
            <strong>Backup Phones:</strong>
            <div className="flex flex-wrap gap-2">
              <a
                href="tel:+959442152648"
                title="Call backup phone"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <i className="fas fa-phone text-green-500"></i> +95 9 442 152
                648
              </a>
              <span className="hidden sm:inline">,</span>
              <a
                href="tel:+959447799957"
                title="Call backup phone"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <i className="fas fa-phone text-green-500"></i> +95 9 447 799
                957
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
