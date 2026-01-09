import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { googleAuth } from "../api/auth";

export default function GoogleAuthButton() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const user = jwtDecode(token);

    const res = await googleAuth({ idToken: token });

    // Save user data or send `token` to backend
    localStorage.setItem("user", JSON.stringify(res.data.user));

    toast.success(`Welcome, ${user.name}!`);
    navigate("/dashboard");
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
