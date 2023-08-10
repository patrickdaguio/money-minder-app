import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@js/pages/Root";
import HomePage from "@js/pages/Home";
import Income from "@js/pages/Income";
import Expense from "@js/pages/Expense";
import Budgets from "@js/pages/Budgets";
import Categories from "@js/pages/Categories";
import Accounts from "@js/pages/Accounts";
import Subscriptions from "@js/pages/Subscriptions";
import PiggyBank from "@js/pages/PiggyBank";
import WishList from "@js/pages/WishList";
import Profile from "@js/pages/Profile";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "income",
        element: <Income />,
      },
      {
        path: "expense",
        element: <Expense />,
      },
      {
        path: "budgets",
        element: <Budgets />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "accounts",
        element: <Accounts />,
      },
      {
        path: "subscriptions",
        element: <Subscriptions />,
      },
      {
        path: "piggy-bank",
        element: <PiggyBank />,
      },
      {
        path: "wish-list",
        element: <WishList />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
