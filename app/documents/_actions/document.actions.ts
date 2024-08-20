"use server";
import { createClerkSupabaseClient } from "@/utils/supabase/client";
import { EditorFormValues } from "../_components/EditorForm";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const client = createClerkSupabaseClient();

export async function createDocumentAction(values: EditorFormValues) {
  const user = auth();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to create a document",
    };
  }

  // Insert the document into the "documents" table
  const { data: documents, error } = await client
    .from("documents")
    .insert({
      title: values.title,
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Start typing...",
              },
            ],
          },
        ],
      },
    })
    .select();
  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        error: "Document with this title already exists",
      };
    }

    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath("/documents");

  return {
    success: true,
  };
}

export async function updateDocumentAction(content: any, title: string) {
  const user = auth();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to create a document",
    };
  }

  // Update the document in the "documents" table
  const { data: documents, error } = await client
    .from("documents")
    .update({
      content: JSON.parse(content),
    })
    .eq("title", title);
  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
}
