import { getDashboardData } from "@/lib/api-client";
import { setDashboard } from "./data.slice";

export const fetchDashboardData =
  ({ date, startDate, endDate } = {}) =>
  async (dispatch) => {
    try {
      const formatDate = (d) => {
        const dateObj = d instanceof Date ? d : new Date(d);
        if (isNaN(dateObj)) {
          return new Date().toISOString().split("T")[0];
        }
        return dateObj.toISOString().split("T")[0];
      };

      const from = startDate
        ? formatDate(startDate)
        : formatDate(date || new Date());

      const to = endDate ? formatDate(endDate) : from;

      const dashboard = await getDashboardData({
        startDate: from,
        endDate: to,
      });

      dispatch(
        setDashboard({
          transactions: dashboard?.activity?.today?.transactions ?? [],
          summary: dashboard?.summary ?? {
            income: 0,
            expense: 0,
            balance: 0,
          },
        })
      );
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    }
  };
