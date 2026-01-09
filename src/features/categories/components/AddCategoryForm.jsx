import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createCategory,
  updateCategory as updateCategoryApi,
} from "../api/category.api.js";
import { addCategory, updateCategoryState } from "../store/category.slice.js";

const AddCategoryForm = ({
  defaultType = "expense",
  onSuccess,
  mode = "create", // "create" | "edit"
  editValues = null, // category object when editing
}) => {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.categories);

  const isEdit = mode === "edit";

  const [type, setType] = useState(defaultType);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [group, setGroup] = useState("");

  // -----------------------------
  // Prefill / Reset when editValues changes
  // -----------------------------
  useEffect(() => {
    if (isEdit && editValues?._id) {
      setType(editValues.type || defaultType);
      setName(editValues.name || "");
      setEmoji(editValues.emoji || "");
      setGroup(editValues.group || "");
    } else if (!isEdit) {
      // reset for create mode
      setType(defaultType);
      setName("");
      setEmoji("");
      setGroup("");
    }
  }, [isEdit, editValues?._id, defaultType]);

  // -----------------------------
  // Duplicate check (ignore self)
  // -----------------------------
  const exists = categories.some((c) => {
    if (isEdit && c._id === editValues?._id) return false;
    return c.name.toLowerCase() === name.trim().toLowerCase();
  });

  // -----------------------------
  // Submit
  // -----------------------------
  const handleSubmit = async () => {
    if (!name.trim()) return;

    if (exists) {
      toast.error("Category already exists");
      return;
    }

    const payload = {
      name: name.trim(),
      emoji: emoji || undefined,
      type,
      group: group.trim() || undefined,
    };

    const handleRequest = async () => {
      if (isEdit && editValues?._id) {
        const res = await updateCategoryApi(editValues._id, payload);
        dispatch(updateCategoryState(res.data));
        onSuccess?.();
        return res;
      } else {
        const res = await createCategory(payload);
        dispatch(addCategory(res.data));
        onSuccess?.();
        return res;
      }
    };

    toast.promise(handleRequest(), {
      loading: isEdit ? "Updating category..." : "Creating category...",
      success: isEdit ? "Category updated!" : "Category created!",
      error: (err) =>
        err.response?.data?.message ||
        (isEdit ? "Failed to update category" : "Failed to create category"),
    });
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="space-y-4">
      {/* Type selector (lock in edit mode) */}
      <div className="flex rounded-lg overflow-hidden border">
        {["expense", "income"].map((t) => (
          <button
            key={t}
            disabled={isEdit}
            onClick={() => setType(t)}
            className={`flex-1 py-2 text-sm font-medium transition ${
              type === t
                ? t === "expense"
                  ? "bg-rose-500 text-white"
                  : "bg-emerald-500 text-white"
                : "bg-muted"
            } ${isEdit ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>

      <Input
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Emoji (optional)"
        value={emoji}
        maxLength={2}
        onChange={(e) => setEmoji(e.target.value)}
        className="w-24 text-center text-lg"
      />

      <Input
        placeholder="Group name: eg: Entertainment, Utility.."
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      />

      <Button className="w-full" onClick={handleSubmit} disabled={!name.trim()}>
        {isEdit ? "Update Category" : "Add Category"}
      </Button>
    </div>
  );
};

export default AddCategoryForm;
