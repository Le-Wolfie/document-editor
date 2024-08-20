import Editor from "@/components/Editor";
import { createClerkSupabaseClient } from "@/utils/supabase/client";
import { UserButton } from "@clerk/nextjs";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

declare global {
  interface Window {
    Clerk: any;
  }
}

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const supabase = createClerkSupabaseClient();
  const { data } = await supabase
    .from("documents")
    .select("content,title")
    .eq("title", id)
    .single();
  if (!data) return null;

 

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
      <div className='my-2 flex flex-col w-full h-full items-center justify-center'>
        <h1 className='text-lg text-pretty'>{id}</h1>
        <Editor title={data.title} content={data.content} />
      </div>
      <div className='absolute top-6 right-8'>
        <UserButton />
      </div>
    </>
  );
};

export default page;
