import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryShell from "./CategoryShell.jsx";

const EditCategoryTrigger = ({ initialData }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Pencil size={8} />
      </Button>

      <CategoryShell
        mode={"edit"}
        open={open}
        initialData={initialData}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default EditCategoryTrigger;
