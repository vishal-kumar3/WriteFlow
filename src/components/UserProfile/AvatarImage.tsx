import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

type props = {
  avatarImage: string;
};

const AvatarImage = ({ avatarImage }: props) => {
  return (
    <div className=" ">
      <Image 
        className="rounded-full absolute top-[40%] left-[6%]"
        src={avatarImage} 
        width={180} 
        height={180} 
        alt="userImage" 
      />
      <div className="flex gap-2 items-center mt-2 ml-[calc(200px+6%)]">
        <p>1 Followers</p>
        <p>1 Followings</p>
        <Button className="px-5 bg-blue-400" >Follow</Button>
        <Button className="px-5" >Chat</Button>
      </div>
    </div>
  );
};

export default AvatarImage;
