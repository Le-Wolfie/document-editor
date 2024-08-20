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
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <div className='flex flex-col justify-center items-center w-full gap-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex justify-center my-2'>
                  Document Title
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter document title...' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-center'>
          <Button type='submit' disabled={form.formState.isSubmitting}>
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

/**
 * <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor
                  content={field.value}
                  onChange={field.onChange}
                  document={document}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
 */
