import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Bookmark, BookmarkCheck } from "lucide-react";

type props = {};

export const UserCard = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="size-[40px] bg-red-300 rounded-full"></div>
      <div className="text-sm leading-tight">
        <p>User Name</p>
        <p>Gmail Id | Date</p>
      </div>
    </div>
  );
};
// TODO: Add top comment
const HomeFlowCard = (props: props) => {
  return (
    <div className="border-2 rounded-lg m-10 p-4">
      <UserCard />
      <Card className="border-none">
        <div className="flex">
          <CardHeader className="p-0">
            <CardTitle className="font-bold line-clamp-2 text-lg px-2 pt-2">TITLE</CardTitle>
            <CardDescription className="px-2 line-clamp-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta quia
              vel, ad recusandae quo molestiae tempora illum numquam possimus
              debitis.
            </CardDescription>
          </CardHeader>
          {/* //TODO: Image */}
          <CardContent className="min-w-[250px] min-h-[150px] rounded-lg bg-blue-300"></CardContent>
        </div>
        <CardDescription className="px-2">ye vo sb Discussed and Liked this</CardDescription>
        <CardFooter className="flex px-2 justify-between items-center">
          <div>
            Discuss . 101 Likes . 219 reads
          </div>
          <div className="flex">
            <Badge>Holla</Badge>
            <Badge>Holla</Badge>
            <Badge>Holla</Badge>
            <Bookmark />
            <BookmarkCheck />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HomeFlowCard;
