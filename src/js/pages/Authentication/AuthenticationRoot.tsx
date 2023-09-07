import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import AuthContext from "@js/context/AuthContext";

const AuthenticationRoot = () => {
  const authCtx = useContext(AuthContext);

  if (authCtx.currentUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthenticationRoot;
