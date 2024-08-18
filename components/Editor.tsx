"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Toolbar from "./Toolbar";

export default function Editor({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: content,
    editorProps: {
      attributes: {
        // prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc
        class:
          "prose prose-lg focus:outline-none p-4 border border-gray-300 rounded shadow-sm min-h-[500px] min-w-[500px]",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getJSON());
    },
  });

  return (
    <div className='flex flex-col justify-stretch min-h-[250px]'>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
