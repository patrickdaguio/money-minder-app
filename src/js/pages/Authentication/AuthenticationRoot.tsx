import { Outlet } from "react-router-dom";

const AuthenticationRoot = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthenticationRoot;
