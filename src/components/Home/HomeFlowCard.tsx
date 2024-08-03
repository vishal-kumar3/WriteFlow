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
import { Bookmark, BookmarkCheck, Dot, Tally3 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "../ui/checkbox";
import { reportUserOptions } from "./reportOptions";
import { CheckboxDemo } from "./CheckBox";
import { FlowData, FlowUser } from "./HomeFlows";
import { formatDate } from "@/util/DateTime";
import Image from "next/image";
import { defaultThumbnail } from "../UserProfile/Tabs/UserFlows";
import Link from "next/link";


export const UserCard = ({userData, createdAt}: {userData: FlowUser, createdAt: Date}) => {
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
          <p>isko change krna hoga {userData.email} | {formatDate(createdAt)}</p>
        </div>
      </Link>
      <Popover>
        <PopoverTrigger>
          <Tally3 className=" rotate-90" />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-1">
          <ReportUserCard />
          <Button variant="ghost">Report Post</Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const ReportUserCard = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost">Report User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mx-auto">Report User</DialogTitle>
          <DialogDescription className="text-center">
            Help us keep our community safe and respectful. Please select the
            reason for reporting this user:
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 justify-center">
          {reportUserOptions.map((options, key) => (
            <CheckboxDemo
              key={key}
              id={options.label}
              label={options.description}
            />
          ))}
          <Input type="text" className="outline-none" placeholder="Please specify other issue"></Input>
      <Button variant="destructive">Submit Report</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};




// TODO: Add top comment
const HomeFlowCard = ({flow}: FlowData) => {
  return (
    <div className="border-2 rounded-lg m-10 p-4">
      <UserCard userData={flow.user} createdAt={flow.createdAt} />
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
      layout="fill"
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
          <div className="flex">
            <Badge>Holla</Badge>
            <Badge>Holla</Badge>
            <Badge>Holla</Badge>
            <Bookmark />
            <BookmarkCheck />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HomeFlowCard;
