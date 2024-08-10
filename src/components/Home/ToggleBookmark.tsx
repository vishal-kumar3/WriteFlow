"use client"
import { toggleBookmark } from '@/actions/flow.action'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type props = {
  isBookmarked: boolean,
  flowId: string,
}

const ToggleBookmark = ({isBookmarked, flowId}: props) => {
  const submitToggleBookmark = async() => {
    const { error, success } = await toggleBookmark(flowId)

    if(error) toast.error(error)
    if(success) toast.success(success)
  }

  return (
    <button
      type='submit'
      onClick={submitToggleBookmark}
    >
      {
        isBookmarked ? <BookmarkCheck /> : <Bookmark />
      }
    </button>
  )
}

export default ToggleBookmark
