import { createSignal, For } from "solid-js";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen());
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Get Help", href: "/get-help" },
    { title: "Help Lists", href: "/help-list" },
    { title: "Suppliers", href: "/suppliers" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <nav class="bg-blue-500 p-3 sm:p-4 text-white shadow-lg">
      <div class="container mx-auto flex flex-wrap justify-between items-center">
        <a href="/" class="text-lg sm:text-xl font-bold">
          Myan Safe
        </a>

        {/* Mobile menu button */}
        <button
          class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none transition-colors duration-200"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen()}
          aria-label="Toggle navigation menu"
        >
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen()
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Desktop menu */}
        <ul class="hidden md:flex space-x-4">
          <For each={navItems}>
            {(item) => (
              <li>
                <a
                  href={item.href}
                  class="hover:underline px-2 py-1 rounded hover:bg-blue-600 transition-colors duration-200"
                >
                  {item.title}
                </a>
              </li>
            )}
          </For>
        </ul>

        {/* Mobile menu with animation */}
        <div
          class={`w-full md:hidden mt-2 transition-all duration-300 ease-in-out transform ${
            isMenuOpen()
              ? "opacity-100 max-h-96 translate-y-0"
              : "opacity-0 max-h-0 -translate-y-4 pointer-events-none"
          } overflow-hidden`}
        >
          <ul class="flex flex-col space-y-1 bg-blue-600 p-3 rounded-md">
            <For each={navItems}>
              {(item) => (
                <li>
                  <a
                    href={item.href}
                    class="block hover:bg-blue-700 px-3 py-2 rounded transition-colors duration-200"
                    onClick={closeMenu}
                  >
                    {item.title}
                  </a>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </nav>
  );
}
