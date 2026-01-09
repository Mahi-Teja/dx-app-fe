import {
  ArrowLeftRight,
  ArrowUpRight,
  ChevronDown,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

import Detail from "./Details";
import TransactionBadges from "./TransactionBadges";
import TransactionTrigger from "@/features/transactions/components/TransactionTrigger";
import toast from "react-hot-toast";
import { DialogeTrigger } from "@/components/AlerDialoge";
import { deleteTransaction } from "../api/transaction.api.js";

const TransactionCard = ({ txn }) => {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = txn?.occurredAt
    ? format(new Date(txn.occurredAt), "MMM dd")
    : "N/A";

  const onDelete = async () => {
    try {
      await deleteTransaction(txn._id);
      toast.success("Transaction deleted");
    } catch (error) {
      toast.error("Failed to deleted transaction");
    }
  };

  if (["opening_balance"].includes(txn.type)) return null;

  return (
    <article className="rounded-lg border border-border bg-card">
      {/* ─────────────── Main Row ─────────────── */}
      <div
        className={`flex items-center gap-3 p-3 ${
          expanded ? "border-b border-border" : ""
        }`}
      >
        {/* Icon */}
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent">
          <span className="text-lg">{txn?.category?.emoji ?? "💸"}</span>
          <span className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5 text-success">
            {txn?.type !== "transfer" ? (
              <ArrowUpRight
                className={`h-3.5 w-3.5 ${
                  txn?.type == "expense" ? "text-red-600" : "rotate-90"
                }`}
              />
            ) : (
              <ArrowLeftRight className={`h-3.5 w-3.5 text-blue-600`} />
            )}
          </span>
        </div>

        {/* Primary info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">
            {txn?.description || "Untitled transaction"}
          </p>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <span>{formattedDate}</span>
            {txn?.category && <span>{txn.category.name}</span>}
          </div>
        </div>

        {/* Amount */}
        <div className="shrink-0 text-right">
          <p className="tabular-nums font-semibold">{txn?.amount}</p>
          <p className="truncate text-xs text-muted-foreground">
            {txn?.account?.name}
          </p>
        </div>

        {/* Expand */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className={`p-1 text-muted-foreground transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        >
          <ChevronDown size={18} />
        </button>
      </div>

      {/* ─────────────── Expanded ─────────────── */}
      <div
        className={`grid transition-all duration-300 ease-emphasized ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 bg-muted/40 p-4">
            {txn?.note && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {txn.note}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <Detail label="Account" value={txn?.account?.name} />
              {txn?.toAccount && (
                <Detail label="To Account" value={txn?.toAccount?.name} />
              )}
            </div>

            <div className="flex items-center justify-between">
              <TransactionBadges txn={txn} />
              <div className="flex gap-1">
                <TransactionTrigger mode="edit" defaultValues={txn} />
                <DialogeTrigger
                  onAgreeLabel={"Delete"}
                  description={` This will permanently delete this
            transaction . This action cannot be undone.`}
                  onAgree={onDelete}
                  label={<Trash2 />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TransactionCard;
