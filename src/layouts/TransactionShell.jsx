import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import TransactionForm from "@/features/transactions/components/AddTransactionsForm";
import { fetchUserTransactions } from "@/features/transactions/store/transaction.thunk";
import { useMediaQuery } from "@/hooks/useMediaQuery.hooks";
import { useDispatch } from "react-redux";

const TransactionShell = ({ mode, defaultValues, open, onOpenChange }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const dispatch = useDispatch();

  if (isDesktop) {
    /* =====================
       DESKTOP → DIALOG
       ===================== */
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{`${
              mode === "edit" ? "Edit" : "Add"
            } Transaction`}</DialogTitle>
          </DialogHeader>

          <TransactionForm
            mode={mode}
            initialData={defaultValues}
            onSuccess={() => {
              dispatch(
                fetchUserTransactions({
                  page: 1, // or current page
                  limit: 50,
                  // ...filters,
                })
              );
              onOpenChange(false);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  /* =====================
     MOBILE → DRAWER
     ===================== */
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90dvh]">
        <DrawerHeader>
          <DrawerTitle>{`${
            mode === "edit" ? "Edit" : "Add"
          } Transaction`}</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-10 overflow-y-auto">
          <TransactionForm
            mode={mode}
            initialData={defaultValues}
            onSuccess={() => {
              dispatch(
                fetchUserTransactions({
                  page: 1, // or current page
                  limit: 50,
                  // ...filters,
                })
              );
              onOpenChange(false);
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TransactionShell;
