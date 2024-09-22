import dynamic from 'next/dynamic';
import CoverImage from "@/components/UserProfile/CoverImage";
import prisma from "@/prisma";
import { DefaultAvatarImage, DefaultCoverImage } from "../../user/[userId]/page";
import { auth } from "@/auth";
import FlowButtons from "./_component/FlowButtons";
import { isBookmarked, viewFlow } from "@/actions/flow.action";
import { Separator } from "@/components/ui/separator";
import { BlogWithTagsAndUser, BlogWithTagsAndUserAndComments, BlogWithUserAndComments } from "@/types/BlogType";
import { ActionResponse } from "@/types/ActionResponse";
import { Like } from "@/types/LikeType";
import './_component/prosemirror.css'
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { foramtDateTime } from '@/util/DateTime';
import AuthUserOnly from '@/util/AuthUserOnly';
import HideForCurrentUser from '@/util/HideForCurrentUser';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import FollowButtonServerWraper from '@/components/UserProfile/FollowButtonServerWraper';
import MoreArticles from './_component/RelatedArticles';

// Dynamically import the client-side component
const ShowBlog = dynamic(() => import('./_component/ShowBlog'), {
  ssr: false
});

type props = {
  params: {
    blogId: string
  }
}

export default async function PublishedBlog({ params }: props) {
  const session = await auth();
  const publishedId = params.blogId;

  if (!session) return <div className="p-4 text-center">You are not logged in</div>;

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

  const blog: BlogWithTagsAndUserAndComments = await prisma.blog.findUnique({
    where: {
      id: publishedId,
      isPublished: true
    },
    include: {
      user: true,
      tags: true,
      Comment: {
        include: {
          user: true
        }
      },
    }
  });

  if (!blog) return <div className="p-4 text-center">Blog not found</div>;
  const isAlreadyBookmarked: ActionResponse = await isBookmarked(publishedId);

  const relatedBlogs: BlogWithTagsAndUser[] = await prisma.blog.findMany({
    where: {
      OR: [
        {
          tags: {
            some: {
              id: {
                in: blog.tags.map(tag => tag.id),
              },
            },
          },
        },
        {
          userId: blog.userId,
        },
        {
          isPublished: true
        }
      ],
      isPublished: true,
      NOT: {
        id: blog.id,
      },
    },
    include: {
      user: true,
      tags: true,
    },
    take: 3,
  });

  const currentUser = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <div className='flex-grow'>
        <div className="p-2 md:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:sticky top-5 z-10 bg-white dark:bg-black rounded-lg shadow-md p-4 mb-8">
            <div className="flex flex-wrap justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <Link href={`/user/${blog.user.id}`}>
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                    <AvatarImage className='object-cover object-center' src={blog?.user?.image || DefaultAvatarImage} alt={blog.user.username || "User"} />
                    <AvatarFallback>{blog.user.username?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link href={`/user/${blog.user.id}`} className="font-bold text-sm sm:text-base">{blog.user.name}</Link>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{foramtDateTime(blog.updatedAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* @ts-expect-error Async Server Component */}
                <AuthUserOnly>
                  {/* @ts-expect-error Async Server Component */}
                  <HideForCurrentUser userId={blog.user.id}>
                    <FollowButtonServerWraper username={blog.user.username!} id={blog.user.id} />
                  </HideForCurrentUser>
                </AuthUserOnly>
                <ThemeToggle />
              </div>
            </div>
          </div>

          <article className="bg-white/10 rounded-lg shadow-md overflow-hidden mb-8">
            <CoverImage
              coverImage={blog.coverImage || DefaultCoverImage}
              disabled={false}
            />
            <div className="p-2 sm:p-6 md:p-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">{blog.title}</h1>
              <p className="text-md sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 italic mb-8 text-center">{blog.description}</p>
              <div
                className="tiptap ProseMirror prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg mx-auto max-w-full overflow-hidden"
                style={{ wordWrap: 'break-word' }}
                dangerouslySetInnerHTML={{ __html: blog.content! }}
              />
            </div>
          </article>

          <Separator className="my-8" />
          <div className='sticky bottom-20 py-4'>
            <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
              <FlowButtons
                flowId={blog.id}
                userId={session?.user.id!}
                currentUser={currentUser}
                isCommentOff={blog.isCommentOff}
                likeData={{
                  isAlreadyLiked: isAlreadyLiked ? true : false,
                  likesCnt: blog.likeCount
                }}
                comment={blog.Comment}
                commentCnt={blog.noOfComments}
                isBookmarked={isAlreadyBookmarked.data}
              />
            </div>
          </div>
        </div>
        <MoreArticles relatedArticles={relatedBlogs} />
      </div>
    </div>
  );
}
