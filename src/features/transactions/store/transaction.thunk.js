import { getUserTransactions } from "../api/transaction.api.js";
import {
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsError,
} from "./transaction.slice.js";

export const fetchUserTransactions =
  ({ page = 1, limit = 20, ...filters } = {}) =>
  async (dispatch) => {
    dispatch(fetchTransactionsStart());

    try {
      const res = await getUserTransactions({
        page,
        limit,
        ...filters,
      });

      if (!res?.success) {
        throw new Error("API returned unsuccessful response");
      }

      const { transactions, pagination } = res.data;

      dispatch(
        fetchTransactionsSuccess({
          items: transactions,
          //   page: pagination.currentPage,
          limit: pagination.limit,
          totalCount: pagination.total,
        })
      );
    } catch (error) {
      dispatch(
        fetchTransactionsError(error?.message || "Unable to fetch transactions")
      );
    }
  };

export const selectTransactionView = ({
  transaction,
  accounts,
  categories,
}) => {
  if (!transaction) return null;

  const account = accounts.find((a) => a._id === transaction.accountId) || null;

  const toAccount = transaction.toAccountId
    ? accounts.find((a) => a._id === transaction.toAccountId) || null
    : null;

  const category = transaction.categoryId
    ? categories.find((c) => c._id === transaction.categoryId) || null
    : null;

  return {
    _id: transaction._id,
    type: transaction.type,
    amount: transaction.amount,
    description: transaction.description,
    note: transaction.note,
    occurredAt: transaction.occurredAt,

    account: account ? { id: account._id, name: account.name } : null,

    toAccount: toAccount ? { id: toAccount._id, name: toAccount.name } : null,

    category: category
      ? {
          id: category._id,
          name: category.name,
          emoji: category.emoji,
        }
      : null,
  };
};
