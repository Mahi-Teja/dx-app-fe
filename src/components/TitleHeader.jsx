import React from "react";

export const TitleHeader = ({ children }) => {
  return (
    <header className="sticky top-0 z-80 bg-background border-b border-border">
      {children}
    </header>
  );
};
