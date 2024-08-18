"use client";

import { Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import {
  BoldIcon,
  Heading,
  Heading2,
  ItalicIcon,
  StrikethroughIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className='border border-input bg-transparent rounded-br-none'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Toggle size={"sm"}>
            <Heading className='h-4 w-4' />
          </Toggle>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <h1 className='text-2xl'>Heading 1</h1>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <h2 className='text-xl'>Heading 2</h2>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <h3 className='text-lg'>Heading 3</h3>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
    </div>
  );
};

export default Toolbar;
