/* ======================================================
CATEGORIES
====================================================== */

import api from "@/config/api.js";

// Get all categories
export const getUserCategories = async () => {
  const res = await api.get("/categories/get", { withCredentials: true });
  return res.data;
};

// Create category
export const createCategory = async (category) => {
  const res = await api.post("/categories/create", category, {
    withCredentials: true,
  });
  return res.data;
};

// Update category
export const updateCategory = async (categoryId, payload) => {
  const res = await api.put(`/categories/update/${categoryId}`, payload, {
    withCredentials: true,
  });
  return res.data;
};

// Delete category (soft delete recommended)
export const deleteCategory = async (categoryId) => {
  const res = await api.delete(`/categories/delete/${categoryId}`, {
    withCredentials: true,
  });
  return res.data;
};
