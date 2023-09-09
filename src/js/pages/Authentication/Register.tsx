import { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "@js/context/AuthContext";
import GoogleIcon from "@assets/google.png";
import useForm from "@js/hooks/useForm";
import {
  requiredValidation,
  emailValidation,
  passwordValidation,
} from "@js/utilities/formValidation";

import ErrorMessage from "@js/components/ErrorMessage";

const Register = () => {
  const nameInput = useForm([requiredValidation]);
  const passwordInput = useForm([requiredValidation, passwordValidation]);
  const emailInput = useForm([requiredValidation, emailValidation]);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isFormValid =
    nameInput.isValid &&
    emailInput.isValid &&
    passwordInput.isValid &&
    !formError;

  const authCtx = useContext(AuthContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isFormValid) {
      nameInput.formInputBlurHandler();
      passwordInput.formInputBlurHandler();
      emailInput.formInputBlurHandler();
      return;
    }

    try {
      setFormError("");
      setIsLoading(true);
      await authCtx.signUp(emailInput.value, passwordInput.value);
      await authCtx.addUserDisplayName(nameInput.value);
      navigate("/", { replace: true });
    } catch {
      setFormError("Failed to create an account. Try again later.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-primary">Sign up</h2>
          <p className="text-secondary/80">
            Are you ready to take control your finances? Look no further than
            MoneyMinder
          </p>
        </div>
        {formError && (
          <p className="bg-red-200 text-red-600 font-medium py-1.5 px-2.5 mb-6 rounded-md">
            {formError}
          </p>
        )}
        <form className="text-secondary" onSubmit={handleSubmit}>
          <div
            className={nameInput.hasError ? "form-group error" : "form-group"}>
            <label htmlFor="name">Name</label>
            {nameInput.hasError && nameInput.activeErrorIndex !== null && (
              <ErrorMessage
                text={nameInput.errorMessages[nameInput.activeErrorIndex]}
              />
            )}
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => nameInput.formInputChangeHandler(e.target.value)}
              onBlur={nameInput.formInputBlurHandler}
              value={nameInput.value}
              placeholder="Your name"
              autoComplete="name"
              required
            />
          </div>
          <div
            className={emailInput.hasError ? "form-group error" : "form-group"}>
            <label htmlFor="email">Email</label>
            {emailInput.hasError && emailInput.activeErrorIndex !== null && (
              <ErrorMessage
                text={emailInput.errorMessages[emailInput.activeErrorIndex]}
              />
            )}
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) =>
                emailInput.formInputChangeHandler(e.target.value)
              }
              onBlur={emailInput.formInputBlurHandler}
              value={emailInput.value}
              placeholder="name@company.com"
              autoComplete="email"
              required
            />
          </div>
          <div
            className={
              passwordInput.hasError ? "form-group error" : "form-group"
            }>
            <label htmlFor="password">Password</label>
            {passwordInput.hasError &&
              passwordInput.activeErrorIndex !== null && (
                <ErrorMessage
                  text={
                    passwordInput.errorMessages[passwordInput.activeErrorIndex]
                  }
                />
              )}
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                passwordInput.formInputChangeHandler(e.target.value)
              }
              onBlur={passwordInput.formInputBlurHandler}
              value={passwordInput.value}
              placeholder="Password"
              autoComplete="new-password"
              required
            />
          </div>
          <button
            className="bg-tertiary hover:bg-accent transition-colors text-white w-full rounded-md py-3 font-medium outline-none mt-4 focus:bg-accent"
            type="submit"
            disabled={isLoading}>
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
      </div>
    </div>
  );
};

export default Register;
