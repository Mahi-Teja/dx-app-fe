import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitcher({ isExpand }) {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme");

    let shouldBeDark;

    if (stored === "dark") {
      shouldBeDark = true;
    } else if (stored === "light") {
      shouldBeDark = false;
    } else {
      // fallback to system preference
      shouldBeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  const applyTheme = (dark) => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      applyTheme(next);
      return next;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="
    w-full
    flex items-center gap-2
    rounded-lg px-3 py-2
    border border-border
    bg-accent
    text-muted-foreground
    hover:text-foreground hover:bg-muted
    transition
    cursor-pointer
  "
    >
      {isDark ? (
        <Moon className="h-4 w-4 text-blue-400 shrink-0" />
      ) : (
        <Sun className="h-4 w-4 text-yellow-500 shrink-0" />
      )}

      {/* Label — always mounted, no layout shift */}
      <span
        className={`
      text-sm font-medium
      transition-opacity duration-200
      whitespace-nowrap
      ${isExpand ? "opacity-100" : "opacity-0"}
    `}
      >
        {isDark ? "Dark mode" : "Light mode"}
      </span>
    </button>
  );
}
