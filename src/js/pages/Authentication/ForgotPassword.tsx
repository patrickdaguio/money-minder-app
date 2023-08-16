import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const ForgotPassword = () => {
  return (
    <>
      <div className="mb-7 text-center">
        <h2 className="text-4xl font-bold mb-3   text-primary">
          Forgot Password?
        </h2>
        <p className="text-secondary/80">
          No worries, we'll send you reset instructions.
        </p>
      </div>
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
        <button
          className="bg-secondary mt-4 hover:bg-primary transition-colors text-white w-full rounded-md py-3 font-medium outline-none focus:bg-primary"
          type="submit">
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
    </>
  );
};

export default ForgotPassword;
