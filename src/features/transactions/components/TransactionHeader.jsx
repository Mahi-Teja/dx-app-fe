import { FilterOptions } from "@/components/FilterOptions";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const TransactionsHeader = ({
  title = "Transactions",
  filters,
  onFiltersChange,
  show,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border px-4 md:px-6 py-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-semibold">{title} </h1>

        {show && (
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="md:hidden flex items-center gap-1 text-sm text-muted-foreground"
          >
            Filters
            <ChevronDown
              size={16}
              className={`transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      <div
        className={`${showFilters ? "block" : "hidden"}  ${show && "md:block"}`}
      >
        <FilterOptions filters={filters} onChange={onFiltersChange} />
      </div>
    </header>
  );
};
