"use client";

import { Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import {
  BoldIcon,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
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
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Toggle size={"sm"}>
            <Heading className='h-4 w-4' />
          </Toggle>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Toggle
              size={"sm"}
              pressed={editor.isActive("heading")}
              onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <h1 className='text-[1.4rem]'>Heading 1</h1>
            </Toggle>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Toggle
              size={"sm"}
              pressed={editor.isActive("heading")}
              onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <h2 className='text-[1.2rem]'>Heading 2</h2>
            </Toggle>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Toggle
              size={"sm"}
              pressed={editor.isActive("heading")}
              onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <h3 className='text-[1.1rem]'>Heading 3</h3>
            </Toggle>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
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
    </div>
  );
};

export default Toolbar;
