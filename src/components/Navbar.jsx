import { A } from "@solidjs/router";

export function NavBar() {
  return (
    <nav class="bg-blue-500 p-4 text-white shadow-lg">
      <div class="container mx-auto flex justify-between items-center">
        <A href="/" class="text-xl font-bold">
          Myan Save
        </A>
        <ul class="flex space-x-4">
          <li>
            <A href="/" class="hover:underline" activeClass="underline">
              Home
            </A>
          </li>
          <li>
            <A href="/get-help" class="hover:underline" activeClass="underline">
              Get Help
            </A>
          </li>
          <li>
            <A
              href="/help-list"
              class="hover:underline"
              activeClass="underline"
            >
              Help Lists
            </A>
          </li>
          <li>
            <A href="/about" class="hover:underline" activeClass="underline">
              About
            </A>
          </li>
          <li>
            <A href="/contact" class="hover:underline" activeClass="underline">
              Contact
            </A>
          </li>
        </ul>
      </div>
    </nav>
  );
}
