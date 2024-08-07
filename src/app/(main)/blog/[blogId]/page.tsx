import CoverImage from "@/components/UserProfile/CoverImage";
import prisma from "@/prisma";
import { DefaultCoverImage } from "../../user/[userId]/page";
import Image from "next/image";
import { foramtDateTime, formatDateAgo } from "@/util/DateTime";
import { auth } from "@/auth";
import FlowButtons from "./_component/FlowButtons";
import { isBookmarked } from "@/actions/flow.action";
import { Dot } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type props = {
  params: {
    blogId: string
  }
}

const PublishedBlog = async ({ params }: props) => {
  const session = await auth()
  const publishedId = params.blogId;

  const isAlreadyLiked = await prisma.like.findUnique({
    where: {
      blogId: publishedId,
      userId: session?.user.id!
    }
  })

  const blog = await prisma.blog.findUnique({
    where: {
      id: publishedId,
      isPublished: true
    },
    include: {
      //TODO: include user but not password thing!!!
      user: true,
      Comment: true,
    }
  })

  const isAlreadyBookmarked = await isBookmarked(publishedId)

  if (!blog) return <div>Blog not found</div>

  return (
    <div className="h-full relative max-w-[80%] mx-auto">
      <div className="my-20">
        <CoverImage
          coverImage={blog.coverImage || DefaultCoverImage}
          disabled={false}
        />
        <p className="outline-none text-center py-5 pb-8 w-full focus:outline-none border-x text-5xl font-bold px-20 resize-none">{blog.title}</p>
        <Link href={`/user/${blog.userId}`} className="flex items-center w-full border-x pb-8 justify-center gap-8 ">
          <div className="flex gap-3 items-center">
            <Image src={blog.user.image!} alt="Profile Image" width={80} height={80} className="size-[60px] object-cover object-center rounded-full" />
            <div className="">
              <div className="text-md">{blog.user.name}</div>
              <div className="text-md">@{blog.user.username}</div>
            </div>
          </div>
          <Dot className="text-zinc-500" />
          <div className="text-xl">{foramtDateTime(blog.updatedAt)}</div>
        </Link>
        <p className="text-center italic outline-none pb-16 w-full focus:outline-none border-x text-2xl font-normal px-[7.5rem] resize-none">{blog.description}</p>
        <div className="prose prose-lg border border-t-0 max-w-[100%] px-10" dangerouslySetInnerHTML={{ __html: blog.content! }}>
        </div>
      </div>
      <FlowButtons
        flowId={blog.id}
        userId={session?.user.id!}
        likeData={{
          isAlreadyLiked: isAlreadyLiked ? true : false,
          likesCnt: blog.likeCount
        }}
        commentCnt={blog.noOfComments}
        isBookmarked={isAlreadyBookmarked.data}
      />

      <Separator />

    </div>
  )
}

export default PublishedBlog
