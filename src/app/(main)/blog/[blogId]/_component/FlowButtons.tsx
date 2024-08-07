"use client"
import { likeFlow, toggleBookmark } from '@/actions/flow.action'
import { Bookmark, BookmarkCheck, EllipsisVertical, Heart, HeartOff, MessageCircleMore, ShareIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type props = {
  flowId: string,
  userId: string,
  likeData: {
    isAlreadyLiked: boolean,
    likesCnt: number
  }
  isBookmarked: boolean | undefined
  commentCnt: number
}

const FlowButtons = ({ flowId, userId, likeData, isBookmarked, commentCnt }: props) => {
  return (
    <div className="sticky flex gap-8 bottom-20 bg-white dark:bg-black rounded-3xl mb-5 mx-auto w-fit border-2 p-4">
      <div className="flex gap-2">
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
      <div className="flex gap-2">
        <button>
          <MessageCircleMore />
        </button>
        <div>
          {commentCnt}
        </div>
      </div>
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
