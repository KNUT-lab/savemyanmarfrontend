export function NavBar() {
  return (
    <nav class="bg-blue-500 p-4 text-white shadow-lg">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Myan Save</h1>
        <ul class="flex space-x-4">
          <li>
            <a href="#" class="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
