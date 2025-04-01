import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { isAuthenticated } from "../utils/auth";

export function ProtectedRoute(props) {
  const navigate = useNavigate();

  createEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  });

  return <>{props.children}</>;
}
