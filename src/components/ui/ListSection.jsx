import React from "react";

const ListSection = ({ title, headerRight, children, className = "" }) => {
  return (
    <section
      className={`flex flex-1 min-w-0 flex-col overflow-hidden ${className}`}
    >
      {/* Header (optional) */}
      {(title || headerRight) && (
        <header className="flex flex-col md:flex-row justify-between gap-2 p-2 px-4">
          {title && (
            <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
          )}

          {headerRight && (
            <div className="flex-1 md:flex md:justify-end">{headerRight}</div>
          )}
        </header>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 space-y-2 p-4 overflow-auto">{children}</div>
    </section>
  );
};

export default ListSection;
