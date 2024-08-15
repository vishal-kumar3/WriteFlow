"use client"
import { alreadyLikedComment, deleteComment, likeComment } from '@/actions/flow.action'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import { Heart, Trash } from 'lucide-react'
import React, { useEffect, useOptimistic, useState } from 'react'
import { toast } from 'sonner'

export type CommentButtonsProps = {
  flowId: string
  commentId: string
  likeCount: number
  auth: boolean
}

export const CommentButtons = ({ commentId, flowId, likeCount, auth }: CommentButtonsProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false)

  const [alreadyLikedOptimistic, setAlreadyLikedOptimistic] = useOptimistic(
    alreadyLiked,
    (state, newAlreadyLiked: boolean) => {
      return newAlreadyLiked
    }
  )

  const [likeCountOptimistic, setLikeCountOptimistic] = useOptimistic(
    likeCount,
    (state, newLikeCount: number) => {
      return newLikeCount
    }
  )

  useEffect(() => {
    async function alreadyLiked() {
      const { data } = await alreadyLikedComment(commentId)
      if (data) setAlreadyLiked(true)
      else setAlreadyLiked(false)
    }

    alreadyLiked()
  }, [commentId, alreadyLikedOptimistic])

  return (
    <div className="flex px-4 gap-5 items-center">
      <button
        className="flex gap-2 items-center"
        onClick={async () => {
          setAlreadyLikedOptimistic(!alreadyLiked)
          setLikeCountOptimistic(alreadyLikedOptimistic ? likeCount - 1 : likeCount + 1)
          toast.success('Comment Liked!!!')

          const { error, success, data } = await likeComment(flowId, commentId)

          if (error) return toast.error(error)
        }}
        type="button"
      >{likeCountOptimistic}
        {
          alreadyLikedOptimistic ? <HeartFilledIcon className="w-4 text-red-500" /> : <Heart className="w-4" />
        }
      </button>
      {/* <button className="flex gap-2 items-center" type="submit">{8} <MessageCircleMore className="w-4" /></button> */}

      {
        auth && (
          <button
            type="button"
            onClick={async () => {
              // console.log(commentId)
              const { error, success } = await deleteComment(commentId, flowId)
              if (error) return toast.error(error)
              else return toast.success(success)
            }}
          ><Trash className="w-4" /></button>
        )
      }

    </div>
  )
}
