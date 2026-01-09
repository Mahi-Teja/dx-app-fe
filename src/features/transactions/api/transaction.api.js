/* ======================================================
   TRANSACTIONS
   ====================================================== */

import api from "@/config/api";

// Get all transactions
export const getUserTransactions = async (params = {}) => {
  try {
    const res = await api.get("/transactions/getList", {
      params,
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Create transaction (expense / income / transfer)
export const createTransaction = async (transaction) => {
  const res = await api.post("/transactions/create", transaction, {
    withCredentials: true,
  });
  return res.data;
};

// Update transaction
export const updateTransaction = async (transactionId, payload) => {
  const res = await api.put(`/transactions/update/${transactionId}`, payload, {
    withCredentials: true,
  });
  return res.data;
};

// Soft delete transaction
export const deleteTransaction = async (transactionId) => {
  const res = await api.delete(`/transactions/delete/${transactionId}`, {
    withCredentials: true,
  });
  return res.data;
};
export const deleteManyTransactions = async (transactionIds) => {
  const res = await api.delete(
    `/transactions/delete/many/ `,
    { transactionIds },
    {
      withCredentials: true,
    }
  );
  return res.data;
};
export const updateManyTransactions = async (data) => {
  const res = await api.delete(
    `/transactions/delete/many/ `,
    { data },
    {
      withCredentials: true,
    }
  );
  return res.data;
};

// Restore deleted transaction (optional but useful)
export const restoreTransaction = async (transactionId) => {
  const res = await api.put(
    `/transactions/restore/${transactionId}`,
    {},
    { withCredentials: true }
  );
  return res.data;
};
