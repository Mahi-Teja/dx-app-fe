import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";

import { resetPassword, verifyResetPassword } from "@/features/auth/api/auth";

const ResetPassword = () => {
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [message, setMessage] = useState("Reset Password");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const password = watch("newPassword");

  const onSubmit = async ({ newPassword, confirmPassword }) => {
    setServerError("");

    try {
      const res = await resetPassword({ token, newPassword, confirmPassword });

      setMessage(res?.message || "Password Updated");
    } catch (error) {
      setServerError(error?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090B] px-6">
      <div className="w-full max-w-md rounded-3xl border border-accent bg-zinc-900/60 backdrop-blur-xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">
            DX<span>App</span>
          </h1>

          <p className="mt-3 text-sm text-primary">
            Create a new password for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-primary">
              New Password
            </label>

            <div className="flex items-center rounded-xl border border-accent bg-zinc-950 px-4 focus-within:border-primary">
              <Lock className="h-5 w-5 text-primary" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full bg-transparent px-3 py-3 text-primary outline-none placeholder:text-primary"
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-primary" />
                ) : (
                  <Eye className="h-5 w-5 text-primary" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm text-primary">
              Confirm Password
            </label>

            <div className="flex items-center rounded-xl border border-accent bg-zinc-950 px-4 focus-within:border-primary">
              <Lock className="h-5 w-5 text-primary" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full bg-transparent px-3 py-3 text-primary outline-none placeholder:text-primary"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-center text-sm text-red-400">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary py-3 font-semibold text-accent transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Updating..." : message}
          </button>
        </form>

        <Link
          to="/login"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
