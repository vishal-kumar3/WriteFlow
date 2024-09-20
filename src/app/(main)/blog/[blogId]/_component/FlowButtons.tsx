"use client"
import { likeFlow, toggleBookmark } from '@/actions/flow.action'
import { Bookmark, BookmarkCheck, Copy, EllipsisVertical, Heart, ShareIcon } from 'lucide-react'
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
import CopyButton from '@/util/CopyButton';
import DeleteFlowButton from '@/components/RichEditor/DeleteFlowButton';
import AuthUserOnly from '@/util/AuthUserOnly';
import HideForCurrentUser from '@/util/HideForCurrentUser';
import { BookmarkFilledIcon, HeartFilledIcon } from '@radix-ui/react-icons';

import { FaWhatsapp } from 'react-icons/fa6'
import Link from 'next/link';

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
  const text = 'Check out this blog'
  const shareUrl = 'http://localhost:3000' + `/blog/${flowId}`
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const message = `${text}\n\n${shareUrl}`

  const [optimisticLikeData, addOptimisticLikeData] = useOptimistic(
    likeData,
    (state, newLikeData: likeDataProps) => {
      return {
        ...newLikeData
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
    <div className="flex gap-4 md:gap-8 mx-auto w-fit bg-white dark:bg-black rounded-3xl shadow-lg border-2 p-3 sm:p-4">
      <div className="flex gap-2 items-center justify-center">
        <button
          onClick={async () => {
            addOptimisticLikeData({
              likesCnt: optimisticLikeData.isAlreadyLiked ? optimisticLikeData.likesCnt - 1 : optimisticLikeData.likesCnt + 1,
              isAlreadyLiked: !optimisticLikeData.isAlreadyLiked
            })
            toast.success(optimisticLikeData.isAlreadyLiked ? "Flow Unliked" : "Flow Liked")

            const { error, success } = await likeFlow(flowId, userId)
            if (error) return toast.error(error)
          }}
        >
          {
            optimisticLikeData.isAlreadyLiked ? <HeartFilledIcon className='size-6 text-red-500' /> : <Heart />
          }
        </button>
        <div className="text-sm sm:text-base">{optimisticLikeData.likesCnt}</div>
      </div>
      {
        !isCommentOff && (
          <div className="flex gap-2 items-center">
            <CommentSection currentUser={currentUser} flowId={flowId} comment={comment} />
            <div className="text-sm sm:text-base">{commentCnt}</div>
          </div>
        )
      }
      <button
        onClick={async () => {
          addOptimisticIsBookmark(!optimisticIsBookmark)
          toast.success(isBookmarked ? "Flow Unbookmarked" : "Flow Bookmarked")

          const { error, success } = await toggleBookmark(flowId)
          if (error) return toast.error(error)
        }}
      >
        {
          optimisticIsBookmark ? <BookmarkFilledIcon className='text-blue-300 size-5 sm:size-6' /> : <Bookmark />
        }
      </button>
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <ShareIcon className='hover:cursor-pointer size-5 sm:size-6' />
        </HoverCardTrigger>
        <HoverCardContent className='flex w-fit gap-2 items-center'>
          <CopyButton copyLink={`/blog/${flowId}`} ><Copy className='size-5 sm:size-6' /></CopyButton>
          <Button variant={'ghost'} >
            <Link href={isMobile ?
              `whatsapp://send?text=${encodeURIComponent(message)}`
              : `https://web.whatsapp.com/send?text=${encodeURIComponent(message)}`} target={'_blank'}>
              <FaWhatsapp className='size-5 sm:size-6' />
            </Link>
          </Button>
          <Button variant={'ghost'} >I</Button>
          <Button variant={'ghost'} >X</Button>
        </HoverCardContent>
      </HoverCard>

      <div>
        <Popover>
          <PopoverTrigger>
            <EllipsisVertical className='size-5 sm:size-6' />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-1">
            <ReportUserCard reportOptions={reportPostOptions} type='post' reportedUserId={userId} reportedBlogId={flowId} />
            {
              currentUser?.id === userId && (
                <DeleteFlowButton flowId={flowId} userId={userId} modeClass='w-full' redirectMode={false} />
              )
            }
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default FlowButtons
