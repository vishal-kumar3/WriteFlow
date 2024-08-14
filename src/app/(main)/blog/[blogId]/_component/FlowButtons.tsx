"use client"
import { likeFlow, toggleBookmark } from '@/actions/flow.action'
import { Bookmark, BookmarkCheck, EllipsisVertical, Heart, HeartOff, MessageCircleMore, ShareIcon, Tally3 } from 'lucide-react'
import { toast } from 'sonner'
import { useActionState, useOptimistic, useTransition } from "react";
import { CommentSection } from './CommentSection'
import { CommentWithUser } from '@/types/CommentType'
import { User } from '@/types/UserType'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from '@/components/ui/button';

import 'dotenv/config'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ReportUserCard } from '@/components/Home/Cards/ReportUserCard';
import { reportPostOptions } from '@/components/Home/reportOptions';

type likeDataProps = {
  isAlreadyLiked: boolean,
  likesCnt: number
}

type props = {
  flowId: string,
  userId: string,
  likeData: likeDataProps,
  isBookmarked: boolean | undefined
  commentCnt: number
  comment: CommentWithUser[]
  currentUser: User
  isCommentOff: boolean
}

const FlowButtons = ({ flowId, userId, likeData, isBookmarked, isCommentOff, commentCnt, comment, currentUser }: props) => {

  // const [state, LikeAction, isLikePending ] = useActionState(likeFlow, null);
  // const [isLikePending, startLike] = useTransition()

  const [optimisticLikeData, addOptimisticLikeData] = useOptimistic(
    likeData,
    (state, newLikeData: likeDataProps) => {
      return {
        likesCnt: newLikeData.likesCnt,
        isAlreadyLiked: newLikeData.isAlreadyLiked
      }
    }
  )

  const [optimisticIsBookmark, addOptimisticIsBookmark] = useOptimistic(
    isBookmarked,
    (state, newIsBookmarked: boolean) => {
      return newIsBookmarked
    }
  )

  return (
    <div className="sticky flex gap-8 bottom-20 bg-white dark:bg-black rounded-3xl mb-5 mx-auto w-fit border-2 p-4">
      <div className="flex gap-2 items-center justify-center">
        <button
          onClick={async () => {
            // LikeAction({flowId, userId})
            // startLike(() => {
            //   likeFlow(flowId, userId)
            // })

            addOptimisticLikeData({
              likesCnt: likeData.isAlreadyLiked ? likeData.likesCnt - 1 : likeData.likesCnt + 1,
              isAlreadyLiked: !likeData.isAlreadyLiked
            })
            toast.success(likeData.isAlreadyLiked ? "Flow Unliked" : "Flow Liked")

            const { error, success } = await likeFlow(flowId, userId)
            if (error) return toast.error(error)
          }}
        >
          {/* {
            isLikePending ? <MessageCircleMore /> : null
          } */}
          {
            optimisticLikeData.isAlreadyLiked ? <HeartOff /> : <Heart />
          }
        </button>
        <div>{optimisticLikeData.likesCnt}</div>
      </div>
      {
        !isCommentOff && (
          <div className="flex gap-2 items-center">
            <CommentSection currentUser={currentUser} flowId={flowId} comment={comment} />
            <div>
              {commentCnt}
            </div>
          </div>
        )
      }
      <button
        onClick={async () => {
          // const { error, success } = await toggleBookmark(flowId)

          // if(error) return toast.error(error)
          // else return toast.success(success)

          addOptimisticIsBookmark(!isBookmarked)
          toast.success(isBookmarked ? "Flow Unbookmarked" : "Flow Bookmarked")

          const { error, success } = await toggleBookmark(flowId)
          if (error) return toast.error(error)
        }}
      >
        {
          optimisticIsBookmark ? <BookmarkCheck /> : <Bookmark />
        }
      </button>
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <ShareIcon className='hover:cursor-pointer' />
        </HoverCardTrigger>
        <HoverCardContent className='flex w-fit gap-2 items-center'>
          <Button onClick={() => {
            navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST}/blog/${flowId}`)
            toast.success("Copied to clipboard")
          }} variant={'ghost'} >S</Button>
          <Button variant={'ghost'} >W</Button>
          <Button variant={'ghost'} >I</Button>
          <Button variant={'ghost'} >X</Button>
        </HoverCardContent>
      </HoverCard>

      <div>
        <Popover>
          <PopoverTrigger>
            <EllipsisVertical />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-1">
            <ReportUserCard reportOptions={reportPostOptions} type='post' reportedUserId={userId} reportedBlogId={flowId} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default FlowButtons
