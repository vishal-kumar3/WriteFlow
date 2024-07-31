import { updateUserCoverImage } from "@/actions/imageActions";
import { auth } from "@/auth";
import FileUploader from "@/lib/fileUploader";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";

type props = {
  coverImage: string;
  id: string
};

const CoverImage = async ({ coverImage, id }: props) => {

  const session = await auth()

  return (
    <div className="mt-5 group relative">
      <Image
        className="h-[230px] w-full rounded-t-2xl object-cover object-center"
        src={coverImage}
        height={800}
        width={900}
        alt="Holla"
      />
      <div className="absolute right-5 bottom-5">
        <FileUploader ctx_name="CoverImage" id={id!} uploadImage={updateUserCoverImage} />
      </div>
    </div>
  );
};

export default CoverImage;
