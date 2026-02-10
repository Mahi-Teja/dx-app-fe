// selectors/transaction.selectors.js
import { createSelector } from "@reduxjs/toolkit";
import { isSameDay } from "date-fns";
import toast from "react-hot-toast";

// 1. Basic "input" selectors
const selectAllTransactions = (state) => state.transactions.items;
const selectDate = (state, date) => date;

// 2. Memoized selector
export const selectTransactionsByDate = createSelector(
  [selectAllTransactions, selectDate],
  (transactions, selectedDate) => {
    if (!selectedDate) return transactions;

    // This expensive filtering only runs if transactions or selectedDate changes
    return transactions.filter((txn) =>
      txn.occurredAt.startsWith(selectedDate),
    );
  },
);
export const selectTransactionView = (txn, accounts, categories) => {
  const account = accounts?.find(
    (a) => a._id === txn.accountId && !a.isDeleted,
  );

  const toAccount =
    txn.type === "transfer" && txn.toAccountId
      ? accounts?.find((a) => a._id === txn.toAccountId && !a.isDeleted)
      : null;

  const category = txn.categoryId
    ? categories?.find((c) => c._id === txn.categoryId && !c.isDeleted)
    : null;

  return {
    ...txn,
    account,
    toAccount,
    category,
  };
};

export const TxnFullList = ({
  transactions = [],
  accounts = [],
  categories = [],
}) => {
  const list = transactions.map((txn) => {
    const AccId = txn.accountId;
    const CatId = txn.categoryId;
    const isDeleted = txn.isDeleted;
    let toAccount = {};
    if (isDeleted) return null;
    const account = accounts.find((acc) => acc._id === AccId);
    const category = categories.find((cat) => cat._id === CatId);

    // if (!account || !category) return null;
    if (txn.type === "transfer") {
      toAccount = accounts.find((acc) => acc._id === txn.toAccountId);
      return {
        category,
        account,
        toAccount,
        ...txn,
      };
    }

    return {
      category,
      account,
      ...txn,
    };
  });
  return list;
};
