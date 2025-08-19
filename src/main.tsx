import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import './i18n';

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <RouterProvider router={AppRoutes} />
    <Toaster position="top-right" />
  </StrictMode>
);
