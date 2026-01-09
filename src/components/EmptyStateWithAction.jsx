import React from "react";
import { Button } from "./ui/button";

const EmptyStateWithAction = ({
  title = "Get started",
  description = "You haven’t added anything yet.",
  actionLabel = "Add new",
  onAction = () => {},
  icon = "✨",
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-16 px-4">
      <div className="text-4xl">{icon}</div>

      <h3 className="text-lg font-semibold text-foreground">{title}</h3>

      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>

      <Button onClick={onAction}>{actionLabel}</Button>
    </div>
  );
};

export default EmptyStateWithAction;
