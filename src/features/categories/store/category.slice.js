import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (_, action) => {
      return action.payload; // full replace
    },
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    updateCategoryState: (state, action) => {},
    deleteCategory: (state, action) =>
      state.filter((cat) => cat.id !== action.payload),
    resetCategory: () => initialState,
  },
});

export const {
  setCategories,
  addCategory,
  updateCategoryState,
  deleteCategory,
  resetCategory,
} = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
