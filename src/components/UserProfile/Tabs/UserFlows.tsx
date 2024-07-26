import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type UserFlowsCardProps = {
  title: string;
  description: string;
  publishDate: string;
  thumbnail: string;
};

type UserFlowsProps = {}

type ShowBadgesProps = {
  badgeArray: string[];
  // action: () => void;
}

export const ShowBadges = ({badgeArray}: ShowBadgesProps) => {
  return (
    <div className="space-x-2">
      {
        badgeArray.map((badge: string) => (
          <Badge>{badge}</Badge>
        ))
      }
    </div>
  )
}

export const UserFlowsCard = ({title, thumbnail, description, publishDate}: UserFlowsCardProps) => {
  return (
    <Card className="border-none pt-2">
      <CardContent className="pb-0">
        <div className="max-w-[95%] bg-pink-200 h-[200px] mx-auto"></div>
      </CardContent>
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <ShowBadges badgeArray={["Badge", "Nope"]} />
        <CardDescription>{publishDate}</CardDescription>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

const UserFlows = (props: UserFlowsProps) => {
  return (
    <div className="">
      <UserFlowsCard
        title="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, velit."
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, velit.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, velit.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, velit."
        publishDate="Card Publish Date"
        thumbnail="Card Thumbnail"
      />
      
    </div>
  )
}

export default UserFlows;
