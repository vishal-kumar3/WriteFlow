import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Tally3 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { reportUserOptions } from "./reportOptions";
import { CheckboxDemo } from "./CheckBox";
import { formatDateAgo } from "@/util/DateTime";
import Image from "next/image";
import { defaultThumbnail } from "../UserProfile/Tabs/UserFlows";
import Link from "next/link";
import ToggleBookmark from "./ToggleBookmark";
import { reportFlow } from "@/actions/report.action";
import { BlogWithUserAndTagsHome } from "@/types/BlogType";
import { FlowUser } from "@/types/UserType";


export type UserCardProps = {
  userData: FlowUser;
  createdAt: Date;
  flowId: string;
}

export const UserCard = ({ userData, createdAt, flowId }: UserCardProps) => {

  if(!userData) return null;

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

// TODO: Need to remove the post from that user only who reported it
export const ReportUserCard = ({ reportOptions, type, reportedUserId, reportedBlogId }: { reportOptions: { label: string; description: string }[], type: "user" | "post", reportedUserId: string, reportedBlogId: string }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost">Report {type}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mx-auto">Report {type}</DialogTitle>
          <DialogDescription className="text-center">
            Help us keep our community safe and respectful. Please select the
            reason for reporting this {type}:
          </DialogDescription>
        </DialogHeader>
        <form action={async (formData: FormData) => {
          "use server"
          let title = '';
          formData.forEach((value, key) => {
            value === "on" ? title += key + " " : "";
          })

          const report = {
            reportedUserId: formData.get("reportedUserId") as string,
            reportedBlogId: formData.get("reportedBlogId") as string,
            title: title,
            issue: formData.get("issue") as string
          }

          const { error, success } = await reportFlow(report);
          console.log(error, success);
        }} className="flex flex-col gap-2 justify-center">
          {reportOptions.map((options, key) => (
            <CheckboxDemo
              key={key}
              id={options.label}
              label={options.description}
            />
          ))}
          <input type="text" className="hidden" value={reportedUserId} name="reportedUserId" />
          <input type="text" className="hidden" value={reportedBlogId} name="reportedBlogId" />
          <Input name="issue" type="text" className="outline-none" placeholder="Please specify other issue"></Input>
          <DialogClose>
            <Button variant="destructive">Submit Report</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};


type HomeFlowCardProps = {
  flow: BlogWithUserAndTagsHome;
  userBookmark: { id: string }[];
}

// TODO: Add top comment
const HomeFlowCard = ({ flow, userBookmark }: HomeFlowCardProps) => {

  if(!flow) return null;

  let isBookmarked = false;
  userBookmark.map((bookmark) => {
    if (bookmark.id === flow.id) isBookmarked = true;
  })

  return (
    <div className="border-2 rounded-lg m-10 p-4">
      <UserCard userData={flow.user} createdAt={flow.createdAt} flowId={flow.id} />
      <Card className="border-none">
        <div className="flex w-full">
          <CardHeader className="p-0">
            <Link href={`/blog/${flow.id}`}>
              <CardTitle className="font-bold line-clamp-2 text-lg px-2 pt-2">
                {flow.title}
              </CardTitle>
              <CardDescription className="px-2 w-full line-clamp-4">
                {flow.description}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, maiores itaque autem pariatur facilis tenetur, eius tempore ea dicta sapiente repudiandae dignissimos id et, cumque ab asperiores vel. Atque, reiciendis.
              </CardDescription>
            </Link>
          </CardHeader>
          {/* //TODO: Image */}
          <CardContent className="min-w-[250px] min-h-[150px] rounded-lg bg-blue-300 p-0 overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={flow.thumbnail || defaultThumbnail}
                alt="Picture of the author"
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </div>
        <CardDescription className="px-2">
          ye vo sb Discussed and Liked this
        </CardDescription>
        <CardFooter className="flex px-2 justify-between items-center">
          <div>Discuss . {flow.likeCount} Likes . {flow.noOfViews} reads</div>
          <div className="flex items-center">
            {
              flow.tags.map((tag: { tag: string }, key: number) => (
                <form key={key} method="GET" action="/">
                  <input type="hidden" name="search" value={tag.tag} />
                  <button type="submit">
                    <Badge variant="default" className="mr-2">{tag.tag}</Badge>
                  </button>
                </form>
              ))
            }
            <ToggleBookmark flowId={flow.id} isBookmarked={isBookmarked} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HomeFlowCard;
