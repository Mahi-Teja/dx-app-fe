import { ChevronLeft, ChevronRight } from "lucide-react";

const MAX_VISIBLE_PAGES = 5;

const PaginationFooter = ({
  page,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {
  if (totalPages <= 1) return null;

  const goToPage = (next) => {
    if (isLoading) return;
    if (next < 1 || next > totalPages) return;
    onPageChange(next);
  };

  const start = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
  const end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);

  return (
    <footer
      className="
        sticky bottom-0 z-10
        bg-background
        border-t border-border
        px-4 md:px-6 py-2
        flex items-center justify-center gap-1
      "
    >
      <button
        disabled={page === 1 || isLoading}
        onClick={() => goToPage(page - 1)}
        className="w-8 h-8 rounded-md flex items-center justify-center
                   text-muted-foreground hover:bg-muted disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>

      {Array.from({ length: end - start + 1 }).map((_, i) => {
        const p = start + i;
        const isActive = p === page;

        return (
          <button
            key={p}
            disabled={isLoading}
            onClick={() => goToPage(p)}
            className={`
              w-8 h-8 rounded-md text-sm font-medium
              flex items-center justify-center
              ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }
              disabled:opacity-50
            `}
          >
            {p}
          </button>
        );
      })}

      <button
        disabled={page === totalPages || isLoading}
        onClick={() => goToPage(page + 1)}
        className="w-8 h-8 rounded-md flex items-center justify-center
                   text-muted-foreground hover:bg-muted disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
    </footer>
  );
};

export default PaginationFooter;
