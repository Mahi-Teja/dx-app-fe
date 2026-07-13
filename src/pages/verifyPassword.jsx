import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { verifyResetPassword } from "@/features/auth/api/auth";

const VerifyPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  // loading | valid | invalid

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const verify = async () => {
      try {
        const data = await verifyResetPassword(token);
        if (data.data.isValid) {
          setStatus("valid");
        }

        setStatus("invalid");
      } catch (err) {
        setStatus("invalid");
      }
    };

    verify();
  }, [token]);

  useEffect(() => {
    if (status === "valid") {
      navigate(`/reset-password/${token}`, {
        replace: true,
      });
    }

    if (status === "invalid") {
      const timer = setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status, token, navigate]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center">
          <h2 className="text-lg font-semibold text-red-400">
            Invalid or Expired Link
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Redirecting you to login...
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default VerifyPassword;
