import { fetchDashboardData } from "@/app/store/data.thunk";
import DateNav from "@/components/DateVavigation";
import StatCard from "@/components/ui/StatCard";
import TransactionCard from "@/features/transactions/components/TransactionCard";
import { TransactionsHeader } from "@/features/transactions/components/TransactionHeader";
import TransactionTrigger from "@/features/transactions/components/TransactionTrigger";
import { TxnFullList } from "@/features/transactions/store/transaction.selector";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Use optional chaining and default values for robustness
  const { todayTransactions: transactions = [], summary = {} } = useSelector(
    (s) => s.data,
  );
  const accounts = useSelector((s) => s.accounts);
  const categories = useSelector((s) => s.categories);

  // 🔁 Fetch dashboard whenever date changes
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchDashboardData({ date: selectedDate }));
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch, selectedDate]);

  // 🔁 Map raw transactions to View Models (Injecting Account/Category names)
  const viewTxns = useMemo(() => {
    if (!transactions.length) return [];

    return TxnFullList({ transactions, accounts, categories });
  }, [transactions, accounts, categories]);

  return (
    <section className="space-y-5 ">
      <header className="sticky top-0 z-10 bg-background border-b px-4 md:px-6 py-3 flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-semibold">Dashboard</h1>
        <DateNav
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </header>

      {/* Stats - using default 0 to prevent "undefined" showing in UI */}
      <div className="grid grid-cols-2 md:grid-cols-3  gap-2 px-4">
        <StatCard
          className={"col-span-2 md:col-span-1"}
          label="Balance"
          value={summary?.balance || 0}
          iconKey="wallet"
        />
        <StatCard
          className={`bg-emerald-400/20`}
          label="Income"
          value={summary?.income || 0}
          iconKey="incomeTrend"
        />
        <StatCard
          className={`bg-red-400/20`}
          label="Expense"
          value={summary?.expense || 0}
          iconKey="expenseTrend"
        />
      </div>

      <div className="flex justify-center  gap-2 px-4">
        <TransactionTrigger />
      </div>

      <div className="flex min-w-0 flex-col overflow-hidden">
        <TransactionsHeader title="Transactions of the day" />
        <div className="space-y-2 p-4 overflow-auto">
          {viewTxns.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              No transactions for this date
            </p>
          ) : (
            viewTxns.map((txn) => <TransactionCard key={txn?._id} txn={txn} />)
          )}
        </div>
      </div>
      <div className="h-14 md:h-0"></div>
    </section>
  );
};
export default Dashboard;
