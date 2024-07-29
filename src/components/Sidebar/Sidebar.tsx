import React from "react";

import Link from "next/link";
import LinkButton from "./LinkButton";
import { auth } from "@/auth";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SideBar = async () => {
  const session = await auth();

  return (
    <div className="h-screen pt-5 px-2 md:flex flex-col justify-between border-r">
      <div className="md:flex flex-col justify-center text-sm gap-5">
        <Link href="/home" className="mx-auto">
          Write Flow
        </Link>

        {/* sb buttons yaha */}
        <div className="flex flex-col gap-1">
          <LinkButton
            imageUrl={session?.user?.image || ""}
            link={`/user/${session?.user?.id}`}
          >
            Profile
          </LinkButton>
          <LinkButton icon={"/home"}>Feeds</LinkButton>
          <Dialog>
            <DialogTrigger asChild>
              <LinkButton icon={""} link={`#`}>
                Write Flow
              </LinkButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Write Your Flow</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Flow</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <LinkButton icon={""} link={`/user/friends`}>
            Friends
          </LinkButton>
          <LinkButton icon={""}>Community</LinkButton>
          <LinkButton icon={""}>Messages</LinkButton>
        </div>

        {/* followings show krega yaha */}
        <div className="flex flex-col gap-2">
          <p className="ml-2">Followings</p>
          {
            // user?.following?.map((userId, index) => (
            //   <Followings key={index} userId={userId} />
            // ))
          }
        </div>
      </div>
      <div className="pb-5">
        <LinkButton link="/user/logout">Logout</LinkButton>
        <LinkButton link="/user/settings">Settings</LinkButton>
      </div>
    </div>
  );
};

export default SideBar;
