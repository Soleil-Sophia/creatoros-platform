
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

if (import.meta.env.DEV) {
  import('./core/dev/coreBootstrap').then(({ runCoreBootstrap }) => {
    runCoreBootstrap();
  });
}

createRoot(document.getElementById("root")!).render(<App />);
  