
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { Bell } from "lucide-react";
import RightSidebar from "@/components/RightSidebar/RightSidebar";
import AuthUserOnly from "@/util/AuthUserOnly";
import HomeFlows from "@/components/Home/HomeFlows";
import { BlogWithUserAndTagsHome } from "@/types/BlogType";
import { Suspense } from "react";
import HomeSkeleton from "@/components/LoadingPages/HomeSkeleton";
import SearchBar from "@/components/SearchBar/SearchBar";

export type HomePageProps = {
  searchParams: { search?: string }
}

export type FlowForHome = BlogWithUserAndTagsHome[]

const HomePage = ({ searchParams }: HomePageProps) => {
  return (
    <div className="relative w-full">
      <SearchBar />

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
