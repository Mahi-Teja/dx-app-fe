import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserAccounts } from "@/features/accounts/api/account.api";
import { setAccounts } from "@/features/accounts/store/account.slice";
import EmptyStateNoAction from "@/components/EmptyStateNoAction";
import AccountCard from "@/features/accounts/components/AccountCard";

const AccountsTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fn() {
      const res = await getUserAccounts();
      dispatch(setAccounts(res.data));
    }
    fn();
  }, [dispatch]);

  const accounts = useSelector((s) => s.accounts);

  if (!accounts.length) {
    return <EmptyStateNoAction title="No accounts yet" />;
  }

  return (
    <div className="grid gap-4 px-4 md:px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {accounts.map((acc) => (
        <AccountCard
          key={acc._id || acc.id}
          account={acc}
          onDelete={() => {}}
          onEdit={() => {}}
          onClick={() => {}}
        />
      ))}
    </div>
  );
};

export default AccountsTab;
