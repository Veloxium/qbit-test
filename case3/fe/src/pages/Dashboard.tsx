import { CDialog } from "@/components/cdialog";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PenLine, X } from "lucide-react";
import { useReducer, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import type { Product, Testimonial } from "@/utils/type";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { DeleteConfirmDialog } from "@/components/cdialogconfirm";

type DialogState = {
  open: boolean;
  type: "product" | "testimonial";
  mode: "add" | "edit";
  initialData?: any;
};

type DialogAction =
  | {
      type: "OPEN";
      payload: {
        dialogType: "product" | "testimonial";
        mode: "add" | "edit";
        data?: any;
      };
    }
  | { type: "CLOSE" };

function dialogReducer(state: DialogState, action: DialogAction): DialogState {
  switch (action.type) {
    case "OPEN":
      return {
        open: true,
        type: action.payload.dialogType,
        mode: action.payload.mode,
        initialData: action.payload.data,
      };
    case "CLOSE":
      return { ...state, open: false };
    default:
      return state;
  }
}

export default function Dashboard() {
  const [dialogState, dispatch] = useReducer(dialogReducer, {
    open: false,
    type: "product",
    mode: "add",
    initialData: undefined,
  });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    type: "product" | "testimonial";
    id?: number;
  }>({ open: false, type: "product", id: undefined });

  const {
    data: products,
    error: productsError,
    mutate: mutateProducts,
  } = useSWR(`${import.meta.env.VITE_API_BASE}/products`, fetcher);
  const {
    data: testimonials,
    error: testimonialsError,
    mutate: mutateTestimonials,
  } = useSWR(`${import.meta.env.VITE_API_BASE}/testimonials`, fetcher);

  if (productsError || testimonialsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Failed to load data
        </h2>
        <p className="text-gray-700">
          Please try refreshing the page or check your connection.
        </p>
      </div>
    );
  }

  const handleDialogSubmit = async (data: any) => {
    try {
      if (dialogState.type === "product") {
        if (dialogState.mode === "add") {
          await axios.post(`${import.meta.env.VITE_API_BASE}/products`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          toast("Product added", {
            description: "Product was added successfully.",
          });
          mutateProducts();
        } else {
          await axios.put(
            `${import.meta.env.VITE_API_BASE}/products/${
              dialogState.initialData.id
            }`,
            data,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          toast("Product updated", {
            description: "Product was updated successfully.",
          });
          mutateProducts();
        }
      } else {
        if (dialogState.mode === "add") {
          await axios.post(
            `${import.meta.env.VITE_API_BASE}/testimonials`,
            data,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          toast("Testimonial added", {
            description: "Testimonial was added successfully.",
          });
          mutateTestimonials();
        } else {
          await axios.put(
            `${import.meta.env.VITE_API_BASE}/testimonials/${
              dialogState.initialData.id
            }`,
            data,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          toast("Testimonial updated", {
            description: "Testimonial was updated successfully.",
          });
          mutateTestimonials();
        }
      }
      dispatch({ type: "CLOSE" });
    } catch (error: any) {
      toast.error("Error", {
        description: error?.message || "Something went wrong",
      });
    }
  };

  const handleDelete = async (type: "product" | "testimonial", id: number) => {
    try {
      const url =
        type === "product"
          ? `${import.meta.env.VITE_API_BASE}/products/${id}`
          : `${import.meta.env.VITE_API_BASE}/testimonials/${id}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast("Deleted successfully", {
        description: `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } was deleted.`,
      });
      if (type === "product") {
        mutateProducts();
      } else {
        mutateTestimonials();
      }
    } catch (error: any) {
      toast.error("Error", {
        description: error?.message || "Failed to delete",
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteDialog.id) return;
    handleDelete(deleteDialog.type, deleteDialog.id);
    setDeleteDialog((prev: any) => ({ ...prev, open: false, id: undefined }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="sticky top-0 w-full font-jakarta flex justify-between items-center px-4 md:px-12 h-[70px] bg-white border-b-2 border-gray-200 font-semibold z-50">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="w-6 h-6" />
          <span>Crispy Bites Admin</span>
        </a>
        <Button
          onClick={handleLogout}
          variant={"outline"}
          className="text-red-500 hover:bg-red-600 hover:text-white duration-300 ease-in"
        >
          Logout
        </Button>
      </nav>

      <section className="mx-auto w-full max-w-6xl min-h-svh px-2 py-8">
        <div className="space-y-10">
          <p className="text-4xl font-semibold">Dashboard</p>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold">Product Menu</p>
              <Button
                variant="default"
                onClick={() =>
                  dispatch({
                    type: "OPEN",
                    payload: { dialogType: "product", mode: "add" },
                  })
                }
              >
                + Add Product
              </Button>
            </div>
            <div className="mt-4">
              <Table>
                <TableCaption>A list of your products.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Image Path</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products?.map((product: Product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>
                        <div className="w-[260px] text-wrap break-words">
                          <p>{product.img}</p>
                        </div>
                      </TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>Rp. {product.price}</TableCell>
                      <TableCell>
                        <div className="space-x-2 flex justify-center">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              dispatch({
                                type: "OPEN",
                                payload: {
                                  dialogType: "product",
                                  mode: "edit",
                                  data: product,
                                },
                              })
                            }
                          >
                            <PenLine />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="hover:text-red-500"
                            onClick={() =>
                              setDeleteDialog({
                                open: true,
                                type: "product",
                                id: product.id,
                              })
                            }
                          >
                            <X />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold">Testimonials</p>
              <Button
                variant="default"
                onClick={() =>
                  dispatch({
                    type: "OPEN",
                    payload: { dialogType: "testimonial", mode: "add" },
                  })
                }
              >
                + Add Testimonial
              </Button>
            </div>
            <div className="mt-4">
              <Table>
                <TableCaption>A list of your testimonials.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Text</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials?.map((test: Testimonial, index: number) => (
                    <TableRow key={test.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{test.name}</TableCell>
                      <TableCell>{test.text}</TableCell>
                      <TableCell>{test.createdAt}</TableCell>
                      <TableCell>
                        <div className="space-x-2 flex justify-center">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              dispatch({
                                type: "OPEN",
                                payload: {
                                  dialogType: "testimonial",
                                  mode: "edit",
                                  data: test,
                                },
                              })
                            }
                          >
                            <PenLine />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="hover:text-red-500"
                            onClick={() =>
                              setDeleteDialog({
                                open: true,
                                type: "testimonial",
                                id: test.id,
                              })
                            }
                          >
                            <X />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>

      <CDialog
        open={dialogState.open}
        onOpenChange={(value) => {
          if (value) {
            dispatch({
              type: "OPEN",
              payload: {
                dialogType: dialogState.type,
                mode: dialogState.mode,
                data: dialogState.initialData,
              },
            });
          } else {
            dispatch({ type: "CLOSE" });
          }
        }}
        type={dialogState.type}
        mode={dialogState.mode}
        initialData={dialogState.initialData}
        onSubmit={handleDialogSubmit}
      />
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog((prev: any) => ({ ...prev, open }))
        }
        type={deleteDialog.type}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
