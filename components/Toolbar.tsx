"use client";

import { Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import {
  BoldIcon,
  Code2,
  Eraser,
  FlipVertical2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  ItalicIcon,
  ListIcon,
  ListOrdered,
  MessageSquareCode,
  Redo2,
  Space,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2,
} from "lucide-react";

import { Button } from "./ui/button";
type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className='flex gap-2 mt-4 border border-input bg-transparent rounded-br-none'>
      <Button
        size={"sm"}
        variant={"ghost"}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 className='h-4 w-4' />
      </Button>
      <Button
        size={"sm"}
        variant={"ghost"}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 className='h-4 w-4' />
      </Button>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className='h-4 w-4' />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className='h-4 w-4' />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("heading", { level: 3 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 className='h-4 w-4' />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("heading", { level: 4 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 4 }).run()
        }
      >
        <Heading4 className='h-4 w-4' />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon className='h-4 w-4' />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon className='h-4 w-4' />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <StrikethroughIcon className='h-4 w-4' />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <MessageSquareCode className='h-4 w-4' />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon className='h-4 w-4' />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className='h-4 w-4' />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code2 className='h-4 w-4' />
      </Toggle>
      <Button
        size={"sm"}
        variant={"ghost"}
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <Space className='h-4 w-4' />
      </Button>
      <Button
        size={"sm"}
        variant={"ghost"}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <FlipVertical2 className='h-4 w-4' />
      </Button>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className='h-4 w-4' />
      </Toggle>
      <Button
        size={"sm"}
        variant={"ghost"}
        onClick={() => editor.chain().focus().clearContent().run()}
      >
        <Eraser className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default Toolbar;
