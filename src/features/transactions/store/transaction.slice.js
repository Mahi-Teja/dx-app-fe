import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  // page: 1,
  limit: 10,
  totalCount: 0,
  status: "idle", // idle | loading | success | error
  error: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    fetchTransactionsStart(state) {
      state.status = "loading";
      state.error = null;
    },

    fetchTransactionsSuccess(state, action) {
      const {
        items,
        //  page,
        limit,
        totalCount,
      } = action.payload;

      state.items = items;
      // state.page = page;
      state.limit = limit;
      state.totalCount = totalCount;
      state.status = "success";
    },

    fetchTransactionsError(state, action) {
      state.status = "error";
      state.error = action.payload || "Failed to fetch transactions";
    },

    resetTransactions() {
      return initialState;
    },
  },
});

export const {
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsError,
  resetTransactions,
} = transactionSlice.actions;

export const transactionReducer = transactionSlice.reducer;
