import { Link } from "react-router-dom";

// Icons
import { AiOutlineBell } from "react-icons/ai";
import { BsCurrencyPound } from "react-icons/bs";
import { MdOutlineDarkMode } from "react-icons/md";

import { getFormattedDate } from "@js/utilities/date";

const Header = () => {
  const currentDate: Date = new Date();
  const formattedDate: string = getFormattedDate(currentDate);

  return (
    <header className="relative bg-gray-50 shadow text-neutral-800">
      <div className="px-4 py-2 flex justify-between items-center border-b-gray-300">
        <time>{formattedDate}</time>
        <nav className="flex items-center gap-2.5">
          <button
            type="button"
            className="bg-gray-200 rounded-lg p-1.5 hover:bg-neutral-800 hover:text-white transition-colors">
            <MdOutlineDarkMode className="w-5 h-5" />
            <span className="sr-only">Dark Mode</span>
          </button>
          <button
            type="button"
            className="bg-gray-200 rounded-lg p-1.5 hover:bg-neutral-800 hover:text-white transition-colors">
            <AiOutlineBell className="w-5 h-5" />
            <span className="sr-only">Notifications</span>
          </button>
          <button
            type="button"
            className="bg-gray-200 rounded-lg p-1.5 hover:bg-neutral-800 hover:text-white transition-colors">
            <BsCurrencyPound className="w-5 h-5" />
            <span className="sr-only">Default Currency</span>
          </button>
          <div className="border-l border-gray-300 pl-2.5">
            <Link
              to="profile"
              className="bg-neutral-800 rounded-full w-10 h-10 block"></Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
