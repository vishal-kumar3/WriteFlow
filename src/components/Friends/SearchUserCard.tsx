import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { User } from "@/types/UserType"
import { DefaultAvatarImage } from "@/app/(main)/user/[userId]/page"
import FollowButtonServerWraper from "../UserProfile/FollowButtonServerWraper"
import Link from "next/link"

type props = {
  userData: User
}

const SearchUserCard = ({userData}: props) => {
  return (
    <Card className="flex flex-col md:flex-row justify-between items-center lg:px-10">
      <CardHeader className="flex w-full gap-2 flex-col sm:flex-row md:gap-5 items-center">
        <Link href={`/user/${userData?.id}`}>
          <Avatar className="size-[120px] md:size-[50px] lg:size-[70px]">
            <AvatarImage className="object-cover object-center" src={userData?.image || DefaultAvatarImage} alt={userData?.username} />
            <AvatarFallback>{userData?.username}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col gap-2 sm:flex-row w-full justify-between">
          <Link href={`/user/${userData?.id}`}>
            <CardTitle className="text-md lg:text-lg">@{userData?.username}</CardTitle>
            <CardDescription className="text-sm">{userData?.name}</CardDescription>
          </Link>
          <FollowButtonServerWraper className="max-w-[300px]" id={userData?.id!} username={userData?.username!} />
          {/* <p>Mutual Connections</p> */}
        </div>
      </CardHeader>
    </Card>
  )
}

export default SearchUserCard
