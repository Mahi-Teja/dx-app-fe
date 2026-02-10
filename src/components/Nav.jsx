import { NavLink } from "react-router-dom";
import { MENU_OPTIONS } from "@/utils/constants";
import { useState } from "react";
import Logout from "@/features/auth/components/Logout";
import { ChevronLeftIcon, PanelLeftClose } from "lucide-react";
import { ThemeSwitcher } from "./Toggle";

const MobileBottomNav = () => {
  return (
    <nav
      className="
        md:hidden
        fixed bottom-0 inset-x-0 z-50
        h-16
        border-t border-border
        bg-card/95 backdrop-blur
        flex items-center justify-around
      "
    >
      {MENU_OPTIONS.map((item) => {
        const Icon = item.icon; // <-- THIS IS ALREADY A COMPONENT

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
              flex flex-col items-center justify-center
              gap-0.5
              text-[11px]
              transition-colors
              ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }
            `
            }
          >
            {/* Icon */}
            <span className="h-6 w-6 flex items-center justify-center">
              {Icon}
            </span>

            {/* Label */}
            <span className="leading-none">{item.title}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

const DesktopNavBar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={`
        hidden md:flex flex-col shrink-0 h-screen sticky top-0
        bg-background text-primary border-r border-border shadow-sm
        transition-all duration-300 ease-in-out
        ${isExpanded ? "w-64" : "w-20"}
      `}
    >
      {/* Header */}
      <div className="flex items-center h-16 px-4 border-b border-border overflow-hidden relative">
        {/* Logo Section */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="shrink-0 w-8 h-8 bg-secondary-foreground text-secondary rounded flex items-center justify-center font-bold text-lg">
            Dx
          </span>

          {/* Title — always mounted */}
          <span
            className={`
        font-semibold text-sm whitespace-nowrap
        transition-all duration-300
        ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
      `}
          >
            Tracker
          </span>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded((v) => !v)}
          className={`
     
    p-2 rounded-md
    transition-all
    duration-100
    hover:bg-card
    text-muted-foreground cursor-pointer 
    ${
      isExpanded
        ? "opacity-100"
        : "absolute inset-3  opacity-0 hover:opacity-100 group-hover:opacity-100"
    }
  `}
        >
          <PanelLeftClose
            size={18}
            className={`
      transition-transform duration-300
      ${!isExpanded ? "rotate-180" : ""}
    `}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {MENU_OPTIONS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={!isExpanded ? item.title : ""}
            className={({ isActive }) => `
              flex items-center gap-4 rounded-md h-11 px-3 text-sm transition-all
              ${
                isActive
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted"
              }
            `}
          >
            <span className="shrink-0 h-5 w-5 flex items-center justify-center">
              {item.icon}
            </span>

            {isExpanded && (
              <span className="truncate whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200">
                {item.title}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 flex flex-col space-y-2 text-start border-t border-border">
        <ThemeSwitcher isExpand={isExpanded} />
        <Logout variant={"destructive"} isExpanded={isExpanded} />
      </div>
    </aside>
  );
};

export default DesktopNavBar;

export { DesktopNavBar, MobileBottomNav };
