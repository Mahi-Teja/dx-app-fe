/* ======================================================
   ACCOUNTS
   ====================================================== */
import api from "@/config/api.js";
// Get all user accounts
export const getUserAccounts = async () => {
  const res = await api.get("/accounts/get", { withCredentials: true });

  return res.data;
};

// Create account
export const createAccount = async (account) => {
  const res = await api.post("/accounts/create", account, {
    withCredentials: true,
  });

  return res.data;
};

// Update account
export const updateAccount = async (accountId, payload) => {
  const res = await api.put(`/accounts/update/${accountId}`, payload, {
    withCredentials: true,
  });
  return res.data;
};

// Delete account (soft delete recommended)
export const deleteAccount = async (accountId) => {
  const res = await api.delete(`/accounts/delete/${accountId}`, {
    withCredentials: true,
  });
  return res.data;
};
