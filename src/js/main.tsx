import React from "react";
import ReactDOM from "react-dom/client";
import App from "@js/App";
import "@css/main.pcss";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
