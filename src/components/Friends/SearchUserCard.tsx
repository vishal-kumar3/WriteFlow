import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "../ui/button"
import { User } from "@/types/UserType"
import { DefaultAvatarImage } from "@/app/(main)/user/[userId]/page"
import FollowButtonServerWraper from "../UserProfile/FollowButtonServerWraper"
import Link from "next/link"
import HideForCurrentUser from "@/util/HideForCurrentUser"

type props = {
  userData: User
}

const SearchUserCard = ({userData}: props) => {
  return (
    <Card className="flex justify-between items-center px-10">
      <CardHeader className="flex flex-row gap-5 items-center">
        <Link href={`/user/${userData?.id}`}>
          <Avatar className="size-[70px]">
            <AvatarImage src={userData?.image || DefaultAvatarImage} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col gap-2">
          <Link href={`/user/${userData?.id}`}>
            <CardTitle>@{userData?.username}</CardTitle>
            <CardDescription>{userData?.name}</CardDescription>
          </Link>
          <p>Mutual Connections</p>
        </div>
      </CardHeader>

        <FollowButtonServerWraper id={userData?.id!} username={userData?.username!} />
    </Card>
  )
}

export default SearchUserCard
