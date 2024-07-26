import Image from "next/image";
import React from "react";

type props = {
  coverImage: string;
};

const CoverImage = ({ coverImage }: props) => {
  return (
    <div className="mt-5">
      <Image
        className="h-[230px] w-full rounded-t-2xl object-cover object-center"
        src={coverImage}
        height={800}
        width={900}
        alt="Holla"
      />
    </div>
  );
};

export default CoverImage;
