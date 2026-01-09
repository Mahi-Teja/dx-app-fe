import { getUserAccounts } from "@/features/accounts/api/account.api";
import { getUserCategories } from "@/features/categories/api/category.api";
import { setDashboard } from "./data.slice";
import { setAccounts } from "@/features/accounts/store/account.slice";
import { setCategories } from "@/features/categories/store/category.slice";
import { getDashboardData } from "@/lib/api-client";

export const bootstrapApp = () => async (dispatch) => {
  try {
    const startDate = new Date().toLocaleDateString();
    const [accountsRes, categoriesRes, dashboard] = await Promise.all([
      getUserAccounts(),
      getUserCategories(),
      getDashboardData({ startDate }),
    ]);

    dispatch(
      setDashboard({
        transactions: dashboard?.activity?.today?.transactions ?? [],
        summary: dashboard?.summary ?? null,
      })
    );

    dispatch(setAccounts(accountsRes.data));
    dispatch(setCategories(categoriesRes.data));

    return true;
  } catch (err) {
    console.error("Bootstrap failed", err);
    throw err;
  }
};
