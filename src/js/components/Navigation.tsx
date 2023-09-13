import { Link, NavLink } from "react-router-dom";

// Icons
import { PiPiggyBankFill, PiShootingStarFill } from "react-icons/pi";
import { MdSupervisorAccount, MdCategory } from "react-icons/md";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { HiBanknotes, HiHome } from "react-icons/hi2";

const Navigation = () => {
  return (
    <aside className="w-64 bg-gray-50 flex-shrink-0 border-r border-gray-300">
      <div className="flex flex-col h-full">
        <div className="px-4">
          <h1 className="font-bold py-3 text-2xl border-b border-gray-300 text-slate-800">
            <Link to="">MoneyMinder</Link>
          </h1>
        </div>
        <nav className="flex-1 p-2 mt-2 text-primary">
          <ul className="space-y-2">
            <li>
              <NavLink to="" className="nav-link" end>
                <HiHome />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="income" className="nav-link">
                <GiReceiveMoney />
                <span>Income</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="expense" className="nav-link">
                <GiPayMoney />
                <span>Expense</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="budgets" className="nav-link">
                <HiBanknotes />
                <span>Budgets</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="categories" className="nav-link">
                <MdCategory />
                <span>Categories</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="accounts" className="nav-link">
                <MdSupervisorAccount />
                <span>Accounts</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="subscriptions" className="nav-link">
                <FaMoneyCheckAlt />
                <span>Subscriptions</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="piggy-bank" className="nav-link">
                <PiPiggyBankFill />
                <span>Piggy Bank</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="wish-list" className="nav-link">
                <PiShootingStarFill />
                <span>Wish List</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Navigation;
