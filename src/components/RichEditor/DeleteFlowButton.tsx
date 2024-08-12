import React from 'react'
import { Button } from '../ui/button'
import { deleteFlow } from '@/actions/flow.action'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

type props = {}

const DeleteFlowButton = ({flowId, userId}: {flowId: string, userId: string}) => {
  return (
    <form action={async() => {
      const {error, success} = await deleteFlow(flowId)

      if(error) return toast.error(error)
      if(success) {
        toast.success(success)
        redirect(`/user/${userId}`)
      }
    }}>
      <Button
        variant="destructive"
        className='text-black dark:text-white'
      >
        Delete
      </Button>
    </form>
  )
}

export default DeleteFlowButton
