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
