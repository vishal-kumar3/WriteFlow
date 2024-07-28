import React from "react";

import Link from "next/link";
import LinkButton from "./LinkButton";
import { auth } from "@/auth";

const SideBar = async() => {

  const session = await auth()

  return (
    <div className="h-screen pt-5 px-2 md:flex flex-col justify-between border-r">
      <div className="md:flex flex-col justify-center text-sm gap-5">
        <Link href="/home" className="mx-auto">
          Write Flow
        </Link>

        {/* sb buttons yaha */}
        <div className="flex flex-col gap-1">
          <LinkButton imageUrl={session?.user?.image || ""} link={`/user/${session?.user?.id}`}>
            Profile
          </LinkButton>
          <LinkButton icon={"/home"}>Feeds</LinkButton>
          <LinkButton icon={""} link={`/blog/create`}>
            Write Flow
          </LinkButton>
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
