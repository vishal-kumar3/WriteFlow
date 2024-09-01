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
import CurrentUserOnly from "@/util/CurrentUserOnly";
import DeleteFlowButton from "@/components/RichEditor/DeleteFlowButton";

export type UserCardProps = {
  userData: FlowUser;
  createdAt: Date;
  flowId: string;
}

export const UserCard = async({ userData, createdAt, flowId }: UserCardProps) => {

  if (!userData) return null;
  const session = await auth()

  return (
    <div className="flex items-center justify-between">
      <Link href={`/user/${userData.id}`} className="flex items-center gap-4">
        <div className="size-[50px] bg-red-300 rounded-full">
          <Image
            src={userData.image || defaultThumbnail}
            alt="Picture of the author"
            width={60}
            height={60}
            className="rounded-full w-full h-full object-cover object-center"
          />
        </div>
        <div className="text-sm leading-tight space-y-1">
          <p className="font-semibold text-base">{userData.name}</p>
          <p>@{userData.username} | {formatDateAgo(createdAt)}</p>
        </div>
      </Link>
      <Popover>
        <PopoverTrigger>
          <Tally3 className=" rotate-90" />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-1">
          {
            session?.user?.id !== userData.id && (
              <FollowButtonServerWraper id={userData.id} username={userData.username} />
            )
          }
          {/* @ts-expect-error Async Server Component */}
          <CurrentUserOnly userId={userData.id}>
            <DeleteFlowButton redirectMode={true} flowId={flowId} userId={userData.id} />
          </CurrentUserOnly>
          <CopyButton copyLink={`/blog/${flowId}`}>Copy Link</CopyButton>
          <ReportUserCard reportedUserId={userData.id} reportedBlogId={flowId} reportOptions={reportUserOptions} type="post" />
        </PopoverContent>
      </Popover>
    </div>
  );
};
