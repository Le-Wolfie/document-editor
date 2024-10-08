"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createDocumentAction } from "../_actions/document.actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const createDocumentFormSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long"),
});

export type CreateDocumentFormValues = z.infer<typeof createDocumentFormSchema>;

const CreateDocumentForm = () => {
  const router = useRouter();
  const form = useForm<CreateDocumentFormValues>({
    resolver: zodResolver(createDocumentFormSchema),
    defaultValues: { title: "" },
  });

  const handleSubmit = async (values: CreateDocumentFormValues) => {
    const response = await createDocumentAction(values);
    if (!response.success) {
      toast.error(response.error);
      return;
    }

    toast.success("Document created successfully");

    router.push(`/documents/${values.title}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-4 flex flex-col sm:flex-row gap-4 justify-center items-center w-full'
      >
        <div className='flex flex-col sm:flex-row justify-center items-center w-full gap-2'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='flex flex-col sm:flex-row justify-center items-center gap-2 space-y-0'>
                <FormLabel className='my-2 sm:my-0'>Document Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Enter document title...'
                    className='w-full sm:w-auto'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            disabled={form.formState.isSubmitting}
            className='w-full sm:w-auto'
          >
            {form.formState.isSubmitting ? (
              <Loader2 className='animate-spin' />
            ) : (
              "Create Document"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateDocumentForm;
