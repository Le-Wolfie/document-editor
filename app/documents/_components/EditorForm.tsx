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

const editorFormSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long"),
});

export type EditorFormValues = z.infer<typeof editorFormSchema>;

type Props = {};

const EditorForm = (props: Props) => {
  const router = useRouter();
  const form = useForm<EditorFormValues>({
    resolver: zodResolver(editorFormSchema),
    defaultValues: { title: "" },
  });

  const handleSubmit = async (values: EditorFormValues) => {
    router.push(`/documents/${values.title}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <div className='flex justify-center w-full gap-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter document title...' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-center'>
          <Button type='submit'>Go to Document</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditorForm;

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
