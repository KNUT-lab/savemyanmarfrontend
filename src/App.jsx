import { createSignal, onMount, ErrorBoundary } from "solid-js";
import { Router, Route, A } from "@solidjs/router";
import { Header } from "./components/Header";
import { NavBar } from "./components/Navbar";
import { GetHelp } from "./components/GetHelp";
import { HelpList } from "./components/HelpList";

// Fallback component for error boundary
function ErrorFallback(props) {
  return (
    <div class="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
      <h2 class="text-lg font-bold mb-2">Something went wrong!</h2>
      <p class="mb-2">{props.error.toString()}</p>
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={props.resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  );
}

// Home page component
function Home() {
  return (
    <div class="text-center">
      <Header />
      <div class="max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-blue-800 mb-4">
          Welcome to Myan Save
        </h2>
        <p class="text-gray-600 mb-6">
          Myan Save is an emergency response platform for Myanmar. We connect
          people in need with emergency services and resources.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-blue-50 p-6 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold text-blue-700 mb-2">Need Help?</h3>
            <p class="mb-4">Request emergency assistance and resources.</p>
            <A
              href="/get-help"
              class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Get Help Now
            </A>
          </div>
          <div class="bg-blue-50 p-6 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold text-blue-700 mb-2">
              View Help Requests
            </h3>
            <p class="mb-4">See current emergency requests in your area.</p>
            <A
              href="/help-list"
              class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            >
              View Help Lists
            </A>
          </div>
        </div>
      </div>
    </div>
  );
}

// About page component
function About() {
  return (
    <div>
      <Header />
      <div class="max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-blue-800 mb-4">About Myan Save</h2>
        <p class="text-gray-600 mb-4">
          Myan Save is an emergency response platform designed to help people in
          Myanmar during times of crisis. Our mission is to connect those in
          need with available resources and emergency services.
        </p>
      </div>
    </div>
  );
}

// Contact page component
function Contact() {
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
            <strong>Email:</strong> contact@myansave.org
          </p>
          <p class="mb-2">
            <strong>Phone:</strong> +95 123 456 789
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isLoaded, setIsLoaded] = createSignal(false);

  onMount(() => {
    console.log("App component mounted");
    setIsLoaded(true);
  });

  return (
    <Router>
      <ErrorBoundary
        fallback={(err, reset) => (
          <ErrorFallback error={err} resetErrorBoundary={reset} />
        )}
      >
        <NavBar />
        <div class="container mx-auto px-4 py-8 max-w-4xl">
          {!isLoaded() ? (
            <div class="text-center">Loading application...</div>
          ) : (
            <>
              <Route path="/" component={Home} />
              <Route path="/get-help" component={GetHelp} />
              <Route path="/help-list" component={HelpList} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
            </>
          )}
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
