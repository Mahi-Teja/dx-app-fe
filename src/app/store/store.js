import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "@/features/auth/store/auth.slice";
import { userReducer } from "@/features/auth/store/user.slice";
import { accountReducer } from "@/features/accounts/store/account.slice";
import { categoryReducer } from "@/features/categories/store/category.slice";
import { transactionReducer } from "@/features/transactions/store/transaction.slice";
import { dataReducer } from "./data.slice";

const rootReducer = combineReducers({
  user: userReducer,
  accounts: accountReducer,
  categories: categoryReducer,
  transactions: transactionReducer,
  auth: authReducer,
  data: dataReducer,
});

const persistConfig = {
  key: "dx-root",
  storage,
  whitelist: ["user", "accounts", "categories", "transactions", "auth", "data"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
