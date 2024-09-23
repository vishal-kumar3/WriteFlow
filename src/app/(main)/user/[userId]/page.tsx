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
import UserFlows, {
  UserFlowsCardProps,
} from "@/components/UserProfile/Tabs/UserFlows";
import TabSwitcher from "@/components/UserProfile/TabSwitcher";
import prisma from "@/prisma";
import { UserWithFlowsAndTagsAndAbout } from "@/types/UserType";
import React from "react";

type props = {
  params: { userId: string };
};

export const DefaultCoverImage =
  "/coverimage.jpg";

export const DefaultAvatarImage =
  "/avatarimage.jpg";

const page = async ({ params }: props) => {
  const { userId } = params;
  const session = await auth();

  const user: UserWithFlowsAndTagsAndAbout = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      about: true,
      blogs: {
        include: {
          tags: true,
        },
      },
    },
  });

  let UserFlowData: UserFlowsCardProps[] = [];
  let DraftFlowData: UserFlowsCardProps[] = [];

  user?.blogs.map((blog) => {
    if (blog.isPublished) {
      UserFlowData.push(blog);
    } else {
      DraftFlowData.push(blog);
    }
  });

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
    <div className=" min-h-screen overflow-hidden pb-0 p-5">
      <div className="max-w-7xl mx-auto pb-12">
        <div className="bg-[#f5f5f5] dark:bg-white/10 rounded-2xl shadow-lg overflow-hidden">
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
            username={user?.name!}
            avatarImage={user?.image || DefaultAvatarImage}
          />
          <div className="px-4 w-full sm:px-8 py-6">
            <AboutSection
              about={AboutSectionDetails}
              userId={user?.id!}
              name={user?.name!}
              bio={user?.about?.bio!}
              location={user?.about?.location!}
              website={user?.about?.website!}
              career={user?.about?.career!}
              tags={[]}
            />
            <div className="w-full mt-8">
              <TabSwitcher
                isCurrentUser={session?.user.id === user?.id}
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
      </div>
    </div>
  );
};

export default page;
