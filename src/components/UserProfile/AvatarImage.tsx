import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import FileUploader from "@/lib/fileUploader";
import { updateUserAvatarImage } from "@/actions/imageActions";


type props = {
  avatarImage: string;
  id: string
};

const AvatarImage = ({ avatarImage, id }: props) => {
  return (
    <div className="">
      <Image
        className="rounded-full size-[180px] object-cover absolute top-[40%] left-[6%]"
        src={avatarImage}
        width={180}
        height={180}
        alt="userImage"
      />
      <div className="absolute top-[90%] left-[9%]">
        <FileUploader
          ctx_name="AvatarImage"
          id={id!}
          uploadImage={updateUserAvatarImage}
        />
      </div>
      <div className="flex gap-2 items-center mt-2 ml-[calc(200px+6%)]">
        <p>1 Followers</p>
        <p>1 Followings</p>
        <Button className="px-5 bg-blue-400">Follow</Button>
        <Button className="px-5">Chat</Button>
      </div>
    </div>
  );
};

export default AvatarImage;
