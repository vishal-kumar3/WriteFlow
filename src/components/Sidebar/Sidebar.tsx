import Link from "next/link";
import LinkButton from "./LinkButton";
import { auth } from "@/auth";

import { signOut } from "next-auth/react";
import prisma from "@/prisma";
import Followings from "./Followings";
import CreateFlowForm from "../form/CreateFlowForm";

const SideBar = async () => {
  const session = await auth();
  if(!session) return null;

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
        <Link href='/?search=' className="mx-auto">
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

          <CreateFlowForm />

          <LinkButton icon={""} link={`/user/${session?.user.id}/friends`}>
            Friends
          </LinkButton>
          <LinkButton icon={""} link="/user/search">Search User</LinkButton>
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
