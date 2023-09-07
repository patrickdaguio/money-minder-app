import { FormEvent, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import GoogleIcon from "@assets/google.png";
import AuthContext from "@js/context/AuthContext";
import { FirebaseError } from "firebase/app";

const Login = () => {
  const [formError, setFormError] = useState("");
  const loginEmail = useRef<HTMLInputElement>(null);
  const loginPassword = useRef<HTMLInputElement>(null);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!loginEmail.current || !loginPassword.current) return;

    try {
      setFormError("");
      await authCtx.login(
        loginEmail.current.value,
        loginPassword.current.value
      );
      navigate("/", { replace: true });
    } catch (error) {
      const err = error instanceof FirebaseError;
      if (err) {
        if (error.code === "auth/user-not-found")
          setFormError("Failed to log in: User not found.");
        else if (error.code === "auth/wrong-password")
          setFormError("Failed to log in: Password is incorrect.");
      }
    }
  }

  async function loginWithGoogle() {
    try {
      await authCtx.signInWithGoogle();
    } catch (error) {
      const err = error instanceof FirebaseError;
      if (err) {
        console.error(error);
        setFormError(error.message);
      }
    }
  }

  return (
    <>
      <h2 className="text-4xl font-bold text-center mb-8 text-primary">
        Login
      </h2>
      {formError && (
        <p className="bg-red-200 text-red-600 font-medium py-1.5 px-2.5 mb-6 rounded-md">
          {formError}
        </p>
      )}
      <form className="text-secondary" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            ref={loginEmail}
            autoComplete="email"
            placeholder="name@company.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            required
            ref={loginPassword}
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
        onClick={loginWithGoogle}
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
