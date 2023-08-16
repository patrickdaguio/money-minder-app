import { Link } from "react-router-dom";

import GoogleIcon from "@assets/google.png";

const Register = () => {
  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-primary">Sign up</h2>
        <p className="text-secondary/80">
          Are you ready to take control your finances? Look no further than
          MoneyMinder
        </p>
      </div>
      <form className="text-secondary">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Your name"
          />
        </div>
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
        <button
          className="bg-tertiary hover:bg-accent transition-colors text-white w-full rounded-md py-3 font-medium outline-none mt-4 focus:bg-accent"
          type="submit">
          Create Account
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
        <span>Sign up with Google</span>
      </button>
      <div>
        <p className="text-center mt-16 text-secondary">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="hover:text-accent font-medium transition-colors text-tertiary">
            Log in
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
