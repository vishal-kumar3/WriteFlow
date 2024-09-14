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

  if(!flow) return null;

  let isBookmarked = false;
  userBookmark.map((bookmark) => {
    if (bookmark.id === flow.id) isBookmarked = true;
  })

  return (
    <div className="border-2 rounded-lg mx-5 sm:mx-10 my-4 p-4">
      <UserCard userData={flow.user} createdAt={flow.createdAt} flowId={flow.id} />
      <Card className="border-none shadow-none w-full">
        <div className="flex lg:flex-row flex-col gap-2 pt-2 lg:gap-0 w-full">
          <CardHeader className="p-0 order-2 lg:order-1 w-full">
            <Link href={`/blog/${flow.id}`}>
              <CardTitle className="font-bold line-clamp-2 text-lg px-2 pt-2">
                {flow.title}
              </CardTitle>
              <div className="flex gap-1">
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
              <CardDescription className="px-2 w-full line-clamp-4">
                {
                  flow.description && flow.description?.replace(/<[^>]*>?/gm, '').replace(/\s\s+/g, ' ').slice(0, 200)
                }
                {
                  flow.description ? '\n' : '\n' +
                  flow.content?.replace(/<[^>]*>?/gm, '').replace(/\s\s+/g, ' ').slice(0, 200)
                }
              </CardDescription>
            </Link>
          </CardHeader>
          {/* //TODO: Image */}
          {
            flow.thumbnail && (
              <CardContent className="relative order-1 lg:order-2 mx-auto lg:mx-0 w-full h-[200px] lg:w-[400px]  lg:h-[150px] rounded-lg bg-blue-300 p-0 overflow-hidden">
                  <Image
                    src={flow.thumbnail || defaultThumbnail}
                    alt="Picture of the author"
                    fill
                    className="w-full h-full object-cover"
                  />
              </CardContent>
            )
          }
        </div>
        <CardFooter className="flex flex-row pb-0 pt-2 px-2 justify-between items-center">
          <div className="flex flex-wrap lg:gap-2">{flow.noOfComments} Discuss <Dot /> {flow.likeCount} Likes <Dot /> {flow.noOfViews} Reads</div>
          <ToggleBookmark flowId={flow.id} isBookmarked={isBookmarked} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default HomeFlowCard;
