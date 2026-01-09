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
import { useMediaQuery } from "@/hooks/useMediaQuery.hooks.js";
import AddCategoryForm from "./AddCategoryForm";

const CategoryShell = ({
  open,
  onOpenChange,
  mode = "create",
  initialData = null,
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{`${
              mode === "edit" ? "Edit" : "Add"
            } Category`}</DialogTitle>
          </DialogHeader>

          <AddCategoryForm
            onCancel={() => {
              onOpenChange(false);
            }}
            mode={mode}
            editValues={initialData}
            onSuccess={() => onOpenChange(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90dvh]">
        <DrawerHeader>
          <DrawerTitle>{`${
            mode === "edit" ? "Edit" : "Add"
          } Category`}</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-safe overflow-y-auto">
          <AddCategoryForm
            onCancel={() => {
              onOpenChange(false);
            }}
            mode={mode}
            editValues={initialData}
            onSuccess={() => onOpenChange(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryShell;
