import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { defaultThumbnail } from "../UserProfile/Tabs/UserFlows";
import Link from "next/link";
import ToggleBookmark from "./ToggleBookmark";
import { BlogWithUserAndTagsHome } from "@/types/BlogType";
import { UserCard } from "./Cards/UserCard";
import { Dot } from "lucide-react";

type HomeFlowCardProps = {
  flow: BlogWithUserAndTagsHome;
  userBookmark: { id: string }[];
}

// TODO: Add top comment
const HomeFlowCard = ({ flow, userBookmark }: HomeFlowCardProps) => {
  if (!flow) return null;
  let isBookmarked = false;
  userBookmark.map((bookmark) => {
    if (bookmark.id === flow.id) isBookmarked = true;
  })

  return (
    <div className="border-2 rounded-lg mx-2 sm:mx-4 md:mx-6 lg:mx-8 my-4 p-2">
      <UserCard userData={flow.user} createdAt={flow.createdAt} flowId={flow.id} />
      <Card className="border-none shadow-none w-full">
        <div  className="flex flex-col sm:flex-row gap-2 w-full">
          <CardHeader className="p-0 order-2 sm:order-1 w-full sm:w-2/3">
            <>
              <Link href={`/blog/${flow.id}`}>
                <CardTitle className="font-bold line-clamp-2 text-base sm:text-lg px-2 pt-2">
                  {flow.title}
                </CardTitle>
              </Link>
              <div className="flex gap-1 overflow-x-auto pb-2 ml-2">
                {
                  flow.tags.map((tag: { tag: string }, key: number) => (
                    <form key={key} method="GET" action="/">
                      <input type="hidden" name="search" value={tag.tag} />
                      <button type="submit">
                        <Badge variant="default">{tag.tag}</Badge>
                      </button>
                    </form>
                  ))
                }
              </div>
              <Link href={`/blog/${flow.id}`}>
                <CardDescription className="px-2 w-full line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
                  {
                    flow.description && flow.description?.replace(/<[^>]*>?/gm, '').replace(/\s\s+/g, ' ').slice(0, 200)
                  }
                  {
                    flow.description ? '\n' : '\n' +
                      flow.content?.replace(/<[^>]*>?/gm, '').replace(/\s\s+/g, ' ').slice(0, 200)
                  }
                </CardDescription>
              </Link>
            </>
          </CardHeader>
          {flow.thumbnail && (
            <CardContent className="relative mt-2 sm:mt-0 order-1 sm:order-2 mx-auto sm:mx-0 w-full sm:w-1/3 h-[200px] sm:h-[150px] rounded-lg bg-blue-300 p-0 overflow-hidden">
              <Link href={`/blog/${flow.id}`} >
                <Image
                  src={flow.thumbnail || defaultThumbnail}
                  alt="Blog thumbnail"
                  fill
                  className="w-full h-full object-cover"
                />
            </Link>
              </CardContent>
          )}
        </div>
        <CardFooter className="flex flex-col sm:flex-row pb-0 pt-2 px-2 justify-between items-start sm:items-center gap-2 sm:gap-0">
          <div className="flex flex-wrap gap-2 text-sm">
            {flow.noOfComments} Discuss <Dot /> {flow.likeCount} Likes <Dot /> {flow.noOfViews} Reads
          </div>
          <ToggleBookmark flowId={flow.id} isBookmarked={isBookmarked} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default HomeFlowCard;
