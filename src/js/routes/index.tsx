import { createBrowserRouter } from "react-router-dom";

import Home from "@js/pages/Home";

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
]);

export default router;
