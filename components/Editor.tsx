"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import * as Y from "yjs";
import Collaboration from "@tiptap/extension-collaboration";
import { useEffect } from "react";
import { TiptapCollabProvider } from "@hocuspocus/provider";

const APP_ID = process.env.NEXT_PUBLIC_TIPTAP_APP_ID as string;
const TOKEN = process.env.NEXT_PUBLIC_JWT_TOKEN as string;

export default function Editor({ document }: { document: string }) {
  const doc = new Y.Doc(); // Initialize Y.Doc for shared editing
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false, // Disable history for collaboration
      }),
      Collaboration.configure({
        document: doc, // Configure Y.Doc for collaboration
      }),
    ],
    immediatelyRender: false,
    content: "Enter text...",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg focus:outline-none p-4 border border-gray-300 rounded shadow-sm min-h-[1000px] min-w-[1000px] [&_ol]:list-decimal [&_ul]:list-disc",
      },
    },
    onUpdate({ editor }) {
      console.log(editor.getJSON());
    },
  });

  // Connect to your Collaboration server
  useEffect(() => {
    const provider = new TiptapCollabProvider({
      name: document, // Unique document identifier for syncing. This is your document name.
      appId: APP_ID, // Your Cloud Dashboard AppID or `baseURL` for on-premises
      token: TOKEN, // Your JWT token
      document: doc,
      // The onSynced callback ensures initial content is set only once using editor.setContent(), preventing repetitive content loading on editor syncs.
      onSynced() {
        if (!doc.getMap("config").get("initialContentLoaded") && editor) {
          doc.getMap("config").set("initialContentLoaded", true);
        }
      },
    });
  }, []);
  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
