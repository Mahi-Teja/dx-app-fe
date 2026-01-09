import api from "@/config/api";
// /* ======================================================
//    USER
//    ====================================================== */

// // Get current logged-in user
// export const getCurrentUser = async () => {
//   const res = await api.get("/user/get", { withCredentials: true });
//   return res.data;
// };

// // Update user profile
// export const updateUser = async (payload) => {
//   const res = await api.put("/user/update", payload, {
//     withCredentials: true,
//   });
//   return res.data;
// };

// /* ======================================================
//    ACCOUNTS
//    ====================================================== */

// // Get all user accounts
// export const getUserAccounts = async () => {
//   const res = await api.get("/accounts/get", { withCredentials: true });

//   return res.data;
// };

// // Create account
// export const createAccount = async (account) => {
//   const res = await api.post("/accounts/create", account, {
//     withCredentials: true,
//   });

//   return res.data;
// };

// // Update account
// export const updateAccount = async (accountId, payload) => {
//   const res = await api.put(`/accounts/update/${accountId}`, payload, {
//     withCredentials: true,
//   });
//   return res.data;
// };

// // Delete account (soft delete recommended)
// export const deleteAccount = async (accountId) => {
//   const res = await api.delete(`/accounts/delete/${accountId}`, {
//     withCredentials: true,
//   });
//   return res.data;
// };

// /* ======================================================
// CATEGORIES
// ====================================================== */

// // Get all categories
// export const getUserCategories = async () => {
//   const res = await api.get("/categories/get", { withCredentials: true });
//   return res.data;
// };

// // Create category
// export const createCategory = async (category) => {
//   const res = await api.post("/categories/create", category, {
//     withCredentials: true,
//   });
//   return res.data;
// };

// // Update category
// export const updateCategory = async (categoryId, payload) => {
//   const res = await api.put(`/categories/update/${categoryId}`, payload, {
//     withCredentials: true,
//   });
//   return res.data;
// };

// // Delete category (soft delete recommended)
// export const deleteCategory = async (categoryId) => {
//   const res = await api.delete(`/categories/delete/${categoryId}`, {
//     withCredentials: true,
//   });
//   return res.data;
// };

// /* ======================================================
//    TRANSACTIONS
//    ====================================================== */

// // Get all transactions
// export const getUserTransactions = async (params = {}) => {
//   try {
//     const res = await api.get("/transactions/getList", {
//       params,
//       withCredentials: true,
//     });

//     return res.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Create transaction (expense / income / transfer)
// export const createTransaction = async (transaction) => {
//   const res = await api.post("/transactions/create", transaction, {
//     withCredentials: true,
//   });
//   return res.data;
// };

// // Update transaction
// export const updateTransaction = async (transactionId, payload) => {
//   const res = await api.put(`/transactions/update/${transactionId}`, payload, {
//     withCredentials: true,
//   });
//   return res.data;
// };

// // Soft delete transaction
// export const deleteTransaction = async (transactionId) => {
//   const res = await api.delete(`/transactions/delete/${transactionId}`, {
//     withCredentials: true,
//   });
//   return res.data;
// };
// export const deleteManyTransactions = async (transactionIds) => {
//   const res = await api.delete(
//     `/transactions/delete/many/ `,
//     { transactionIds },
//     {
//       withCredentials: true,
//     }
//   );
//   return res.data;
// };
// export const updateManyTransactions = async (data) => {
//   const res = await api.delete(
//     `/transactions/delete/many/ `,
//     { data },
//     {
//       withCredentials: true,
//     }
//   );
//   return res.data;
// };

// // Restore deleted transaction (optional but useful)
// export const restoreTransaction = async (transactionId) => {
//   const res = await api.put(
//     `/transactions/restore/${transactionId}`,
//     {},
//     { withCredentials: true }
//   );
//   return res.data;
// };
export const getDashboardData = async ({
  startDate = Date.now(),
  endDate,
} = {}) => {
  const res = await api.get("/data/dashboard/get", {
    params: {
      startDate,
      endDate,
      limit: 100,
    },
    withCredentials: true,
  });

  return res.data.data;
};
