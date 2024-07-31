import { auth } from "@/auth";
import AboutSection from "@/components/UserProfile/AboutSection";
import AvatarImage from "@/components/UserProfile/AvatarImage";
import CoverImage from "@/components/UserProfile/CoverImage";
import Bookmarks from "@/components/UserProfile/Tabs/Bookmarks";
import DraftFlows from "@/components/UserProfile/Tabs/DraftFlows";
import History from "@/components/UserProfile/Tabs/History";
import LikedFlows from "@/components/UserProfile/Tabs/LikedFlows";
import UserFlows from "@/components/UserProfile/Tabs/UserFlows";
import TabSwitcher from "@/components/UserProfile/TabSwitcher";
import prisma from "@/prisma";
import React from "react";

type props = {};

const page = async (props: props) => {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  })

  const coverImage =
    "https://images.unsplash.com/photo-1650513737281-882e597ee5e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="bg-[#f5f5f5] mx-auto w-[90%] rounded-t-2xl">
      <div className="relative">
        <CoverImage id={user?.id!} coverImage={user?.coverImage || coverImage} />
        <AvatarImage id={user?.id!} avatarImage={user?.image!} />
      </div>
      <div className="mt-8 mx-[6%] max-w-[90%] flex flex-col justify-between">
        <AboutSection />
        {/* <SkillSection /> */}
        <div className=" mt-10">
          <TabSwitcher
            UserFlows={<UserFlows />}
            History={<History />}
            LikedFlows={<LikedFlows />}
            Bookmarks={<Bookmarks />}
            DraftFlows={<DraftFlows />}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
