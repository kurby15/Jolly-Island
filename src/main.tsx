
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  const fallbackPath = new URLSearchParams(window.location.search).get("p");

  if (fallbackPath) {
    const baseUrl = import.meta.env.BASE_URL;
    const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const restoredUrl = new URL(fallbackPath, window.location.origin);

    window.history.replaceState(
      {},
      "",
      `${normalizedBase}${restoredUrl.pathname}${restoredUrl.search}${restoredUrl.hash}`,
    );
  }

  createRoot(document.getElementById("root")!).render(<App />);
  