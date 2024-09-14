"use client"
import { UserWithFollowers } from "@/types/UserType";
import { SidebarButtonBottom, SidebarButtonsTop } from "./ToggleSidebar";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Followings from "./Followings";

type sidebarProps = {
  user: UserWithFollowers
}

const SideBar = ({user}: sidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen py-5 sm:px-5 flex flex-col justify-between border-r">
      <div className="flex flex-col text-sm gap-5">
        <Link href='/' className="mx-auto">
          <Image src='/writeflow.svg' alt="Write Flow" className="hidden md:flex w-[150px] h-[20px]" width={10} height={10} />
          <Image src='/logo.svg' alt="Write Flow" className="md:hidden flex w-[50px] h-[30px]" width={10} height={10} />
        </Link>

        {/* sb buttons yaha */}
        <SidebarButtonsTop user={user} />

        {/* followings show krega yaha */}
        {/* <div className="flex flex-col gap-2">
          <p className="ml-2">Followings</p>
          {
            user?.followers?.map(({followingId}, index) => (
              <Followings key={index} userId={followingId} />
            ))
          }
        </div> */}
      </div>

      <SidebarButtonBottom />
    </div>
  );
};

export default SideBar;
