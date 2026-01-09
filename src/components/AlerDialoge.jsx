import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function DialogeTrigger({
  label,
  title,
  description,
  onAgree = () => {},
  onAgreeLabel,
  onDisAgree = () => {},
  onDisAgreeLabel,
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{label}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || "Are you sure? "}</AlertDialogTitle>
          <AlertDialogDescription>
            {description ||
              `This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{onDisAgreeLabel || `  Cancel`}</AlertDialogCancel>
          <AlertDialogAction
            className={"bg-destructive text-destructive-foreground  "}
            onClick={() => {
              onAgree();
            }}
          >
            {onAgreeLabel || `  Continue`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
