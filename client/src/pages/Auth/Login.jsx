import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "../../api/auth";
import { toast } from "sonner";
import { useAuth } from "../../store";
import handleError from "../../utils/handleError";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [revealPassword, setRevealPassword] = useState(false);
  const togglePassword = () => setRevealPassword((prev) => !prev);

  const onFormSubmit = async (data) => {
    try {
      const res = await loginUser(data);

      if (res.status === 200) {
        toast.success(res.data.message);
        login(res.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <motion.form
        onSubmit={handleSubmit(onFormSubmit)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="card w-full max-w-md bg-black bg-opacity-10 backdrop-blur-md shadow-lg rounded-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-[#00ffc2]">
          Log In
        </h2>

        {/* Username Input */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white">Username</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            className={`input input-bordered input-lg bg-black text-white placeholder-gray-400 ${
              errors.username ? "input-error" : ""
            }`}
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <label className="label">
              <span className="label-text-alt text-red-500">
                {errors.username.message}
              </span>
            </label>
          )}
        </div>

        {/* Password Input */}
        <div className="form-control w-full relative">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <input
            type={revealPassword ? "text" : "password"}
            placeholder="Password"
            className={`input input-bordered input-lg bg-black text-white placeholder-gray-400 ${
              errors.password ? "input-error" : ""
            }`}
            {...register("password", { required: "Password is required" })}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-4 top-[38px] text-sm text-[#00ffc2] hover:text-[#00b38f]"
          >
            {revealPassword ? "Hide" : "Show"}
          </button>
          {errors.password && (
            <label className="label">
              <span className="label-text-alt text-red-500">
                {errors.password.message}
              </span>
            </label>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn bg-[#00ffc2] hover:bg-[#00b38f] text-black btn-lg w-full"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-white">
          Don&apos;t have an account?{" "}
          <Link
            to="/auth/register"
            className="text-[#00ffc2] hover:text-[#00b38f] font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
