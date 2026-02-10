import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { performLogout } from "../store/logout.thunk.js";

const Logout = ({ isExpanded = true, variant, className }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.promise(dispatch(performLogout()), {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Logout failed",
    });
  };

  return (
    <Button
      onClick={handleLogout}
      className={`justify-start ${className}`}
      variant={variant}
    >
      <LogOut className="mr-2 h-4 w-4 shrink-0" />

      <span
        className={`
      transition-opacity duration-200
      whitespace-nowrap
      ${isExpanded ? "opacity-100" : "opacity-0"}
    `}
      >
        Logout
      </span>
    </Button>
  );
};

export default Logout;
