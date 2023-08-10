import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="relative bg-gray-100 shadow-md">
      <div className="px-4 py-5 flex justify-end items-center border-b-slate-400">
        <nav>
          <Link to="profile">Profile</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
