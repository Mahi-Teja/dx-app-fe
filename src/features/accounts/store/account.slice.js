import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccounts: (_, action) => {
      return action.payload; // full replace
    },
    addAccount: (state, action) => {
      const account = {
        ...action.payload,
        openingBalabce: action.payload.balance,
      };
      state.push(account);
    },

    creditAccount(state, action) {
      const { accountId, amount } = action.payload;
      const acc = state.find((a) => a.id === accountId);
      if (!acc) return;

      if (acc.creditLimit != null) {
        // Credit card: paying bill → reduce outstanding
        acc.balance = Math.max(0, acc.balance - amount);
      } else {
        // Asset
        acc.balance += amount;
      }
    },

    debitAccount(state, action) {
      const { accountId, amount } = action.payload;
      const acc = state.find((a) => a.id === accountId);
      if (!acc) return;

      if (acc.creditLimit != null) {
        // Credit card expense → increase outstanding
        acc.balance += amount;
      } else {
        // Asset expense
        acc.balance -= amount;
      }
    },

    transferBetweenAccounts(state, action) {
      const { fromAccountId, toAccountId, amount } = action.payload;

      const from = state.find((a) => a.id === fromAccountId);
      const to = state.find((a) => a.id === toAccountId);
      if (!from || !to) return;

      // debit source
      from.creditLimit != null
        ? (from.balance += amount)
        : (from.balance -= amount);

      // credit destination
      to.creditLimit != null
        ? (to.balance = Math.max(0, to.balance - amount))
        : (to.balance += amount);
    },

    updateAccount: (state, action) => {
      const updated = action.payload;
      const index = state.findIndex((a) => a.id === updated.id);
      if (index === -1) return;
      state[index] = updated;
    },

    deleteAccount: (state, action) =>
      state.filter((acc) => acc.id !== action.payload),

    resetAccount: () => initialState,
  },
});

export const {
  setAccounts,
  addAccount,
  creditAccount,
  debitAccount,
  transferBetweenAccounts,
  updateAccount,
  deleteAccount,
  resetAccount,
} = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
