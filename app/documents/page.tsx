import React from "react";
import CreateDocumentForm from "./_components/CreateDocumentForm";
import { createClerkSupabaseClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {};

const page = async (props: Props) => {
  const supabase = createClerkSupabaseClient();
  const { data } = await supabase.from("documents").select("title");

  if (!data) return null;

  return (
    <>
      <div className='flex justify-center flex-col items-center'>
        <CreateDocumentForm />

        <div className='flex justify-center flex-col w-1/2 items-center gap-4 border-2 my-4'>
          <h1 className='text-pretty text-2xl'>Your Documents</h1>
          {data.map((doc: any) => (
            <div key={doc.id}>
              <Button variant={"link"} className='text-lg text-inherit'>
                <Link href={`/documents/${doc.title}`} className='text-balance'>
                  {doc.title}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
