import { ThemeSwitcher } from "@/components/Toggle";
import Logout from "@/features/auth/components/Logout";
import { Github, Mail, Twitter } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Settings = () => {
  const user = useSelector((s) => s.user);

  return (
    <section className="min-h-screen  bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          <h1 className="text-lg md:text-xl font-semibold">Settings</h1>
          <div className="md:hidden">
            <Logout variant="destructive" className={"bg-muted"} />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className=" mx-auto  p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Profile Card */}
        <div className="rounded-xl border bg-card p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden bg-muted shrink-0">
            <img
              className="h-full w-full object-cover"
              src={
                user?.user?.avatar ||
                "https://api.dicebear.com/9.x/thumbs/svg?seed=default"
              }
              alt="avatar"
            />
          </div>
          <div className="min-w-0">
            <div className="font-medium truncate">
              {user?.user?.username || "Username"}
            </div>
            <div className="text-sm text-muted-foreground truncate">
              {user?.user?.email || "email"}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-xl border bg-card divide-y">
          <div className="px-4 py-3">
            <div className="text-sm font-medium">Preferences</div>
          </div>

          {/* Theme */}
          <div className="flex items-center justify-between px-4 py-4">
            <div>
              <div className="text-sm font-medium">Theme</div>
              <div className="text-xs text-muted-foreground">
                Toggle between light and dark mode
              </div>
            </div>
            <ThemeSwitcher isExpand={true} />
          </div>
          {/* Currency */}
          <div className="flex items-center justify-between px-4 py-4">
            <div>
              <div className="text-sm font-medium">Currency</div>
              <div className="text-xs text-muted-foreground">
                current selected currency
              </div>
            </div>
            <div className="px-3 py-1 rounded-md border text-sm font-medium bg-muted">
              INR
            </div>
          </div>
        </div>

        {/* Data */}
        <div className="rounded-xl border bg-card divide-y">
          <div className="px-4 py-3">
            <div className="text-sm font-medium">Data</div>
          </div>

          {/* Export */}
          <div className="flex items-center justify-between px-4 py-4">
            <div>
              <div className="text-sm font-medium">Export transactions</div>
              <div className="text-xs text-muted-foreground">
                Download your data as a PDF
              </div>
            </div>
            <Link
              to="/download/transactions"
              className="text-sm text-primary hover:underline"
            >
              Download
            </Link>
          </div>
        </div>

        {/* Support */}
        <div className="rounded-xl border bg-card divide-y">
          <div className="px-4 py-3">
            <div className="text-sm font-medium">Support</div>
          </div>

          {/* Bug report */}
          <div className="flex items-center justify-between px-4 py-4">
            <div>
              <div className="text-sm font-medium">Report a bug</div>
              <div className="text-xs text-muted-foreground">
                Found something broken?
              </div>
            </div>
            <div className="flex gap-4 ">
              <a
                href="mailto:mahineeli123@gmail.com?subject=DX%20Tracker%20Support"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://github.com/Mahi-Teja/dx-app-fe/issues/new"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t bg-background px-6 py-8 text-sm text-muted-foreground">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* BRAND */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-foreground">
                    Dx Tracker
                  </span>
                  <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium">
                    v{import.meta.env.VITE_APP_VERSION}
                  </span>
                </div>
                <p className="max-w-xs text-xs leading-relaxed">
                  Smart insights for your daily finances. Track income and
                  expenses with clarity.
                </p>
                <span className="text-[11px] opacity-70">
                  © {new Date().getFullYear()} Dx Tracker
                </span>
                <div className="flex   items-center gap-1">
                  <span>Built with ❤️ by</span>
                  <a
                    href="https://www.anempty.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-muted-foreground underline-offset-4 hover:underline"
                  >
                    Mahi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <p className="h-16 md:h-0"></p>
    </section>
  );
};

export default Settings;
