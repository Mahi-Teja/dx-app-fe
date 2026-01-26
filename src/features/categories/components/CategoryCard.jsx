import { Trash2 } from "lucide-react";
import React from "react";
import EditCategoryTrigger from "./EditCategoryTrigger";

const CategoryCard = ({ onDelete, category }) => {
  const isIncome = category?.type === "income";

  return (
    <div
      className="
        flex items-center gap-4
        p-4 rounded-xl
        bg-card border border-border
        transition-all
        hover:bg-accent/50
        hover:shadow-sm
      "
    >
      {/* Icon */}
      <div
        className="
          flex items-center justify-center
          w-12 h-12 shrink-0
          rounded-full
          bg-accent text-accent-foreground
          text-3xl
        "
      >
        {category?.emoji}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <h3 className="text-sm font-semibold text-foreground capitalize truncate">
          {category?.name}
        </h3>

        <span
          className={`
            inline-flex items-center
            px-2 py-0.5
            rounded-full
            text-xs font-medium capitalize
            ${
              isIncome
                ? "bg-income/15 text-income"
                : "bg-expense/15 text-expense"
            }
          `}
        >
          {category?.type}
        </span>
      </div>

      {/* Actions */}
      {onDelete && (
        <button
          onClick={onDelete}
          aria-label="Delete category"
          className="
          p-2 rounded-md
          text-muted-foreground
          hover:text-destructive
          hover:bg-destructive/10
          transition
        "
        >
          <Trash2 size={16} />
        </button>
      )}
      {<EditCategoryTrigger initialData={category} />}
    </div>
  );
};

export default CategoryCard;
