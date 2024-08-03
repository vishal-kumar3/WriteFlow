"use client"
import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import { createFlow } from '@/actions/flow.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type props = {}

const CreateFlowForm = (props: props) => {
  const router = useRouter()

  return (
    <form action={async(formData: FormData) => {
      const {error, success, id} = await createFlow(formData)

      if(error){
        toast.error(error)
      }else {
        router.push(`/blog/draft/${id}`)
        toast.success(success)
      }
    }}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            name='title'
            placeholder="Enter title"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Create Flow</Button>
      </DialogFooter>
    </form>
  )
}

export default CreateFlowForm
