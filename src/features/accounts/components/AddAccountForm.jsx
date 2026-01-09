import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { ACCOUNT_TYPES } from "@/utils/constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { addAccount, updateAccount } from "../store/account.slice";
import {
  createAccount,
  updateAccount as updateAccountApi,
} from "../api/account.api";

const AccountForm = ({
  mode = "create", // "create" | "edit"
  initialData = null, // account object when editing
  onSuccess,
  onCancel,
}) => {
  const dispatch = useDispatch();
  const isEdit = mode === "edit";

  const form = useForm({
    defaultValues: {
      name: "",
      icon: "",
      type: "cash",
      initialBalance: "",
      asOf: new Date().toISOString().slice(0, 10),

      creditLimit: "",
      billingDay: "",
      dueInDays: "",
    },
  });

  const type = form.watch("type");
  const isCreditCard = type === "credit_card";

  // Load initial data in edit mode
  useEffect(() => {
    if (isEdit && initialData) {
      form.reset({
        name: initialData.name,
        type: initialData.type,
        icon: initialData.icon || "💰",

        // metadata only
        creditLimit: initialData.creditLimit || "",
        billingDay: initialData.billingDay || "",
        dueInDays: initialData.dueInDays || "",

        // locked fields
        initialBalance: "",
        asOf: "",
      });
    }
  }, [isEdit, initialData, form]);

  const onSubmit = async (data) => {
    try {
      if (!data.name.trim()) {
        return toast.error("Account name is required");
      }

      if (isCreditCard) {
        if (!data.creditLimit || !data.billingDay || !data.dueInDays) {
          return toast.error("Credit card details are required");
        }
      }

      if (!isEdit) {
        // ---------------- CREATE ----------------
        const payload = {
          name: data.name.trim(),
          type: data.type,
          icon: ACCOUNT_TYPES[data.type.toUpperCase()]?.icon || "💰",

          initialBalance: Number(data.initialBalance || 0),
          asOf: new Date(data.asOf).toISOString(),
        };

        if (isCreditCard) {
          payload.creditLimit = Number(data.creditLimit);
          payload.billingDay = Number(data.billingDay);
          payload.dueInDays = Number(data.dueInDays);
        }

        const res = await createAccount(payload);
        dispatch(addAccount(res.data));
        toast.success("Account created successfully");
      } else {
        // ---------------- UPDATE METADATA ----------------
        const patch = {
          name: data.name.trim(),
        };

        if (isCreditCard) {
          patch.creditLimit = Number(data.creditLimit);
          patch.billingDay = Number(data.billingDay);
          patch.dueInDays = Number(data.dueInDays);
        }

        const res = await updateAccountApi(initialData._id, patch);
        dispatch(updateAccount(res.data));
        toast.success("Account updated successfully");
      }

      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save account");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Account Name */}
      <Input
        placeholder="Account name"
        {...form.register("name", { required: true })}
      />
      {isEdit && (
        <Input placeholder="Account icon" {...form.register("icon")} />
      )}

      {/* Account Type (LOCKED IN EDIT) */}
      <Select
        value={type}
        onValueChange={(v) => form.setValue("type", v)}
        disabled={isEdit}
      >
        <SelectTrigger>
          <SelectValue placeholder="Account type" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(ACCOUNT_TYPES).map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Create-only fields */}
      {!isEdit && (
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            step="0.01"
            placeholder={
              isCreditCard ? "Current outstanding" : "Current balance"
            }
            {...form.register("initialBalance", { valueAsNumber: true })}
          />
          <Input type="date" {...form.register("asOf")} />
        </div>
      )}

      {/* Credit Card Fields */}
      {isCreditCard && (
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder="Credit limit"
            {...form.register("creditLimit", { valueAsNumber: true })}
          />
          <Input
            type="number"
            placeholder="Billing day"
            {...form.register("billingDay", { valueAsNumber: true })}
          />
          <Input
            type="number"
            placeholder="Due in days"
            {...form.register("dueInDays", { valueAsNumber: true })}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          {isEdit ? "Update Account" : "Create Account"}
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;
