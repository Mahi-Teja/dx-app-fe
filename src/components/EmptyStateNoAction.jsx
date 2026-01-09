import React from "react";

const EmptyStateNoAction = ({
  title = "Nothing here yet",
  description = "There’s no data to display at the moment.",
  icon = "📭",
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 py-16 px-4">
      <div className="text-4xl">{icon}</div>

      <h3 className="text-lg font-semibold text-foreground">{title}</h3>

      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default EmptyStateNoAction;
