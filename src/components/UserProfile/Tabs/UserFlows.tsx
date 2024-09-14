import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateAgo } from "@/util/DateTime";
import Image from "next/image";
import Link from "next/link";

export type UserFlowsCardProps = {
  userId?: string
  id: string
  title: string;
  description: string | null;
  isPublished: boolean;
  tags?: { tag: string }[];
  thumbnail: string | null;
  createdAt: Date;
};

export type UserFlowsProps = {
  data: UserFlowsCardProps[];
}

type ShowBadgesProps = {
  badgeArray: string[];
  // action: () => void;
}

export const ShowBadges = ({ badgeArray }: ShowBadgesProps) => {
  return (
    <div className="space-x-2">
      {
        badgeArray.map((badge: string, key: number) => (
          <Badge className="m-0" key={key}>{badge}</Badge>
        ))
      }
    </div>
  )
}

export const UserBanner = () => {
  return (
    <CardHeader>
      <Avatar>
        <AvatarImage className="object-cover object-center" src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </CardHeader>
  )
}

export const defaultThumbnail = "https://plus.unsplash.com/premium_photo-1664008628916-3b72a2136e22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const UserFlowsCard = async ({ id, title, tags, thumbnail, description, isPublished, createdAt, userId }: UserFlowsCardProps) => {
  const url = `/blog/${!isPublished ? 'draft/' : ''}${id}`
  // const session = await auth()
  // const currentUserId = session ? session?.user.id : null
  return (
    <Link className="h-fit md:h-full" href={url}>
      <Card className="h-fit md:h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      {thumbnail && (
          <CardContent className="p-0">
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={thumbnail || defaultThumbnail}
                alt={title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
          </CardContent>
        )}
        <CardHeader>
          <CardTitle className="line-clamp-1 ">{!isPublished && <Badge variant="secondary" className=" text-sm">Draft</Badge>} {title}</CardTitle>
          <CardDescription>{formatDateAgo(createdAt)}</CardDescription>
          <ShowBadges badgeArray={tags?.map((tag) => tag.tag) || []} />
          <CardDescription className="line-clamp-3">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

const UserFlows = ({ data }: UserFlowsProps) => {
  return (
    <>
      {
        data.map((card: UserFlowsCardProps, key: number) => (
            <UserFlowsCard
              key={key}
              id={card.id}
              title={card.title}
              tags={card.tags}
              isPublished={card.isPublished}
              description={card.description}
              createdAt={card.createdAt}
              thumbnail={card.thumbnail}
            />
        ))
      }
    </>
  )
}

export default UserFlows;
