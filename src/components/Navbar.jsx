export function NavBar() {
  return (
    <nav class="bg-blue-500 p-4 text-white shadow-lg">
      <div class="container mx-auto flex justify-between items-center">
        <a href="/" class="text-xl font-bold">
          Myan Safe
        </a>
        <ul class="flex space-x-4">
          <li>
            <a href="/" class="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/get-help" class="hover:underline">
              Get Help
            </a>
          </li>
          <li>
            <a href="/help-list" class="hover:underline">
              Help Lists
            </a>
          </li>
          <li>
            <a href="/about" class="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="/contact" class="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
