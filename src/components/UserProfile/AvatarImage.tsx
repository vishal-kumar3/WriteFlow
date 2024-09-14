import Image from "next/image";
import FileUploader from "@/lib/fileUploader";
import { updateUserAvatarImage } from "@/actions/image.action";
import HideForCurrentUser from "@/util/HideForCurrentUser";
import CurrentUserOnly from "@/util/CurrentUserOnly";
import FollowButtonServerWraper from "./FollowButtonServerWraper";

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
    <div className="flex flex-col items-center">
      <div className="relative sm:static">
        <Image
          className="rounded-full size-[220px] object-cover absolute bottom-0 sm:top-[30%] sm:left-[8%]"
          src={avatarImage}
          width={220}
          height={220}
          alt="userImage"
        />
        {/* @ts-expect-error Async Server Component */}
        <CurrentUserOnly userId={userId}>
          <div className="sm:absolute sm:top-[90%] sm:left-[7%]">
            <FileUploader
              ctx_name="AvatarImage"
              userId={userId!}
              uploadImageAction={updateUserAvatarImage}
              flowMode={false}
            />
          </div>
        </CurrentUserOnly>
      </div>
      <div className="flex text-lg gap-8 items-center mt-2 lg:ml-[calc(220px+8%)]">
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
