/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App";

// Make sure we're rendering to the correct element
const root = document.getElementById("root");
if (!root) {
  console.error(
    "Root element not found! Make sure there's a <div id='root'></div> in your HTML.",
  );
}

render(() => <App />, root);
