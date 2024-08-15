import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { Bell } from "lucide-react";
import RightSidebar from "@/components/RightSidebar/RightSidebar";
import AuthUserOnly from "@/util/AuthUserOnly";
import HomeFlows from "@/components/Home/HomeFlows";
import { getFlowForHome } from "@/actions/flow.action";
import { BlogWithUserAndTagsHome } from "@/types/BlogType";


type HomePageProps = {
  searchParams: { search?: string }
}

export type FlowForHome = BlogWithUserAndTagsHome[]

type getFlowHomeProps = {
  error?: string | null
  data?: FlowForHome
}

const HomePage = async ({ searchParams }: HomePageProps) => {

  const { error, data } : getFlowHomeProps = await getFlowForHome(searchParams.search || '');
  if (error) return <div>{error}</div>

  return (
    <div className="relative w-full">
      <form method="GET" action="/" className="sticky bg-background z-10 flex top-0 border-b-2 mt-0 w-full px-10 justify-between items-center h-[60px]">
        <Input
          name="search"
          className="outline-none max-w-[60%] mx-auto"
          placeholder="Search for Flows..."
          type="text"
        />
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Bell />
        </div>
      </form>

      <div className="flex justify-center">
        <HomeFlows data={data!} />
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
