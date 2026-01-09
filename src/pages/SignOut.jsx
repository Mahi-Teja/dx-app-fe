import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EmptyStateNoAction from "@/components/EmptyStateNoAction";
import { LogOutIcon } from "lucide-react";
import { performLogout } from "@/features/auth/store/logout.thunk";

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      try {
        await toast.promise(dispatch(performLogout()), {
          loading: "Logging out...",
          success: "Logged out successfully",
          error: "Logout failed",
        });

        // Redirect after successful logout
        navigate("/login", { replace: true });
      } catch (err) {
        // even if it fails, usually still go to login
        navigate("/login", { replace: true });
      }
    };

    run();
  }, [dispatch, navigate]);

  return (
    <EmptyStateNoAction
      description=""
      icon={<LogOutIcon />}
      title="Loging out ..."
    />
  );
};

export default SignOut;
