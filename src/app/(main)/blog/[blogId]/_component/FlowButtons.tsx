"use client"
import { likeFlow, toggleBookmark } from '@/actions/flow.action'
import { Bookmark, BookmarkCheck, EllipsisVertical, Heart, HeartOff, MessageCircleMore, ShareIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { CommentSection, commentType } from './CommentSection'
import { Comment, User } from '@prisma/client'
import { CommentBlock } from './CommentBlock'

type props = {
  flowId: string,
  userId: string,
  likeData: {
    isAlreadyLiked: boolean,
    likesCnt: number
  }
  isBookmarked: boolean | undefined
  commentCnt: number
  comment: Comment[]
  currentUser: User | null
  isCommentOff: boolean
}

const FlowButtons = ({ flowId, userId, likeData, isBookmarked, isCommentOff, commentCnt, comment, currentUser }: props) => {
  return (
    <div className="sticky flex gap-8 bottom-20 bg-white dark:bg-black rounded-3xl mb-5 mx-auto w-fit border-2 p-4">
      <div className="flex gap-2 items-center">
        <button
          onClick={async() => {
            const { error, success} = await likeFlow(flowId, userId)

            if(error) return toast.error(error)
            else return toast.success(success)
          }}
        >
          {
            likeData.isAlreadyLiked ? <HeartOff /> : <Heart />
          }
        </button>
        <div>{likeData.likesCnt}</div>
      </div>
      {
        !isCommentOff && (
          <div className="flex gap-2 items-center">
            <CommentSection currentUser={currentUser} flowId={flowId} comment={comment as commentType[]} />
            <div>
              {commentCnt}
            </div>
          </div>
        )
      }
      <button
        onClick={async() => {
          const { error, success } = await toggleBookmark(flowId)

          if(error) return toast.error(error)
          else return toast.success(success)
        }}
      >
        {
          isBookmarked ? <BookmarkCheck /> : <Bookmark />
        }
      </button>
      <button>
          <ShareIcon />
      </button>
      <button>
          <EllipsisVertical />
      </button>
    </div>
  )
}

export default FlowButtons
