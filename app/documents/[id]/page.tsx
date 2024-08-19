import React from "react";
import EditorForm from "../_components/EditorForm";
import Editor from "@/components/Editor";
import { ArrowLeft, SendToBackIcon } from "lucide-react";
import Link from "next/link";

const page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <div className='absolute top-6 left-8'>
        <Link
          href='/documents'
          className='flex items-center space-x-2 hover:underline cursor-pointer'
        >
          <ArrowLeft className='h-4 w-4' />
          <span>Back</span>
        </Link>
      </div>
      <div className='flex flex-col w-full h-full items-center justify-center'>
        <Editor document={id} />
      </div>
    </>
  );
};

export default page;
