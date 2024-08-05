import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import FileUploader from "@/lib/fileUploader";
import { updateUserAvatarImage } from "@/actions/image.action";
import HideForCurrentUser from "@/util/HideForCurrentUser";
import CurrentUserOnly from "@/util/CurrentUserOnly";
import { followToggle } from "@/actions/user.action";
import FollowButton from "./FollowButton";
import prisma from "@/prisma";
import { auth } from "@/auth";

type props = {
  avatarImage: string;
  userId: string;
  followingCnt: number;
  followerCnt: number;
};

const AvatarImage = async ({ avatarImage, userId, followingCnt, followerCnt }: props) => {
  const session = await auth()

  // TODO: user.action.ts me daal do or without login page access ho jaye vaise kr do
  const isAlreadyFollowing = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: session?.user.id!,
        followingId: userId
      }
    }
  })

  return (
    <div className="">
      <Image
        className="rounded-full size-[180px] object-cover absolute top-[40%] left-[6%]"
        src={avatarImage}
        width={180}
        height={180}
        alt="userImage"
      />
      {/* @ts-expect-error Async Server Component */}
      <CurrentUserOnly userId={userId}>
        <div className="absolute top-[90%] left-[9%]">
          <FileUploader
            ctx_name="AvatarImage"
            userId={userId!}
            uploadImage={updateUserAvatarImage}
          />
        </div>
      </CurrentUserOnly>
      <div className="flex gap-4 items-center mt-2 ml-[calc(200px+6%)]">
        <p>{followerCnt} Followers</p>
        <p>{followingCnt} Followings</p>
        {/* @ts-expect-error Async Server Component */}
        <HideForCurrentUser userId={userId} >
          <FollowButton isAlreadyFollowing={isAlreadyFollowing} id={userId} />
        </HideForCurrentUser>
      </div>
    </div>
  );
};

export default AvatarImage;
