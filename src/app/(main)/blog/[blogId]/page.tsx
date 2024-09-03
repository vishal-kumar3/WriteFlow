import dynamic from 'next/dynamic';
import CoverImage from "@/components/UserProfile/CoverImage";
import prisma from "@/prisma";
import { DefaultAvatarImage, DefaultCoverImage } from "../../user/[userId]/page";
import { auth } from "@/auth";
import FlowButtons from "./_component/FlowButtons";
import { isBookmarked, viewFlow } from "@/actions/flow.action";
import { Separator } from "@/components/ui/separator";
import { BlogWithUserAndComments } from "@/types/BlogType";
import { ActionResponse } from "@/types/ActionResponse";
import { Like } from "@/types/LikeType";
import './_component/prosemirror.css'
import { JSONContent } from 'novel';
import { convertToJSONContent } from '@/util/convertToJSONContent';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { foramtDateTime } from '@/util/DateTime';
import AuthUserOnly from '@/util/AuthUserOnly';
import HideForCurrentUser from '@/util/HideForCurrentUser';
import FollowButton from '@/components/UserProfile/FollowButton';
import { ModeToggle } from '@/components/ThemeToggle/ThemeToggle';
import FollowButtonServerWraper from '@/components/UserProfile/FollowButtonServerWraper';

// Dynamically import the client-side component
const ShowBlog = dynamic(() => import('./_component/ShowBlog'), {
  ssr: false
});

type props = {
  params: {
    blogId: string
  }
}

const PublishedBlog = async ({ params }: props) => {
  const session = await auth();
  const publishedId = params.blogId;

  if (!session) return <div>You are not loggedIn</div>;

  const likeWhereUniqueInput = {
    userId_blogId: {
      userId: session?.user.id!,
      blogId: publishedId,
    },
  };

  const isAlreadyLiked: Like = await prisma.blogLike.findUnique({
    where: likeWhereUniqueInput
  });

  await viewFlow(publishedId);

  const blog: BlogWithUserAndComments = await prisma.blog.findUnique({
    where: {
      id: publishedId,
      isPublished: true
    },
    include: {
      user: true,
      Comment: {
        include: {
          user: true
        }
      },
    }
  });

  if (!blog) return <div>Blog not found</div>;
  const isAlreadyBookmarked: ActionResponse = await isBookmarked(publishedId);

  return (
    <div className="h-full relative max-w-[80%] mx-auto">
      <div className="sticky top-5 flex justify-between bg-gray-100 dark:bg-white/10 p-2 px-8 rounded-lg items-center">
        <div className="flex gap-5 items-center">
          <Link href={`/user/${blog.user.id}`}>
            <Avatar>
              <AvatarImage src={blog?.user?.image || DefaultAvatarImage} alt="@shadcn" />
              <AvatarFallback>{blog.user.username}</AvatarFallback>
            </Avatar>
          </Link>
          <Link href={`/user/${blog.user.id}`} className="font-bold text-xl">@{blog.user.username}</Link>
          <p className="text-lg">{foramtDateTime(blog.updatedAt)}</p>
        </div>
        <div className="flex gap-5 items-center">
          {/* @ts-expect-error Async Server Component */}
          <AuthUserOnly>
            {/* @ts-expect-error Async Server Component */}
            <HideForCurrentUser userId={blog.user.id}>
              <FollowButtonServerWraper username={blog.user.username} id={blog.user.id} />
            </HideForCurrentUser>
          </AuthUserOnly>
          <ModeToggle />
        </div>
      </div>
      <div className="my-10">
        <CoverImage
          coverImage={blog.coverImage || DefaultCoverImage}
          disabled={false}
        />
        <p className="outline-none text-center py-5 pb-8 w-full focus:outline-none border-x text-5xl font-bold px-20 resize-none">{blog.title}</p>
        <p className="text-center italic outline-none pb-16 w-full focus:outline-none border-x text-2xl font-normal px-[7.5rem] resize-none">{blog.description}</p>
        {/* Use the dynamically imported Client Component */}
        <div className="tiptap ProseMirror dark:prose-invert prose-headings:font-title font-default focus:outline-none prose prose-lg border border-t-0 max-w-[100%] px-10 dark:text-white" dangerouslySetInnerHTML={{ __html: blog.content! }}>
        </div>
      </div>
      <FlowButtons
        flowId={blog.id}
        userId={session?.user.id!}
        currentUser={blog.user}
        isCommentOff={blog.isCommentOff}
        likeData={{
          isAlreadyLiked: isAlreadyLiked ? true : false,
          likesCnt: blog.likeCount
        }}
        comment={blog.Comment}
        commentCnt={blog.noOfComments}
        isBookmarked={isAlreadyBookmarked.data}
      />

      <Separator />
    </div>
  );
}

export default PublishedBlog;
