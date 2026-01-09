import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryShell from "./CategoryShell.jsx";

const AddCategoryTrigger = ({ defaultType = "expense" }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Category
      </Button>

      <CategoryShell
        open={open}
        onOpenChange={setOpen}
        defaultType={defaultType}
      />
    </>
  );
};

export default AddCategoryTrigger;
