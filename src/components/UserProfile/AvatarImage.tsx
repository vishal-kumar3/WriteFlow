import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import FileUploader from "@/lib/fileUploader";
import { updateUserAvatarImage } from "@/actions/image.action";
import HideForCurrentUser from "@/util/HideForCurrentUser";
import CurrentUserOnly from "@/util/CurrentUserOnly";
import { followToggle } from "@/actions/user.action";
import FollowButtonServerWraper from "./FollowButtonServerWraper";
import prisma from "@/prisma";
import { auth } from "@/auth";

type props = {
  avatarImage: string;
  userId: string;
  followingCnt: number;
  followerCnt: number;
  username: string;
};

const AvatarImage = async ({ avatarImage, userId, followingCnt, followerCnt, username }: props) => {
  // TODO: user.action.ts me daal do or without login page access ho jaye vaise kr do

  return (
    <div className="">
      <Image
        className="rounded-full size-[220px] object-cover absolute top-[20%] left-[3%]"
        src={avatarImage}
        width={220}
        height={220}
        alt="userImage"
      />
      {/* @ts-expect-error Async Server Component */}
      <CurrentUserOnly userId={userId}>
        <div className="absolute top-[90%] left-[7%]">
          <FileUploader
            ctx_name="AvatarImage"
            userId={userId!}
            uploadImageAction={updateUserAvatarImage}
            flowMode={false}
          />
        </div>
      </CurrentUserOnly>
      <div className="flex text-lg gap-8 items-center mt-2 ml-[calc(200px+6%)]">
        <p>{followerCnt} Followers</p>
        <p>{followingCnt} Followings</p>
        {/* @ts-expect-error Async Server Component */}
        <HideForCurrentUser userId={userId} >
          <FollowButtonServerWraper username={username} id={userId} />
        </HideForCurrentUser>
      </div>
    </div>
  );
};

export default AvatarImage;
