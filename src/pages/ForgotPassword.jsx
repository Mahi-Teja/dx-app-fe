import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, ArrowLeft } from "lucide-react";

import { forgotPassword } from "@/features/auth/api/auth";

const ForgotPassword = () => {
  const [message, setMessage] = useState("Send Reset Link");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email }) => {
    setServerError("");

    try {
      const res = await forgotPassword(email);
      console.log(res);

      setMessage("Reset link sent!");
    } catch (error) {
      setServerError(error?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090B] px-6">
      <div className="w-full max-w-md rounded-3xl border border-accent bg-zinc-900/60 backdrop-blur-xl p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">
            DX<span className="text-primary">App</span>
          </h1>

          <p className="mt-3 text-sm text-primary">
            Forgot your password? Don't worry. Enter your email and we'll send
            you a password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm text-primary">Email Address</label>

            <div className="flex items-center rounded-xl border border-accent bg-zinc-950 px-4 focus-within:border-primary transition">
              <Mail className="h-5 w-5 text-primary" />

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent px-3 py-3 text-primary outline-none placeholder:text-primary"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Server Error */}
          {serverError && (
            <p className="mt-4 text-center text-sm text-red-400">
              {serverError}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-accent transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : message}
          </button>
        </form>

        {/* Back */}
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

export default ForgotPassword;
