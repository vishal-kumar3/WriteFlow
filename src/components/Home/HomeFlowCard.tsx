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

type props = {};

export const UserCard = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="size-[40px] bg-red-300 rounded-full"></div>
        <div className="text-sm leading-tight">
          <p>User Name</p>
          <p>Gmail Id | Date</p>
        </div>
      </div>
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
const HomeFlowCard = (props: props) => {
  return (
    <div className="border-2 rounded-lg m-10 p-4">
      <UserCard />
      <Card className="border-none">
        <div className="flex">
          <CardHeader className="p-0">
            <CardTitle className="font-bold line-clamp-2 text-lg px-2 pt-2">
              TITLE
            </CardTitle>
            <CardDescription className="px-2 line-clamp-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
              quia vel, ad recusandae quo molestiae tempora illum numquam
              possimus debitis.lorem20 Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Veritatis, obcaecati! lorem Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Est, id?
            </CardDescription>
          </CardHeader>
          {/* //TODO: Image */}
          <CardContent className="min-w-[250px] min-h-[150px] rounded-lg bg-blue-300"></CardContent>
        </div>
        <CardDescription className="px-2">
          ye vo sb Discussed and Liked this
        </CardDescription>
        <CardFooter className="flex px-2 justify-between items-center">
          <div>Discuss . 101 Likes . 219 reads</div>
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
