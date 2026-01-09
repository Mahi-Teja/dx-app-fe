import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccountShell from "./AccountShell.jsx";

const EditAccountTrigger = ({ initialData }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Pencil size={8} />
      </Button>

      <AccountShell
        mode={"edit"}
        open={open}
        initialData={initialData}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default EditAccountTrigger;
