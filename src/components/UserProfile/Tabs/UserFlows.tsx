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
    <Link href={url}>
      <Card className="border-none pt-2">
        {/* {
          currentUserId && (
            <UserBanner />
          )
        } */}

        <CardContent className="pb-0">
          <div className="max-w-[70%] bg-pink-200 h-[200px] mx-auto overflow-hidden">
            <Image
              src={thumbnail || defaultThumbnail}
              width={300}
              height={200}
              alt={title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </CardContent>
        <CardHeader>
          {/* //TODO: Draft badge ko align krna h */}
          <CardTitle className="line-clamp-1 ">{!isPublished && <Badge variant="secondary" className=" text-sm">Draft</Badge>} {title}</CardTitle>
          {/* //TODO: Yaha Tags ko add krna h */}
          <ShowBadges badgeArray={tags?.map((tag) => tag.tag) || []} />
          <CardDescription>{formatDateAgo(createdAt)}</CardDescription>
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
