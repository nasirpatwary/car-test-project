import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "animate.css";
import "./index.css";
import "swiper/css";
import '@smastrom/react-rating/style.css';
import "react-datepicker/dist/react-datepicker.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Router from "./routes/routes";
import { BrowserRouter } from "react-router";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <ToastContainer />
    <AuthProvider>
        <BrowserRouter>
      <QueryClientProvider client={queryClient}>
          <Router />
      </QueryClientProvider>
        </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
