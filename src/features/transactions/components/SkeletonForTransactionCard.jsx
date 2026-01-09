import { Skeleton } from "@/components/ui/skeleton";

const TransactionCardSkeleton = () => {
  return (
    <article className="rounded-lg border border-border bg-card">
      {/* ─────────────── Main Row ─────────────── */}
      <div className="flex items-center gap-3 p-3">
        {/* Icon */}
        <Skeleton className="h-11 w-11 rounded-full" />

        {/* Primary info */}
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-4 w-[60%]" />
          <div className="flex gap-3">
            <Skeleton className="h-3 w-[40px]" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
        </div>

        {/* Amount */}
        <div className="shrink-0 text-right space-y-2">
          <Skeleton className="h-4 w-[70px] ml-auto" />
          <Skeleton className="h-3 w-[90px] ml-auto" />
        </div>

        {/* Expand button */}
        <Skeleton className="h-5 w-5 rounded-md" />
      </div>

      {/* ─────────────── Expanded (collapsed state placeholder) ─────────────── */}
      <div className="grid grid-rows-[0fr] opacity-0">
        <div className="overflow-hidden" />
      </div>
    </article>
  );
};

export default TransactionCardSkeleton;
