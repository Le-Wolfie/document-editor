"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useRouter } from "next/navigation";
import { deleteDocumentAction } from "../_actions/document.actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const deleteDocumentSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long"),
});

export type DeleteDocumentFormValues = z.infer<typeof deleteDocumentSchema>;

const DeleteDocumentForm = (title: { title: string }) => {
  const router = useRouter();
  const form = useForm<DeleteDocumentFormValues>({
    resolver: zodResolver(deleteDocumentSchema),
    defaultValues: title,
  });

  const handleSubmit = async (values: DeleteDocumentFormValues) => {
    const response = await deleteDocumentAction(values);
    if (!response.success) {
      toast.error(response.error);
      return;
    }

    toast.success("Document deleted successfully");

    router.push(`/documents`);
  };
  const onInvalid = (errors: any) => console.error(errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit, onInvalid)}
        className='space-y-4'
      >
        <Button
          type='submit'
          variant={"destructive"}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className='animate-spin' />
          ) : (
            "Delete Document"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default DeleteDocumentForm;
