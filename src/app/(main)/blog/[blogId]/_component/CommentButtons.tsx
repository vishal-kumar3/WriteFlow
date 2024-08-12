"use client"
import { alreadyLikedComment, deleteComment, likeComment } from '@/actions/flow.action'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import { Heart, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export type CommentButtonsProps = {
  flowId: string
  commentId: string
  likeCount: number
}

export const CommentButtons = ({ commentId, flowId, likeCount }: CommentButtonsProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false)

  useEffect(() => {
    async function alreadyLiked() {
      const { data } = await alreadyLikedComment(commentId)
      if (data) setAlreadyLiked(true)
      else setAlreadyLiked(false)
    }

    alreadyLiked()
  }, [commentId])

  return (
    <div className="flex px-4 gap-5 items-center">
      <button
        className="flex gap-2 items-center"
        onClick={async () => {
          const { error, success, data } = await likeComment(flowId, commentId)

          if (error) return toast.error(error)
          else {
            setAlreadyLiked(data!)
            return toast.success(success)
          }
        }}
        type="button"
      >{likeCount}
        {
          alreadyLiked ? <HeartFilledIcon className="w-4 text-red-500" /> : <Heart className="w-4" />
        }
      </button>
      {/* <button className="flex gap-2 items-center" type="submit">{8} <MessageCircleMore className="w-4" /></button> */}
      <button
        type="button"
        onClick={async () => {
          // console.log(commentId)
          const { error, success } = await deleteComment(commentId, flowId)
          if (error) return toast.error(error)
          else return toast.success(success)
        }}
      ><Trash className="w-4" /></button>
    </div>
  )
}
