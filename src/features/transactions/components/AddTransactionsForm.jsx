import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmptyStateNoAction from "@/components/EmptyStateNoAction";
import {
  createTransaction,
  updateTransaction,
} from "../api/transaction.api.js";

/**
 * Props:
 * - mode: "create" | "edit"
 * - initialData: transaction (for edit)
 * - onSuccess: callback
 */
const TransactionForm = ({
  mode = "create",
  initialData = null,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const accounts = useSelector((s) => s.accounts);
  const categories = useSelector((s) => s.categories);

  const isEdit = mode === "edit";

  const form = useForm({
    defaultValues: {
      type: "expense",
      direction: "debit",
      amount: "",
      description: "",
      note: "",
      accountId: "",
      toAccountId: "",
      categoryId: "",
      occurredAt: new Date().toISOString().split("T")[0],
    },
  });

  const type = form.watch("type");

  // -----------------------------
  // Prefill in edit mode
  // -----------------------------
  useEffect(() => {
    if (isEdit && initialData?._id) {
      form.reset({
        type: initialData.type,
        direction: initialData.direction,
        amount: initialData.amount,
        description: initialData.description || "",
        note: initialData.note || "",

        // 🔴 IMPORTANT: normalize IDs
        accountId:
          typeof initialData.accountId === "object"
            ? initialData.accountId._id
            : initialData.accountId,

        toAccountId:
          typeof initialData.toAccountId === "object"
            ? initialData.toAccountId?._id || ""
            : initialData.toAccountId || "",

        categoryId:
          typeof initialData.categoryId === "object"
            ? initialData.categoryId?._id || ""
            : initialData.categoryId || "",

        occurredAt: new Date(initialData.occurredAt)
          .toISOString()
          .split("T")[0],
      });
    }
  }, [isEdit, initialData?._id]);

  // -----------------------------
  // Auto direction by type (create mode only)
  // -----------------------------
  useEffect(() => {
    if (isEdit) return;

    if (type === "expense") form.setValue("direction", "debit");
    if (type === "income") form.setValue("direction", "credit");
    if (type === "transfer") form.setValue("direction", "debit");
  }, [type, isEdit]);

  // -----------------------------
  // Submit
  // -----------------------------
  const onSubmit = async (data) => {
    const amount = Number(data.amount);
    if (!amount || amount <= 0) {
      return toast.error("Amount must be > 0");
    }

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (!data.accountId) {
      return toast.error("Account is required");
    }

    if (data.type === "transfer") {
      if (!data.toAccountId) return toast.error("Destination account required");
      if (data.toAccountId === data.accountId)
        return toast.error("Cannot transfer to same account");
    }

    const payload = {
      type: data.type,
      direction: data.direction,
      amount,
      accountId: data.accountId,
      toAccountId: data.type === "transfer" ? data.toAccountId : undefined,
      categoryId:
        data.type !== "transfer" ? data.categoryId || undefined : undefined,
      description: data.description || undefined,
      note: data.note || undefined,
      timezone,
      occurredAt: new Date(data.occurredAt),
    };

    const exec = async () => {
      if (isEdit) {
        return updateTransaction(initialData._id, payload);
      } else {
        return createTransaction(payload);
      }
    };

    toast.promise(exec(), {
      loading: isEdit ? "Updating transaction..." : "Creating transaction...",
      success: () => {
        onSuccess?.();
        return isEdit ? "Transaction updated" : "Transaction created";
      },
      error: (err) => err.response?.data?.message || "Operation failed",
    });
  };

  // -----------------------------
  // UI
  // -----------------------------
  if (type === "transfer" && accounts.length < 2) {
    return (
      <EmptyStateNoAction
        title="Cannot transfer"
        description="You need at least two accounts"
      />
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      {/* Type */}
      <div className="flex gap-2">
        {[
          { label: "Expense", value: "expense" },
          { label: "Income", value: "income" },
          { label: "Transfer", value: "transfer" },
        ].map((t) => (
          <Button
            key={t.value}
            type="button"
            variant={type === t.value ? "default" : "outline"}
            className="flex-1"
            disabled={isEdit} // lock type in edit mode
            onClick={() => form.setValue("type", t.value)}
          >
            {t.label}
          </Button>
        ))}
      </div>

      <Input {...form.register("description")} placeholder="Description" />

      <Input
        type="number"
        step="0.01"
        {...form.register("amount", { required: true, min: 0.01 })}
        placeholder="Amount"
      />

      {/* Date */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Date</label>
        <div className="flex gap-2">
          <Input
            type="date"
            {...form.register("occurredAt", { required: true })}
            className="flex-1"
            onClick={(e) => e.target.showPicker?.()}
          />
          <button
            type="button"
            onClick={() => {
              const today = new Date().toISOString().split("T")[0];
              form.setValue("occurredAt", today);
            }}
            className="text-xs font-medium px-4 py-2 rounded bg-secondary"
          >
            Today
          </button>
        </div>
      </div>

      {/* Selectors */}
      {type !== "transfer" && (
        <>
          <Select
            label="Category"
            items={categories.filter((c) => c.type === type)}
            value={form.watch("categoryId")}
            onSelect={(id) => form.setValue("categoryId", id)}
          />
          <Select
            label="Account"
            items={accounts}
            value={form.watch("accountId")}
            onSelect={(id) => form.setValue("accountId", id)}
          />
        </>
      )}

      {type === "transfer" && (
        <>
          <Select
            label="From account"
            items={accounts}
            value={form.watch("accountId")}
            onSelect={(id) => form.setValue("accountId", id)}
          />
          <Select
            label="To account"
            items={accounts.filter((a) => a._id !== form.watch("accountId"))}
            value={form.watch("toAccountId")}
            onSelect={(id) => form.setValue("toAccountId", id)}
          />
        </>
      )}

      <Input {...form.register("note")} placeholder="Additional note" />

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button type="submit" className="flex-1">
          {isEdit ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;

/* -------------------------------- */

const Select = ({ label, items, value, onSelect }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">{label}</label>
    <select
      className="w-full rounded-md border px-3 py-2"
      value={value || ""}
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">Select</option>
      {items.map((i) => (
        <option key={i._id} value={i._id}>
          {i.name}
        </option>
      ))}
    </select>
  </div>
);
