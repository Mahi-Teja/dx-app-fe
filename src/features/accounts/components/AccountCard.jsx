import React, { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import AccountShell from "./AccountShell";
import EditAccountTrigger from "./EditAccountTrigger";

const AccountCard = ({
  currency = "INR",
  onEdit,
  onDelete,
  onClick,
  account,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const formatter = new Intl.NumberFormat(
    currency === "USD" ? "en-US" : "en-IN",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }
  );

  const isCreditCard = account?.type === "credit_card";

  const balance = isCreditCard
    ? Number(account?.creditLimit || 0) + Number(account?.balance || 0)
    : Number(account?.balance || 0);

  const isPositive = balance >= 0;

  if (openEdit) {
    return (
      <AccountShell
        initialData={editData}
        onOpenChange={() => setOpenEdit(false)}
      />
    );
  }

  return (
    <article
      onClick={onClick}
      className="
        group w-full cursor-pointer
        rounded-xl border border-border
        bg-card
        px-4 py-4
        transition-all duration-200
        hover:shadow-sm hover:border-foreground/10
        self-start
      "
    >
      {/* ================= TOP ================= */}
      <div className="flex items-center justify-between gap-4">
        {/* -------- Left -------- */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Icon */}
          <div
            className={`
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-xl
              text-lg
              ${
                isCreditCard
                  ? "bg-blue-500/10 text-blue-600"
                  : "bg-muted text-foreground"
              }
            `}
          >
            {account?.icon ?? "💼"}
          </div>

          {/* Name + Type */}
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight truncate">
              {account?.name}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {account?.type.replace("_", " ")}
            </p>
          </div>
        </div>

        {/* -------- Right -------- */}
        <div className="flex items-center gap-2">
          {/* Balance */}
          <div className="text-right max-w-[170px]">
            <p className="text-[11px] text-muted-foreground">
              {isCreditCard ? "Available" : "Balance"}
            </p>

            <p
              title={formatter.format(balance)}
              className={`
                font-semibold leading-tight tabular-nums truncate
                ${String(balance).length > 12 ? "text-sm" : "text-base"}
                ${isPositive ? "text-success" : "text-destructive"}
              `}
            >
              {formatter.format(balance)}
            </p>
          </div>

          {/* Expand */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((p) => !p);
            }}
            className={`
              ml-1 rounded-md p-1.5
              text-muted-foreground
              transition-all
              hover:bg-muted
              ${expanded ? "rotate-180 text-foreground" : ""}
            `}
          >
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* ================= EXPANDED ================= */}
      {expanded && (
        <div className="mt-4 pt-3 border-t border-border space-y-2 text-xs text-muted-foreground">
          <div className="flex justify-between gap-2">
            <span>{isCreditCard ? "Credit Limit" : "Opening Balance"}</span>
            <span className="font-medium tabular-nums text-foreground truncate">
              {formatter.format(
                isCreditCard ? account?.creditLimit : account?.openingBalance
              )}
            </span>
          </div>

          {isCreditCard && (
            <div className="flex justify-between gap-2">
              <span>Utilized</span>
              <span className="font-medium tabular-nums truncate">
                {formatter.format(account?.creditLimit - balance || 0)}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-1 pt-2">
            {onEdit && <EditAccountTrigger initialData={account} />}
            {onDelete && (
              <IconButton destructive onClick={onDelete}>
                <Trash2 size={14} />
              </IconButton>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default AccountCard;

/* ---------- Helpers ---------- */

const IconButton = ({ children, onClick, destructive }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}
    className={`
      rounded-md p-2
      transition
      ${
        destructive
          ? "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }
    `}
  >
    {children}
  </button>
);
