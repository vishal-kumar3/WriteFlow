import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { defaultThumbnail } from "@/components/UserProfile/Tabs/UserFlows";
import { FlowUser } from "@/types/UserType";
import { formatDateAgo } from "@/util/DateTime";
import Image from "next/image";
import Link from "next/link";
import { reportUserOptions } from "../reportOptions";
import { Tally3 } from "lucide-react";
import { ReportUserCard } from "./ReportUserCard";
import FollowButtonServerWraper from "@/components/UserProfile/FollowButtonServerWraper";
import CopyButton from "@/util/CopyButton";
import { auth } from "@/auth";
import DeleteFlowButton from "@/components/RichEditor/DeleteFlowButton";

export type UserCardProps = {
  userData: FlowUser;
  createdAt: Date;
  flowId: string;
}

export const UserCard = async ({ userData, createdAt, flowId }: UserCardProps) => {
  if (!userData) return null;
  const session = await auth()

  return (
    <div className="flex flex-wrap items-center justify-between p-2 py-0">
      <Link href={`/user/${userData.id}`} className="flex items-center gap-2 sm:gap-4">
        <div className="size-[40px] sm:size-[50px] rounded-full">
          <Image
            src={userData.image || defaultThumbnail}
            alt={`${userData.name}'s profile picture`}
            width={60}
            height={60}
            className="rounded-full w-full h-full object-cover object-center"
          />
        </div>
        <div className="text-xs sm:text-sm space-y-0 sm:space-y-1">
          <p className="font-semibold text-sm sm:text-base">{userData.name}</p>
          <p>{formatDateAgo(createdAt)}</p>
        </div>
      </Link>
      <Popover>
        <PopoverTrigger>
          <div className="p-2">
            <Tally3 className="rotate-90" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
          {
            session && (
              <>
                {session?.user?.id !== userData.id ? (
                  <FollowButtonServerWraper id={userData.id} username={userData.username!} />
                ) : (
                  <DeleteFlowButton modeClass="w-full" redirectMode={true} flowId={flowId} userId={userData.id} />
                )}
                <ReportUserCard reportedUserId={userData.id} reportedBlogId={flowId} reportOptions={reportUserOptions} type="post" />
              </>
            )
          }
          <CopyButton copyLink={`/blog/${flowId}`}>Copy Link</CopyButton>
        </PopoverContent>
      </Popover>
    </div>
  );
};
