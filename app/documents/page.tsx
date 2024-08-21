import React from "react";
import CreateDocumentForm from "./_components/CreateDocumentForm";
import { createClerkSupabaseClient } from "@/utils/supabase/client";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { FileText } from "lucide-react";
import moment from "moment";
import Image from "next/image";

function Logo() {
  return (
    <div className='flex justify-center items-center gap-2'>
      <Image
        src='/logo-icon.svg'
        alt='logo'
        width={48}
        height={48}
        className='w-12 h-12 lg:w-16 lg:h-16'
      />
      <h1 className='text-xl font-bold lg:text-2xl'>Document Editor</h1>
    </div>
  );
}

const page = async () => {
  const supabase = createClerkSupabaseClient();
  const { data } = await supabase.from("documents").select("title, created_at");

  if (!data) return null;

  return (
    <>
      <header className='flex justify-center items-center w-full h-20 lg:h-28'>
        <div className='flex justify-between items-center max-w-4xl lg:max-w-6xl w-full px-4 lg:px-0'>
          <Logo />
          <div className='flex gap-2'>
            <CreateDocumentForm />
            <UserButton />
          </div>
        </div>
      </header>
      <main className='flex flex-col justify-center items-center w-full h-full mt-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full h-full max-w-4xl lg:max-w-6xl gap-4 px-4 lg:px-0'>
          {data.map((doc: any) => (
            <div key={doc.id}>
              <Link
                href={`/documents/${doc.title}`}
                className='flex justify-center items-center border border-gray-200 rounded-lg p-4 w-full hover:bg-gray-100 transition-colors duration-300'
              >
                <div className='flex justify-between items-center w-full'>
                  <div className='flex flex-col gap-1'>
                    <h6 className='font-bold text-sm lg:text-base'>
                      {doc.title}
                    </h6>
                    <div className='flex gap-1'>
                      <FileText className='text-blue-500 w-4 h-4 lg:w-5 lg:h-5' />
                      <p className='text-gray-400 text-xs lg:text-sm'>
                        Created {moment(doc.created_at).fromNow()}
                      </p>
                    </div>
                  </div>
                  {/* <div className="rounded-full p-4 flex justify-center items-center hover:bg-gray-200 transition-colors duration-300">
                    <EllipsisVertical />
                  </div> */}
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
