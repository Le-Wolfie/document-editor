"use client";
import debounce from "lodash.debounce";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { useCallback } from "react";
import { updateDocumentAction } from "@/app/documents/_actions/document.actions";

export default function Editor({
  content,
  title,
}: {
  content: any;
  title: string;
}) {
  const saveContent = useCallback(
    debounce(async (content: any) => {
      // Make API call to save content
      await updateDocumentAction(JSON.stringify(content), title);
    }, 4000), // 4 seconds debounce
    []
  );
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
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
      const content = editor.getJSON();
      saveContent(content);
    },
  });

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
