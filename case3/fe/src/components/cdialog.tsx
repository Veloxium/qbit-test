import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

type CDialogProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  type: "product" | "testimonial";
  mode: "add" | "edit";
  initialData?: any;
  onSubmit: (data: any) => void;
};

export function CDialog({
  open,
  onOpenChange,
  type,
  mode,
  initialData,
  onSubmit,
}: CDialogProps) {
  const [form, setForm] = useState<any>({
    img: "",
    title: "",
    description: "",
    price: "",
    name: "",
    text: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm((prev: any) => ({
        ...prev,
        ...initialData,
      }));
    } else {
      setForm({
        img: "",
        title: "",
        description: "",
        price: "",
        name: "",
        text: "",
      });
    }
  }, [initialData, open]);

  const handleChange = (field: string, value: string) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    onOpenChange(false);
  };

  const isProduct = type === "product";
  const titleText =
    mode === "add"
      ? isProduct
        ? "Add Product"
        : "Add Testimonial"
      : isProduct
      ? "Edit Product"
      : "Edit Testimonial";


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{titleText}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {isProduct ? (
            <>
              <Input
                placeholder="Image Path"
                value={form.img}
                onChange={(e) => handleChange("img", e.target.value)}
              />
              <Input
                placeholder="Title"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              <Textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
              <Input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </>
          ) : (
            <>
              <Input
                placeholder="Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <Textarea
                placeholder="Text"
                value={form.text}
                onChange={(e) => handleChange("text", e.target.value)}
              />
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Save" : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
