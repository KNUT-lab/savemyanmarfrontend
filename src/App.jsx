import { createSignal, onMount, ErrorBoundary } from "solid-js";
import { Router, Route } from "@solidjs/router";
import { NavBar } from "./components/Navbar";
import { GetHelp } from "./components/GetHelp";
import { HelpList } from "./components/HelpList";
import { HelpDetail } from "./components/HelpDetail";
import { Contact } from "./components/Contact";
import { About } from "./components/About";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Suppliers } from "./components/Suppliers";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AddSuppliers } from "./components/AddSuppliers";
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

function App() {
  const [isLoaded, setIsLoaded] = createSignal(false);

  onMount(() => {
    console.log("App component mounted");
    setIsLoaded(true);
  });

  return (
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
          <Router>
            <Route path="/" component={Home} />
            <Route path="/get-help" component={GetHelp} />
            <Route path="/help-list" component={HelpList} />
            <Route path="/help/:id" component={HelpDetail} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route
              path="/suppliers"
              component={(props) => (
                <ProtectedRoute>
                  <Suppliers {...props} />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/add-supplier"
              component={(props) => (
                <ProtectedRoute>
                  <AddSuppliers {...props} />
                </ProtectedRoute>
              )}
            />
          </Router>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
