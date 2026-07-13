import api from "@/config/api";

export const signup = async (data) => {
  const res = await api.post("/auth/register", data, { withCredentials: true });
  return res.data;
};
export const login = async (data) => {
  const res = await api.post("/auth/login", data, { withCredentials: true });
  return res.data;
};
export const googleAuth = async (data) => {
  const res = await api.post("/auth/google/sign", data, {
    withCredentials: true,
  });
  return res.data;
};
export const logout = async () => {
  await api.post("/auth/logout");
};

export const forgotPassword = async (email) => {
  const res = await api.post(
    "/auth/forgot-password",
    { email },
    {
      withCredentials: true,
    },
  );
  return res.data;
};
export const verifyResetPassword = async (token) => {
  const res = await api.get(`/auth/verify-reset-password/${token}`);
  return res.data;
};

export const resetPassword = async ({
  newPassword,
  confirmPassword,
  token,
}) => {
  const res = await api.patch(
    `/auth/reset-password/${token}`,
    { newPassword, confirmPassword },
    {
      withCredentials: true,
    },
  );
  return res.data;
};
