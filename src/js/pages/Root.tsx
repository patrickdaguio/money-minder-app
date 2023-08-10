import { Outlet } from "react-router-dom";
import Navigation from "@js/components/Navigation";
import Header from "@js/components/Header";

function RootLayout() {
  return (
    <div className="flex bg-gray-200 h-screen">
      <Navigation />
      <div className="flex-1 h-full overflow-x-hidden overflow-y-auto">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
