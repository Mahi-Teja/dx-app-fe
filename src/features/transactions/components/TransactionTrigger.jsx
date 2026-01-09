import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TransactionShell from "@/layouts/TransactionShell";

const TransactionTrigger = ({ mode = "create", defaultValues = null }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={mode == "edit" ? "outline" : "default"}
        onClick={() => setOpen(true)}
      >
        {mode === "edit" ? (
          <>
            <Pencil className=" h-4 w-4" />
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </>
        )}
      </Button>

      <TransactionShell
        mode={mode}
        defaultValues={defaultValues}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default TransactionTrigger;
