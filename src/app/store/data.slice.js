import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  summary: {
    income: 0,
    expense: 0,
    balance: 0,
  },
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDashboard: (state, action) => {
      const { transactions, summary } = action.payload;
      return { transactions, summary };
    },
    resetDashboard: () => initialState,
  },
});

export const { setDashboard, resetDashboard } = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
