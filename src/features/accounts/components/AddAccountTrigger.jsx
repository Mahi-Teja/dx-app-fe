import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccountShell from "./AccountShell.jsx";

const AddAccountTrigger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Account
      </Button>

      <AccountShell open={open} onOpenChange={setOpen} />
    </>
  );
};

export default AddAccountTrigger;
