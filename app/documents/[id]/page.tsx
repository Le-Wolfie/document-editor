import React from "react";
import EditorForm from "../_components/EditorForm";

const page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div className='flex flex-col w-full h-full items-center justify-center'>
      <EditorForm document={id} />
    </div>
  );
};

export default page;
