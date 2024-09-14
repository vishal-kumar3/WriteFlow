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
    <div className=" flex flex-col items-center sm:items-start sm:flex-row sm:justify-between px-4 sm:px-8 -mt-16 sm:-mt-20 relative z-10">
      <div className="relative">
        <Image
          className="rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover border-4 border-white dark:border-gray-800"
          src={avatarImage}
          width={220}
          height={220}
          alt="userImage"
        />
        {/* @ts-expect-error Async Server Component */}
        <CurrentUserOnly userId={userId}>
          <div className="absolute bottom-0 right-0">
            <FileUploader
              ctx_name="AvatarImage"
              userId={userId!}
              uploadImageAction={updateUserAvatarImage}
              flowMode={false}
            />
          </div>
        </CurrentUserOnly>
      </div>
      <div className="mt-4 sm:self-center flex flex-col sm:flex-row items-center sm:items-end gap-4">
        <div className="text-center sm:flex sm:gap-2 sm:text-right">
          <p className="text-lg font-semibold">{followerCnt} Followers</p>
          <p className="text-lg font-semibold">{followingCnt} Following</p>
        </div>
        {/* @ts-expect-error Async Server Component */}
        <HideForCurrentUser userId={userId} >
          <FollowButtonServerWraper username={username} id={userId} />
        </HideForCurrentUser>
      </div>
    </div>
  );
};

export default AvatarImage;
