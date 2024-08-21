"use client";
import debounce from "lodash.debounce";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { useCallback, useEffect, useState } from "react";
import { updateDocumentAction } from "@/app/documents/_actions/document.actions";
import Underline from "@tiptap/extension-underline";
import History from "@tiptap/extension-history";
import { Check, Loader2 } from "lucide-react";

type saveStatus = "saved" | "unsaved" | "saving";

export default function Editor({
  content,
  title,
}: {
  content: any;
  title: string;
}) {
  const [saveStatus, setSaveStatus] = useState<saveStatus>("saved");

  const saveContent = useCallback(
    debounce(async (content: any) => {
      // Make API call to save content
      setSaveStatus("saving");
      await updateDocumentAction(JSON.stringify(content), title);
      setSaveStatus("saved");
    }, 1000), // 4 seconds debounce
    []
  );
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Underline,
      History,
    ],
    immediatelyRender: false,
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg focus:outline-none p-4 border border-gray-300 rounded shadow-sm min-h-[1000px] min-w-[1000px] [&_ol]:list-decimal [&_ul]:list-disc",
      },
    },
    onUpdate({ editor }) {
      setSaveStatus("unsaved");
      const content = editor.getJSON();
      saveContent(content);
    },
  });

  return (
    <>
      <p className="text-center text-gray-400 flex justify-center items-center gap-1">
        {
          saveStatus === "saving" && (
            <Loader2 className="w-6 h-6 animate-spin" />
          )
        }
        {
          saveStatus === "saved" && (
            <Check className="w-6 h-6 text-green-500" />
          )
        }
        {
          saveStatus === "saved"
            ? "Saved"
            : saveStatus === "unsaved"
              ? "Unsaved Changes" : "Saving..."
        }

      </p>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
