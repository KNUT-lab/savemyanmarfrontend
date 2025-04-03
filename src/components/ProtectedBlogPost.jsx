import { createEffect, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { isAuthenticated } from "../utils/auth";

export function ProtectedBlogPost(props) {
  const navigate = useNavigate();

  createEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { state: { returnUrl: "/blog/create" } });
    }
  });

  return <Show when={isAuthenticated()}>{props.children}</Show>;
}
