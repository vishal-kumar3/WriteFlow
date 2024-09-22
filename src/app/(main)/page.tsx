import RightSidebar from "@/components/RightSidebar/RightSidebar";
import AuthUserOnly from "@/util/AuthUserOnly";
import HomeFlows from "@/components/Home/HomeFlows";
import { BlogWithUserAndTagsHome } from "@/types/BlogType";
import { Suspense } from "react";
import HomeSkeleton from "@/components/LoadingPages/HomeSkeleton";
import SearchBar from "@/components/SearchBar/SearchBar";
import { auth } from "@/auth";
import prisma from "@/prisma";

export type HomePageProps = {
  searchParams: { search?: string }
}

export type FlowForHome = BlogWithUserAndTagsHome[]

const HomePage = async({ searchParams }: HomePageProps) => {
  const session = await auth()
  let user = null;
  if(session){
    user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      }
    }).catch(() => null)
  }

  return (
    <div className="relative w-full">
      <SearchBar user={user} />

      <div className="flex justify-center">
        <Suspense fallback={<HomeSkeleton />}>
          <HomeFlows searchParams={searchParams} />
        </Suspense>
        {/* @ts-expect-error Async Server Component */}
        <AuthUserOnly>
          {/* @ts-expect-error Async Server Component */}
          <RightSidebar />
        </AuthUserOnly>
      </div>

    </div>
  );
};

export default HomePage;
