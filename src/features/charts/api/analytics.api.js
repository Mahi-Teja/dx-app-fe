import api from "@/config/api";

// Get all transactions
export const getAnalyticsData = async (window) => {
  try {
    const res = await api.get("/data/analytics/get", {
      params: window,
      withCredentials: true,
    });

    return res?.data;
  } catch (error) {
    console.error(error);
  }
};
