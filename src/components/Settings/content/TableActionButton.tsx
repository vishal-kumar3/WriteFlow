"use client"
import { deleteFlow } from '@/actions/flow.action'
import { editFlow } from '@/actions/settings.action'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { column } from './content'

type props = {
  row: Row<column>
}

const TableActionButton = ({row}: props) => {
  const flow = row.original
  const router = useRouter()

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeletePending, setIsDeletePending] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST}/blog/${!flow.isPublished ? 'draft/' : ''}${flow.id}`)}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={async () => {
            const { error, success } = await editFlow(flow.id, flow.isPublished!)

            if (error) {
              toast.error(error)
            } else {
              toast.success(success)
              router.push(`/blog/draft/${flow.id}`)
            }
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={(e) => {
            e.preventDefault()
            setIsDeleteOpen(true)
          }}
        >
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer'
        >
          <Link className='w-full' href={`/blog/${!flow.isPublished ? 'draft/' : ''}${flow.id}`}>View</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action will delete the flow permanently. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={async () => {
              setIsDeletePending(true)
              const { error, success } = await deleteFlow(flow.id)

              if (error) {
                toast.error(error)
              } else {
                toast.success(success)
                setIsDeleteOpen(false)
              }
              setIsDeletePending(false)
            }}>
              {
                isDeletePending ? "Deleting..." : "Delete"
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  )
}

export default TableActionButton
