import React from 'react'
import { Button } from '../ui/button'
import { deleteFlow } from '@/actions/flow.action'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import { cn } from '@/lib/utils'

type props = {}

const DeleteFlowButton = ({flowId, userId, redirectMode}: {flowId: string, userId: string, redirectMode: boolean}) => {
  return (
    <form action={async() => {
      "use server"
      const {error, success} = await deleteFlow(flowId)

      if(error) return toast.error(error)
      if(success) {
        if(!redirectMode) {
          redirect(`/user/${userId}`)
        }
      }
    }}>
      <Button
        variant="destructive"
        className={cn('text-black dark:text-white', redirectMode ? 'w-full' : '')}
      >
        Delete
      </Button>
    </form>
  )
}

export default DeleteFlowButton
