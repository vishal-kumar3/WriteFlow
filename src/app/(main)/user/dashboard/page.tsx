import { getSevenDaysViews, getSevenDaysFollowers, getTotalViews, getRecentBlog, getTotalFlowsAndFollowers } from "@/actions/dashboard.action";
import { auth } from "@/auth";
import AnalyticsCard from "@/components/Dashboard/AnalyticsCard";
import CreateFlowForm from "@/components/form/CreateFlowForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { foramtDateTime } from "@/util/DateTime";
import Link from "next/link";


const InfoCard = async({userId}: {userId: string | undefined}) => {
  if(!userId) return null
  const data = await getTotalFlowsAndFollowers(userId)
  console.log(data)
  return (
    <Card className="min-w-[30%]">
      <CardHeader>
        <div className="size-[40px] rounded-full bg-blue-400"></div>
        <h1 className="font-semibold">Name&apos;s Flow Info</h1>
        <div className="text-lg text-muted-foreground flex justify-around px-2 py-3 bg-slate-200/40 rounded-md">
          <div>
            <div className="text-center">{data._count.blogs}</div>
            <div>Article</div>
          </div>
          <Link href={`/user/${userId}/friends`}>
            <div className="text-center">{data.followerCount}</div>
            <div>Follower</div>
          </Link>
        </div>
      </CardHeader>
    </Card>
  )
}

const RecentArticleCard = () => {

}

const RecentArticle = async ({ userId }: { userId: string | undefined }) => {
  if (!userId) return null

  const { error, success } = await getRecentBlog(userId)

  return (
    <Card className="min-w-[65%] ">
      {
        success ? (
          <>
            <div className="flex justify-between p-5 px-10 font-bold">
              <div>Flows</div>
              <div>Views</div>
            </div>
            <Separator />
            <div className="p-4 px-10 font-bold space-y-3">
              {
                success.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="w-[90%]">
                      <Link href={item.isPublished ? `/blog/${item.id}`: `/blog/draft/${item.id}`} className="line-clamp-1 ">{item.title}</Link>
                      <div className="font-normal text-gray-500">{foramtDateTime(item.updatedAt)}</div>
                    </div>
                    <div>
                      {item.noOfViews}
                    </div>
                  </div>
                ))
              }
            </div>
            <CardFooter className="flex justify-center w-full">
              <Button variant="outline" className="w-[50%] rounded-full">
                <Link href="/user/dashboard/flows" className="w-full">See All Flows</Link>
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <div className="size-[40px] bg-slate-200/50 rounded-full mx-auto"></div>
              <CardTitle className="mx-auto">No recent articles</CardTitle>
              <CardDescription className="mx-auto">Your recently published article will show up here.</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center w-full">
              <CreateFlowForm
                title="Write Your  First Flow"
                showIcon={true}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              />
            </CardFooter>
          </>
        )
      }
    </Card>
  )
}

const Analytics: { title: string, action: (userId: string) => Promise<number> }[] = [
  {
    title: "7-day page view",
    action: getSevenDaysViews,
  },
  {
    title: "Total page view",
    action: getTotalViews,
  },
  {
    title: "7-days followers",
    action: getSevenDaysFollowers,
  },
];

type props = {
  params: {
    userId: string;
  };
};

const DashboardPage = async () => {
  const session = await auth()
  if (!session) return null;
  const userId = session.user.id;

  return (
    <div className="m-10 h-[5000px]">
      {/* //TODO: Breadcrum here */}
      Breadcrum here
      <div className="border-b">
        <p className="text-4xl font-semibold">Dashboard</p>
        <p className="opacity-50 mt-1 mb-6">
          Learn more about your new dashboard and get started
        </p>
      </div>

      <div className="my-10">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold mb-4">Your WriteFlow Stats</h1>
          <Link href={"/user/dashboard/analytics"} className="text-blue-400">Go to analytics -</Link>
        </div>
        <div className="flex gap-10 justify-between items-center">
          {
            Analytics.map((item) => (
              <AnalyticsCard key={item.title} title={item.title} action={item.action} userId={userId!} />
            ))
          }
        </div>
      </div>

      <div>
        <h1 className="font-semibold">Info</h1>
        <div className="flex justify-between gap-10">
          <InfoCard userId={userId} />
          <RecentArticle userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

// export function DashboardBreadcrumb() {
//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <BreadcrumbLink href="/">Home</BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <DropdownMenu>
//             <DropdownMenuTrigger className="flex items-center gap-1">
//               <BreadcrumbEllipsis className="h-4 w-4" />
//               <span className="sr-only">Toggle menu</span>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start">
//               <DropdownMenuItem>Documentation</DropdownMenuItem>
//               <DropdownMenuItem>Themes</DropdownMenuItem>
//               <DropdownMenuItem>GitHub</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbPage>  </BreadcrumbPage>
//         </BreadcrumbItem>
//       </BreadcrumbList>
//     </Breadcrumb>
//   )
// }
