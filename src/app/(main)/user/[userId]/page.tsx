import { updateUserCoverImage } from "@/actions/image.action";
import { auth } from "@/auth";
import AboutSection, {
  AboutDetails,
} from "@/components/UserProfile/AboutSection";
import AvatarImage from "@/components/UserProfile/AvatarImage";
import CoverImage from "@/components/UserProfile/CoverImage";
import Bookmarks from "@/components/UserProfile/Tabs/Bookmarks";
import DraftFlows from "@/components/UserProfile/Tabs/DraftFlows";
import History from "@/components/UserProfile/Tabs/History";
import LikedFlows from "@/components/UserProfile/Tabs/LikedFlows";
import UserFlows, { UserFlowsCardProps, UserFlowsProps } from "@/components/UserProfile/Tabs/UserFlows";
import TabSwitcher from "@/components/UserProfile/TabSwitcher";
import prisma from "@/prisma";
import React from "react";

type props = {
  params: { userId: string };
};

export const DefaultCoverImage =
  "https://images.unsplash.com/photo-1650513737281-882e597ee5e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const DefaultAvatarImage =
  "https://images.unsplash.com/photo-1707912079134-becf5a3598e2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const page = async ({ params }: props) => {
  const { userId } = params;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      about: true,
      blogs: true,
    },
  });

  let UserFlowData: UserFlowsCardProps[] = [];
  let DraftFlowData: UserFlowsCardProps[] = []

  user?.blogs.map((blog) => {
    if (blog.isPublished) {
      UserFlowData.push(blog)
    } else {
      DraftFlowData.push(blog)
    }
  })

  const AboutSectionDetails: AboutDetails[] = [
    {
      label: "Name",
      id: "name",
      placeholder: "Enter Your Name",
      defaultValue: user?.name!,
    },
    {
      label: "Carrer",
      id: "career",
      placeholder: "Enter Your Career Role Or Job Profile",
      defaultValue: user?.about?.career || "Career",
    },
    {
      label: "Bio",
      id: "bio",
      placeholder: "Describe Yourself",
      defaultValue: user?.about?.bio || "Bio",
    },
    {
      label: "Location",
      id: "location",
      placeholder: "Enter Your Location",
      defaultValue: user?.about?.location || "Location",
    },
    {
      label: "Website",
      id: "website",
      placeholder: "Provide Link To Your Website If Available",
      defaultValue: user?.about?.website || "www.website.com",
    },
  ];



  return (
    <div className="bg-[#f5f5f5] dark:bg-blue-400/50 mx-auto w-[90%] rounded-t-2xl">
      <div className="relative">
        <CoverImage
          userId={user?.id!}
          coverImage={user?.coverImage || DefaultCoverImage}
          uploadImageAction={updateUserCoverImage}
          flowMode={false}
        />
        <AvatarImage
          followerCnt={user?.followerCount!}
          followingCnt={user?.followingCount!}
          userId={user?.id!}
          avatarImage={user?.image || DefaultAvatarImage}
        />
      </div>
      <div className="mt-8 mx-[6%] max-w-[90%] flex flex-col justify-between">
        <AboutSection
          about={AboutSectionDetails}
          userId={user?.id!}
          name={user?.name!}
          bio={user?.about?.bio!}
          location={user?.about?.location!}
          website={user?.about?.website!}
          career={user?.about?.career!}
          tags={["Vishal", "Tag", "Rag"]}
        />
        <div className=" mt-10">
          <TabSwitcher
            id={user?.id! || userId}
            UserFlows={<UserFlows data={UserFlowData} />}
            History={<History />}
            LikedFlows={<LikedFlows />}
            Bookmarks={<Bookmarks />}
            DraftFlows={<DraftFlows data={DraftFlowData} />}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
