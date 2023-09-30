import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@js/components/Navigation";
import Header from "@js/components/Header";

import AuthContext from "@js/context/AuthContext";

function RootLayout() {
  const authCtx = useContext(AuthContext);

  return authCtx.currentUser ? (
    <div className="flex bg-gray-200 h-screen">
      <Navigation />
      <div className="flex-1 h-full overflow-x-hidden overflow-y-auto">
        <Header />
        <main className="p-4">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RootLayout;
