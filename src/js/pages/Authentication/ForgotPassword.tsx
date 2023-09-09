import { FormEvent, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FirebaseError } from "firebase/app";

import AuthContext from "@js/context/AuthContext";

const ForgotPassword = () => {
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const email = useRef<HTMLInputElement>(null);
  const authCtx = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!email.current) return;

    try {
      setSuccessMessage("");
      setFormError("");
      setIsLoading(true);
      await authCtx.resetPassword(email.current.value);
      setSuccessMessage("Sent! Check your inbox for further instructions.");
    } catch (error) {
      const err = error instanceof FirebaseError;
      if (err) {
        if (error.code === "auth/user-not-found")
          setFormError("Failed to reset password: User not found.");
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="mb-7 text-center">
          <h2 className="text-4xl font-bold mb-3   text-primary">
            Forgot Password?
          </h2>
          <p className="text-secondary/80">
            No worries, we'll send you reset instructions.
          </p>
        </div>
        {formError && (
          <p className="bg-red-200 text-red-600 font-medium py-1.5 px-2.5 mb-6 rounded-md">
            {formError}
          </p>
        )}
        {successMessage && (
          <p className="bg-green-200 text-green-600 font-medium py-1.5 px-2.5 mb-6 rounded-md">
            {successMessage}
          </p>
        )}
        <form className="text-secondary" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              ref={email}
              required
              placeholder="name@company.com"
            />
          </div>
          <button
            className="bg-secondary mt-4 hover:bg-primary transition-colors text-white w-full rounded-md py-3 font-medium outline-none focus:bg-primary"
            type="submit"
            disabled={isLoading}>
            Reset Password
          </button>
        </form>
        <div className="mt-12 text-center">
          <Link
            to="/login"
            className="hover:text-accent font-medium transition-colors text-secondary inline-flex items-center justify-center gap-x-2">
            <AiOutlineArrowLeft className="mt-0.5" />
            <span>Back to login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
