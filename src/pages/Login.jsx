import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { login } from "@/features/auth/api/auth";
import { bootstrapApp } from "@/app/store/bootstrap.thunk.js";
import GoogleAuthButton from "@/features/auth/components/GoogleAuthButton";
import { signUser } from "@/features/auth/store/auth.slice";
import { setUser } from "@/features/auth/store/user.slice";

/**
 * 1. Validation Schema
 * We use a base schema and refine it based on the login type
 */
const loginSchema = z.object({
  identifier: z.string().min(1, "Required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(24, "Password must be less than 24 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginType, setLoginType] = useState("username"); // 'username' | 'email'

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Reset form when switching between Username and Email login
  useEffect(() => {
    reset({ identifier: "", password: "" });
  }, [loginType, reset]);

  const onSubmit = async (data) => {
    try {
      // Basic client-side email format check if email type is active
      if (loginType === "email" && !/\S+@\S+\.\S+/.test(data.identifier)) {
        setError("identifier", {
          message: "Please enter a valid email address",
        });
        return;
      }

      const res = await login({
        [loginType]: data.identifier,
        password: data.password,
      });

      // 1. Set Auth Status
      dispatch(signUser());

      // 2. Set User Data
      dispatch(setUser(res.data));

      // 3. Bootstrap App (Fetch Accounts, Categories, Dashboard data)
      // This ensures the dashboard isn't empty when the user arrives
      await dispatch(bootstrapApp());

      toast.success("Welcome back 👋");

      // 4. Redirect to Dashboard
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login Error:", error);
      const serverMessage =
        error?.response?.data?.message || "Invalid credentials";
      toast.error(serverMessage);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <header className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage your finances
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <FieldGroup>
            {/* Identifier Field (Username or Email) */}
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>
                    {loginType === "username" ? "Username" : "Email Address"}
                  </FieldLabel>

                  <Input
                    {...field}
                    type={loginType === "email" ? "email" : "text"}
                    placeholder={
                      loginType === "username"
                        ? "Enter your username"
                        : "name@example.com"
                    }
                    className={errors.identifier ? "border-red-500" : ""}
                    autoComplete={
                      loginType === "username" ? "username" : "email"
                    }
                  />

                  <FieldDescription>
                    Prefer to use your{" "}
                    <button
                      type="button"
                      onClick={() =>
                        setLoginType(
                          loginType === "username" ? "email" : "username",
                        )
                      }
                      className="text-primary font-medium underline-offset-4 hover:underline"
                    >
                      {loginType === "username" ? "email" : "username"}
                    </button>
                    ?
                  </FieldDescription>

                  {errors.identifier && (
                    <FieldError className="text-red-500 text-xs">
                      {errors.identifier.message}
                    </FieldError>
                  )}
                </Field>
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel>Password</FieldLabel>
                    {/* <Link
                      to="/forgot-password"
                      className="text-xs text-muted-foreground hover:text-primary underline"
                    >
                      Forgot?
                    </Link> */}
                  </div>

                  <Input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    className={errors.password ? "border-red-500" : ""}
                    autoComplete="current-password"
                  />

                  {errors.password && (
                    <FieldError className="text-red-500 text-xs">
                      {errors.password.message}
                    </FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">Authenticating...</span>
            ) : (
              "Log In"
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <GoogleAuthButton />

        <p className="text-sm text-center text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
