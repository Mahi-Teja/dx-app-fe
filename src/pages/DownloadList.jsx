import { DownloadTransactionsPDF } from "@/features/transactions/components/DownloadAsPDF";
import { TxnFullList } from "@/features/transactions/store/transaction.selector";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

export const DownloadList = () => {
  const { items } = useSelector((s) => s.transactions);
  const accounts = useSelector((s) => s.accounts);
  const categories = useSelector((s) => s.categories);

  const transactions = useMemo(() => {
    return TxnFullList({ transactions: items, accounts, categories });
  }, [items, accounts, categories]);

  return (
    /* 1. 'min-h-screen' ensures it centers vertically on the whole page 
       2. 'w-full' ensures it has room to push the card to the middle
    */
    <section className="min-h-[80vh] w-full flex flex-col justify-center items-center p-4">
      {/* 3. 'w-full max-w-md' ensures the card is responsive but doesn't get too wide */}
      <div className="w-full max-w-md">
        <div className="rounded-xl border bg-card shadow-sm">
          {/* Header */}
          <div className="border-b px-5 py-4">
            <h2 className="text-base font-semibold">Export Transactions</h2>
            <p className="text-sm text-muted-foreground">
              Download your transaction history for backup or reports.
            </p>
          </div>

          {/* Body */}
          <div className="p-5 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Format</div>
                <div className="text-xs text-muted-foreground">
                  Currently supported
                </div>
              </div>
              <div className="px-3 py-1 rounded-md border text-sm font-medium bg-muted">
                PDF (.pdf)
              </div>
            </div>

            <div className="pt-2">
              <DownloadTransactionsPDF
                transactions={transactions}
                fileName="dx-transactions.pdf"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
