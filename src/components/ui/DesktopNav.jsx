import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logout from "@/features/auth/components/Logout";
import { MENU_OPTIONS } from "@/utils/constants.js";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const DesktopSideNav = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        /* Layout & Visibility */
        hidden md:flex flex-col shrink-0 h-screen sticky top-0
        /* Styling */
        bg-card text-primary border-r border-border shadow-sm
        /* Animation */
        transition-all duration-300 ease-in-out
        /* Width logic */
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      {/* Header / Toggle Button */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className={`
          h-14 flex items-center border-b border-border
          font-semibold text-sm hover:bg-muted transition-all duration-300
          ${collapsed ? "justify-center px-0" : "px-4 gap-2"}
        `}
      >
        <div className="flex items-center gap-2">
          <span className="flex-shrink-0 p-1 bg-secondary-foreground text-secondary rounded min-w-[28px] text-center">
            DX
          </span>

          {!collapsed && (
            <span className="whitespace-nowrap animate-in fade-in duration-500">
              Tracker
            </span>
          )}
        </div>

        {!collapsed && (
          <span className="ml-auto text-muted-foreground animate-in slide-in-from-left-1">
            <ChevronsLeft size={16} />
          </span>
        )}

        {/* Optional: Show ChevronsRight when collapsed for clarity */}
        {collapsed && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-muted/50">
            <ChevronsRight size={16} />
          </div>
        )}
      </button>

      {/* Navigation Links */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {MENU_OPTIONS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // title shows the name on hover when the bar is tiny
            title={collapsed ? item.title : ""}
            className={({ isActive }) => `
              flex items-center gap-3 rounded-md text-sm transition-all duration-200
              ${collapsed ? "justify-center px-2 py-3" : "px-3 py-2"}
              ${
                isActive
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted"
              }
            `}
          >
            <span className="h-5 w-5 flex items-center justify-center shrink-0">
              {item.icon}
            </span>

            {!collapsed && (
              <span className="truncate whitespace-nowrap animate-in fade-in slide-in-from-left-2">
                {item.title}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div
        className={`
          p-2 border-t border-border
          ${collapsed ? "flex justify-center" : ""}
        `}
      >
        <Logout isExpanded={!collapsed} />
      </div>
    </aside>
  );
};

export default DesktopSideNav;
