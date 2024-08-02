import React from "react";

import Link from "next/link";
import LinkButton from "./LinkButton";
import { auth } from "@/auth";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import prisma from "@/prisma";
import Followings from "./Followings";

const SideBar = async () => {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      followers: {
        select: {
          followingId: true,
        }
      }
    }
  })

  return (
    <div className="h-screen pt-5 px-2 md:flex flex-col justify-between border-r">
      <div className="md:flex flex-col justify-center text-sm gap-5">
        <Link href="/" className="mx-auto">
          Write Flow
        </Link>

        {/* sb buttons yaha */}
        <div className="flex flex-col gap-1">
          <LinkButton
            imageUrl={user?.image || ""}
            link={`/user/${user?.id}`}
          >
            Profile
          </LinkButton>
          <LinkButton icon={"/home"}>Feeds</LinkButton>
          <Dialog>
            <DialogTrigger asChild>
              {/* //TODO: Baad me isko dekhna h */}
              {/* <LinkButton icon={""} link={`#`}> */}
                <Button>Holla</Button>
              {/* </LinkButton> */}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Write Your Flow</DialogTitle>
              </DialogHeader>
              <form action="">
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
              </form>
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
            user?.followers?.map(({followingId}, index) => (
              <Followings key={index} userId={followingId} />
            ))
          }
        </div>
      </div>
      <div className="pb-5">
        {/* //TODO: Logout ko button bana dena */}
        <LinkButton action={signOut} link="#">Logout</LinkButton>
        <LinkButton link="/user/settings">Settings</LinkButton>
      </div>
    </div>
  );
};

export default SideBar;
