import React from "react";
import CreateDocumentForm from "./_components/CreateDocumentForm";
import { createClerkSupabaseClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { EllipsisVertical, FileText } from "lucide-react";
import moment from "moment";

function Logo() {
  return (
    <Link href="/">
      Le Wolfie's TipTap Editor
    </Link>
  );
}

type Props = {};

const page = async (props: Props) => {
  const supabase = createClerkSupabaseClient();
  const { data } = await supabase.from("documents").select("title, created_at");

  if (!data) return null;

  // const createdAtMoment = 

  return (
    <>
      <header className="flex justify-center items-center w-full h-28">
        <div className="flex justify-between items-center max-w-6xl w-full">
          <Logo />
          <CreateDocumentForm />
          <UserButton />
        </div>
      </header>
      <main className="flex flex-col justify-center items-center w-full h-full">
        <div className="grid grid-cols-4 w-full h-full max-w-6xl gap-4">
          {data.map((doc: any) => (
            <div key={doc.id}>
              <Link href={`/documents/${doc.title}`} className='flex justify-center items-center border border-gray-200 rounded-lg p-4 w-full hover:bg-gray-100 transition-colors duration-300'>
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-1">
                    <h6 className="font-bold">
                      {doc.title}
                    </h6>
                    <div className="flex gap-1">
                      <FileText
                        className="text-blue-500"
                      />
                      <p className="text-gray-400">
                        {moment(doc.created_at).fromNow()}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-full p-4 flex justify-center items-center hover:bg-gray-200 transition-colors duration-300">
                    <EllipsisVertical />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );

};

export default page;
