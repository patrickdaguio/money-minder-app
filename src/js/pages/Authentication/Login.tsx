import { Link } from "react-router-dom";

import GoogleIcon from "@assets/google.png";

const Login = () => {
  return (
    <>
      <h2 className="text-4xl font-bold text-center mb-8 text-primary">
        Login
      </h2>
      <form className="text-secondary">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="name@company.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Password"
          />
        </div>
        <div className="flex justify-between mb-10">
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              className="accent-secondary"
            />
            <label htmlFor="rememberMe" className="text-sm font-medium">
              Remember me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm hover:text-accent cursor-pointer font-medium text-tertiary transition-colors">
            Forgot Password?
          </Link>
        </div>
        <button
          className="bg-secondary hover:bg-primary transition-colors text-white w-full rounded-md py-3 font-medium outline-none focus:bg-primary"
          type="submit">
          Login
        </button>
      </form>
      <div className="text-center my-4 flex justify-center items-center">
        <div className="border border-gray-200 w-full"></div>
        <span className="px-3 -mt-0.5 text-gray-500">or</span>
        <div className="border border-gray-200 w-full"></div>
      </div>
      <button
        type="button"
        className="border border-gray-300 w-full outline-none focus:border-gray-500 hover:border-gray-500 transition-colors rounded-md py-3 text-secondary font-medium inline-flex items-center justify-center gap-x-4">
        <span className="h-6 block">
          <img className="h-full" src={GoogleIcon} alt="Google icon" />
        </span>
        <span>Log in with Google</span>
      </button>
      <div>
        <p className="text-center mt-16 text-secondary">
          Need an account?{" "}
          <Link
            to="/register"
            className="hover:text-accent font-medium transition-colors text-tertiary">
            Create an account
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
