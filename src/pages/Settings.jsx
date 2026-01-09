import { ThemeSwitcher } from "@/components/Toggle";
import Logout from "@/features/auth/components/Logout";
import { Twitter } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Settings = () => {
  const user = useSelector((s) => s.user);

  return (
    <section className="space-y-5 pb-10">
      {/* Page title */}
      <header
        className="
        sticky top-0 z-10
        bg-background
         bg-whitew
        text-lg font-semibold px-4
        md:px-6  py-3
        border-b border-border
        flex items-center justify-between
      "
      >
        <h1
          className=" text-lg md:text-xl
      "
        >
          Settings
        </h1>
        <Logout />
      </header>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex gap-2 p-4 bg-accent rounded-xl">
          <div className="h-12 w-12 rounded-full bg-primary overflow-hidden">
            <img
              className=""
              src={
                user?.user?.avatar ||
                "https://api.dicebear.com/9.x/thumbs/svg?seed=default" ||
                null
              }
              alt="avatar"
              srcSet=""
            />
          </div>
          <div className="">
            <div className="">{user?.user?.username || "Username"}</div>
            <div className="">{user?.user?.email || "email"}</div>
          </div>
        </div>
        <div className="md:hidden flex p-4 bg-accent justify-between items-center rounded-xl">
          <div className="">Theme</div>
          <div className="flex items-center justify-evenly">
            <div className="">Dark</div>
            <ThemeSwitcher />
          </div>
        </div>
        <div className="flex p-4 bg-accent justify-between rounded-xl">
          <div className="text-sm text-muted-foreground flex items-center">
            Report a bug '🐞'?{" "}
          </div>
          <a
            href="https://x.com/messages/compose?recipient_id=empty_codes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs gap-4"
          >
            Reach out on <Twitter />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Settings;
