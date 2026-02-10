import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccountShell from "./AccountShell.jsx";

const AddAccountTrigger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className={`text-xs md:text-sm`} onClick={() => setOpen(true)}>
        <Plus className=" " />
        Add Account
      </Button>

      <AccountShell open={open} onOpenChange={setOpen} />
    </>
  );
};

export default AddAccountTrigger;
