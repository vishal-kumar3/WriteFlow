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
    <div className="border-2 rounded-lg m-10 p-4">
      <UserCard userData={flow.user} createdAt={flow.createdAt} flowId={flow.id} />
      <Card className="border-none w-full">
        <div className="flex lg:flex-row flex-col gap-2 lg:gap-0 w-full">
          <CardHeader className="p-0 w-full">
            <Link href={`/blog/${flow.id}`}>
              <CardTitle className="font-bold line-clamp-2 text-lg px-2 pt-2">
                {flow.title}
              </CardTitle>
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
              <CardContent className="relative mx-auto lg:mx-0 w-[250px] h-[150px] rounded-lg bg-blue-300 p-0 overflow-hidden">
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
        <CardFooter className="flex flex-col lg:flex-row pt-2 px-2 justify-between items-center">
          <div className="flex flex-wrap lg:gap-2">{flow.noOfComments} Discuss <Dot /> {flow.likeCount} Likes <Dot /> {flow.noOfViews} Reads</div>
          <div className="flex items-center">
            {
              flow.tags.map((tag: { tag: string }, key: number) => (
                <form key={key} method="GET" action="/">
                  <input type="hidden" name="search" value={tag.tag} />
                  <button type="submit">
                    <Badge variant="default" className="mr-2">{tag.tag}</Badge>
                  </button>
                </form>
              ))
            }
            <ToggleBookmark flowId={flow.id} isBookmarked={isBookmarked} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HomeFlowCard;
