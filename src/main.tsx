import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { runCreatorIntelligenceSelfCheck } from "./core/creator-intelligence/selfCheck";
import "./styles/index.css";

if (import.meta.env.DEV) {
  runCreatorIntelligenceSelfCheck();

  import('./core/dev/coreBootstrap').then(({ runCoreBootstrap }) => {
    runCoreBootstrap();
  }).catch((error) => {
    console.error('Failed to load core bootstrap in development mode', error);
  });
}

createRoot(document.getElementById("root")!).render(<App />);
