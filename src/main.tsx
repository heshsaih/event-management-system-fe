import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./api/config";
import "react-responsive-carousel/lib/styles/carousel.min.css";

document
  .querySelector("html")
  ?.setAttribute("lang", new Intl.Locale(navigator.language).language);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App></App>
  </StrictMode>,
);
