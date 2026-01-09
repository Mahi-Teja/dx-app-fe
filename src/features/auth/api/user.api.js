import api from "@/config/api";
/* ======================================================
   USER
   ====================================================== */

// Get current logged-in user
export const getCurrentUser = async () => {
  const res = await api.get("/user/get", { withCredentials: true });
  return res.data;
};

// Update user profile
export const updateUser = async (payload) => {
  const res = await api.put("/user/update", payload, {
    withCredentials: true,
  });
  return res.data;
};
