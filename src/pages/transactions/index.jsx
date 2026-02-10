import EmptyStateNoAction from "@/components/EmptyStateNoAction.jsx";
import PaginationFooter from "@/components/PageButtonsFooter.jsx";
import TransactionCardSkeleton from "@/features/transactions/components/SkeletonForTransactionCard.jsx";
import TransactionCard from "@/features/transactions/components/TransactionCard.jsx";
import { TransactionsHeader } from "@/features/transactions/components/TransactionHeader.jsx";
import { TxnFullList } from "@/features/transactions/store/transaction.selector";
import { fetchUserTransactions } from "@/features/transactions/store/transaction.thunk.js";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Transactions = () => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  // UI state
  const [filters, setFilters] = useState(
    "" || {
      search: "",
      type: "",
      categoryId: "",
      accountId: "",
      date: {
        range: true,
        start: "",
        end: "",
      },
    },
  );
  const [page, setPage] = useState(1);

  // Store state
  const { items, totalCount, limit, status } = useSelector(
    (s) => s.transactions,
  );
  const accounts = useSelector((s) => s.accounts);
  const categories = useSelector((s) => s.categories);

  // Resolve view model ONCE per fetch
  const viewItems = useMemo(() => {
    return TxnFullList({ transactions: items, accounts, categories });
  }, [items, accounts, categories]);

  useEffect(() => {
    dispatch(
      fetchUserTransactions({
        page,
        limit,
        ...filters,
      }),
    );
  }, [dispatch, page, limit, filters]);

  if (status === "loading") {
    return (
      <section className="flex flex-col h-full">
        <TransactionsHeader
          title="Transactions"
          show={false}
          filters={filters}
          onFiltersChange={() => {}}
        />

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <TransactionCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  // if (status === "error") {
  //   return (
  //     <EmptyStateNoAction
  //       icon="🔦"
  //       title="Failed to Load Transactions"
  //       description="Unable fetch transactions at this moment, try agian later."
  //     />
  //   );
  // }
  return (
    <section className="flex flex-col h-full">
      <TransactionsHeader
        transactions={viewItems}
        filters={filters}
        onFiltersChange={(next) => {
          setPage(1);
          setFilters(next);
        }}
      />

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 md:pb-2 md:px-6 py-4 space-y-3">
        {viewItems?.length > 0 ? (
          viewItems?.map((txn) => <TransactionCard key={txn?._id} txn={txn} />)
        ) : (
          <EmptyStateNoAction />
        )}
      </div>

      {totalCount > limit && (
        <PaginationFooter
          page={page}
          totalPages={Math.ceil(totalCount / limit)}
          isLoading={status === "loading"}
          onPageChange={setPage}
        />
      )}
    </section>
  );
};

export default Transactions;
