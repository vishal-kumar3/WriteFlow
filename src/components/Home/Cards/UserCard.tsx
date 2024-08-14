import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { defaultThumbnail } from "@/components/UserProfile/Tabs/UserFlows";
import { FlowUser } from "@/types/UserType";
import { formatDateAgo } from "@/util/DateTime";
import Image from "next/image";
import Link from "next/link";
import { reportUserOptions } from "../reportOptions";
import { Tally3 } from "lucide-react";
import { ReportUserCard } from "./ReportUserCard";

export type UserCardProps = {
  userData: FlowUser;
  createdAt: Date;
  flowId: string;
}

export const UserCard = ({ userData, createdAt, flowId }: UserCardProps) => {

  if (!userData) return null;

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
          <ReportUserCard reportedUserId={userData.id} reportedBlogId={flowId} reportOptions={reportUserOptions} type="post" />
        </PopoverContent>
      </Popover>
    </div>
  );
};
