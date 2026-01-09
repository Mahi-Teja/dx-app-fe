import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signup } from "@/features/auth/api/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...payload } = data; // strip confirmPassword
      await signup(payload);

      toast.success("Account created successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message ||
          error?.message ||
          "Signup failed"
      );
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-2">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-2xl font-semibold">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Sign up to get started
          </p>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2"
          noValidate
        >
          <FieldGroup>
            {/* Username */}
            <Controller
              name="username"
              control={control}
              rules={{
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              }}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <Input {...field} aria-invalid={!!errors.username} />
                  {errors.username && (
                    <FieldError>{errors.username.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      aria-invalid={!!errors.password}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <FieldDescription>Minimum 8 characters</FieldDescription>
                  {errors.password && (
                    <FieldError>{errors.password.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    aria-invalid={!!errors.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <FieldError>{errors.confirmPassword.message}</FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign up"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
