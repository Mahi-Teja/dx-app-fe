import React from "react";

export const TimeRangeSelector = ({
  window,
  setWindow,
  year,
  setYear,
  month,
  setMonth,
}) => {
  const windows = [
    { id: "weekly", label: "Last 7 Days" },
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
    // { id: "custom", label: "Custom Range" },
  ];

  return (
    <div className="flex gap-4 rounded-xl border bg-muted backdrop-blur-xl shadow-sm overflow-hidden">
      <div className="flex flex-1 bg-muted/40 backdrop-blur-md">
        {windows.map((win) => (
          <button
            key={win.id}
            onClick={() => setWindow(win.id)}
            className={`
          relative flex-1 px-4 py-2 text-sm font-medium
          transition-all duration-300 ease-out cursor-pointer 
          ${
            window === win.id
              ? `
                bg-black/60 
                text-white
                backdrop-blur-xl
                shadow-inner 
              `
              : `
                text-muted-foreground
                hover:text-foreground
                hover:bg-muted
              `
          }
        `}
          >
            {win.label}
          </button>
        ))}
      </div>
    </div>
  );
};
