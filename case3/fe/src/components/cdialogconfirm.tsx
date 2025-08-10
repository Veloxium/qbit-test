import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeleteConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "product" | "testimonial";
  onConfirm: () => void;
};

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  type,
  onConfirm,
}: DeleteConfirmDialogProps) {
  const titleText = `Delete ${type === "product" ? "Product" : "Testimonial"}`;
  const descriptionText = `Are you sure you want to delete this ${type}? This action cannot be undone.`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{titleText}</DialogTitle>
        </DialogHeader>

        <div className="py-4 text-center text-gray-700">{descriptionText}</div>

        <DialogFooter className="justify-between">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
