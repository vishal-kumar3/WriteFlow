"use client"
import { toggleBookmark } from '@/actions/flow.action'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import React, { useOptimistic } from 'react'
import { toast } from 'sonner'

type props = {
  isBookmarked: boolean,
  flowId: string,
}

const ToggleBookmark = ({isBookmarked, flowId}: props) => {

  const [optimisticIsBookmark, addOptimisticIsBookmark] = useOptimistic(
    isBookmarked,
    (state, newIsBookmarked: boolean) => {
      return newIsBookmarked
    }
  )

  return (
    <button
      type='submit'
      onClick={async() => {
        // const { error, success } = await toggleBookmark(flowId)
        // if (error) toast.error(error)
        // if (success) toast.success(success)

        addOptimisticIsBookmark(!optimisticIsBookmark)
        toast.success(optimisticIsBookmark ? "Flow Unbookmarked" : "Flow Bookmarked")

        const {error, success} = await toggleBookmark(flowId)
        if(error) return toast.error(error)
      }}
    >
      {
        optimisticIsBookmark ? <BookmarkFilledIcon className='text-blue-300 size-[26px]' /> : <Bookmark />
      }
    </button>
  )
}

export default ToggleBookmark
