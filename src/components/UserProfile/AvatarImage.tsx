import Image from "next/image";
import FileUploader from "@/lib/fileUploader";
import { updateUserAvatarImage } from "@/actions/image.action";
import HideForCurrentUser from "@/util/HideForCurrentUser";
import CurrentUserOnly from "@/util/CurrentUserOnly";
import FollowButtonServerWraper from "./FollowButtonServerWraper";
import CustomUploader from "@/lib/CustomUploader";

type Props = {
  avatarImage: string;
  userId: string;
  followingCnt: number;
  followerCnt: number;
  username: string;
  sessionId?: string;
};

const AvatarImage = async ({ avatarImage, userId, followingCnt, followerCnt, username, sessionId }: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-end px-4 md:px-8 -mt-16 md:-mt-20 relative z-10 pointer-events-none">
      <div className="relative pointer-events-auto">
        <Image
          className="rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover border-4 border-white dark:border-gray-800"
          src={avatarImage}
          width={220}
          height={220}
          alt={`${username}'s avatar`}
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
      <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center md:items-end gap-4 pointer-events-auto">
        <div className="text-center md:text-right space-y-1 md:space-y-0 md:space-x-4">
          <p className="text-sm md:text-base lg:text-lg font-semibold">{followerCnt} Followers</p>
          <p className="text-sm md:text-base lg:text-lg font-semibold">{followingCnt} Following</p>
        </div>
        {
          sessionId && (
            <>
              {/* @ts-expect-error Async Server Component */}
              <HideForCurrentUser userId={userId}>
                <FollowButtonServerWraper username={username} id={userId} />
              </HideForCurrentUser>
            </>
          )
        }
      </div>
    </div>
  );
};

export default AvatarImage;
