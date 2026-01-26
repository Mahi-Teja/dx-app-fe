import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { googleAuth } from "../api/auth";
import { useDispatch } from "react-redux";
import { signUser } from "../store/auth.slice";
import { setUser } from "../store/user.slice";
import { bootstrapApp } from "@/app/store/bootstrap.thunk";

export default function GoogleAuthButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const user = jwtDecode(token);

    const res = await googleAuth({ idToken: token });

    // 1. Set Auth Status
    dispatch(signUser());

    // 2. Set User Data
    dispatch(setUser(res?.data?.user));

    // 3. Bootstrap App (Fetch Accounts, Categories, Dashboard data)
    // This ensures the dashboard isn't empty when the user arrives
    await dispatch(bootstrapApp());

    toast.success("Welcome back 👋");

    // 4. Redirect to Dashboard
    navigate("/dashboard", { replace: true });
  };

  const handleError = () => {
    toast.error("Google Login Failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      theme="filled_blue"
      shape="rectangular"
      size="large"
    />
  );
}
