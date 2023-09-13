import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import { AiOutlineBell } from "react-icons/ai";
import { BsCurrencyPound } from "react-icons/bs";
import { MdOutlineDarkMode } from "react-icons/md";

import { getFormattedDate } from "@js/utilities/date";
import AuthContext from "@js/context/AuthContext";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const currentDate: Date = new Date();
  const formattedDate: string = getFormattedDate(currentDate);

  async function handleLogout() {
    try {
      await authCtx.logout();
      navigate("/login");
    } catch {
      console.log("Failed to logout");
    }
  }

  return (
    <header className="relative bg-gray-50 shadow text-primary">
      <div className="px-4 py-2 flex justify-between items-center border-b-gray-300">
        <time onClick={handleLogout}>{formattedDate}</time>
        <nav className="flex items-center gap-2.5">
          <button
            type="button"
            className="bg-gray-200 rounded-lg p-1.5 hover:bg-primary hover:text-white transition-colors">
            <MdOutlineDarkMode className="w-5 h-5" />
            <span className="sr-only">Dark Mode</span>
          </button>
          <button
            type="button"
            className="bg-gray-200 rounded-lg p-1.5 hover:bg-primary hover:text-white transition-colors">
            <AiOutlineBell className="w-5 h-5" />
            <span className="sr-only">Notifications</span>
          </button>
          <button
            type="button"
            className="bg-gray-200 rounded-lg p-1.5 hover:bg-primary hover:text-white transition-colors">
            <BsCurrencyPound className="w-5 h-5" />
            <span className="sr-only">Default Currency</span>
          </button>
          <div className="border-l border-gray-300 pl-2.5">
            <Link
              to="profile"
              className="bg-primary rounded-full w-10 h-10 block"></Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
