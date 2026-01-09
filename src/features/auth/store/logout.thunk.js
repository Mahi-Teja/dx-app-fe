import { persistor } from "@/app/store/store";
import { logoutUser } from "./auth.slice";
import { resetUser } from "./user.slice";
import { resetAccount } from "@/features/accounts/store/account.slice";
import { resetCategory } from "@/features/categories/store/category.slice";

export const performLogout = () => async (dispatch) => {
  try {
    await persistor.purge();

    dispatch(logoutUser());
    dispatch(resetUser());
    dispatch(resetAccount());
    dispatch(resetCategory());

    return true;
  } catch (err) {
    console.error("Logout failed", err);
    throw err;
  }
};
