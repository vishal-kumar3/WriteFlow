import Link from "next/link";
import LinkButton, { SideButton } from "./LinkButton";

import Followings from "./Followings";
import CreateFlowForm from "../form/CreateFlowForm";
import { DefaultAvatarImage } from "@/app/(main)/user/[userId]/page";
import { ChartNoAxesCombinedIcon, Handshake, LogOut, Newspaper, Settings, UserSearch } from "lucide-react";
import { UserWithFollowers } from "@/types/UserType";

type sidebarProps = {
  user: UserWithFollowers
}

const SideBar = ({user}: sidebarProps) => {

  return (
    <div className="h-screen py-5 px-5 md:flex flex-col justify-between border-r">
      <div className="md:flex flex-col text-sm gap-5">
        <Link href='/?search=' className="mx-auto">
          Write Flow
        </Link>

        {/* sb buttons yaha */}
        <div className="flex flex-col gap-1">
          <LinkButton
            imageUrl={user?.image || DefaultAvatarImage}
            link={`/user/${user?.id}`}
          >Profile</LinkButton>
          <LinkButton icon={<Newspaper />}>Feeds</LinkButton>
          <CreateFlowForm />
          <LinkButton icon={<Handshake />} link={`/user/${user?.id}/friends`}>Friends</LinkButton>
          <LinkButton icon={<UserSearch />} link="/user/search">Search User</LinkButton>
          <LinkButton link={`/user/${user?.id}/dashboard`} icon={<ChartNoAxesCombinedIcon />}>Dashboard</LinkButton>
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

      <div className="flex flex-col gap-1">
        <LinkButton icon={<Settings />}>Settings</LinkButton>
        <SideButton icon={<LogOut />} action={""}>Logout</SideButton>
      </div>
    </div>
  );
};

export default SideBar;
