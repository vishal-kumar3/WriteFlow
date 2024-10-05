'use client'

import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { publishFlow, updateDescription, updateTitle } from '@/actions/flow.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { DraftPublishSidebar } from './DraftPublishSidebar'
import { cn } from '@/lib/utils'
import Editor from './NovelEditor/NovelEditor'
import { JSONContent } from 'novel'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { FiEdit } from 'react-icons/fi'


type EditorProps = {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  content?: string | null;
  jsonContent: JSONContent | null;
  thumbnail?: string | null;
  updatedAt: Date;
  tags?: {
    id: string;
    tag: string;
    postsCount: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

type FlowPublishButtonProps = {
  flowId: string
  userId: string
  tags: string[]
  isCommentOff: boolean
  slug: string
}

const RichEditor = ({ id, userId, title, description, jsonContent, thumbnail }: EditorProps) => {
  const [flowTitle, setFlowTitle] = useState(title || '')
  const [flowDescription, setFlowDescription] = useState(description || '')
  const [isSaved, setIsSaved] = useState(true)
  const [infoDialogOpen, setInfoDialogOpen] = useState(true)

  const debounce = useDebouncedCallback(async (userId: string, action: any, content?: string, updateJson?: JSONContent | string) => {
    const { error, success } = await action(id, userId, content, updateJson);

    if (error) return toast.error(error);
    else if (success) {
      setIsSaved(true);
    }
  }, 700);

  const handleTitle = (e: any) => {
    setIsSaved(false)
    setFlowTitle(e.target.value)
    if (e.target.value === '') {
      setIsSaved(true)
      return null;
    }
    debounce(userId, updateTitle, e.target.value)
  }

  const handleDescription = (e: any) => {
    setIsSaved(false)
    setFlowDescription(e.target.value)
    debounce(userId, updateDescription, e.target.value)
  }

  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto'
    element.style.height = `${element.scrollHeight}px`
  }

  useEffect(() => {
    adjustTextareaHeight(document.getElementById('blog-title') as HTMLTextAreaElement)
    adjustTextareaHeight(document.getElementById('blog-description') as HTMLTextAreaElement)
  }, [flowTitle, flowDescription])

  useEffect(() => {
    const titleTextarea = document.getElementById('blog-title') as HTMLTextAreaElement
    const descriptionTextarea = document.getElementById('blog-description') as HTMLTextAreaElement

    if (titleTextarea) adjustTextareaHeight(titleTextarea)
    if (descriptionTextarea) adjustTextareaHeight(descriptionTextarea)
  }, [])


  return (
    <div className='flex flex-col justify-stretch w-full px-2 sm:px-12 border rounded-b-2xl'>
      <div className='relative z-50 h-0 w-full'>
        <InfoCircledIcon onClick={() => setInfoDialogOpen(true)} className='absolute cursor-pointer size-5 right-4 top-5' />
        <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen} defaultOpen>
          <DialogContent style={{ maxWidth: '700px', maxHeight: '90vh' }} >
            <DialogHeader className='flex flex-col gap-4 max-h-[400px] overflow-auto'>
              <DialogTitle>Editor Info</DialogTitle>
              <DialogDescription>
                This is a rich text editor. You can use the toolbar to format your content. Click on the icons to see the options available.
              </DialogDescription>
              <div className='flex flex-col gap-4 mt-4'>
                <DialogHeader>
                  <DialogTitle className='mb-2'>Floating Menu</DialogTitle>
                  <DialogDescription>
                    <video autoPlay loop muted disableRemotePlayback disablePictureInPicture aria-disabled width={'fit-content'} height={400} className='border-2 rounded-md' >
                      <source src='/floatingmenu.mp4' type='video/mp4' />
                    </video>
                  </DialogDescription>
                </DialogHeader>
                <DialogHeader>
                  <DialogTitle>Slash Command</DialogTitle>
                  <DialogDescription>
                    <video autoPlay loop muted disableRemotePlayback disablePictureInPicture aria-disabled width={'fit-content'} height={400} className='border-2 rounded-md' >
                      <source src='/slashcommand.mp4' type='video/mp4' />
                    </video>
                  </DialogDescription>
                </DialogHeader>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <textarea
        id="blog-title"
        className='bg-background outline-none text-left pt-5 pb-2 w-full focus:outline-none text-xl sm:text-4xl font-bold resize-none overflow-hidden'
        onChange={handleTitle}
        value={flowTitle}
        placeholder='Enter the title here!!!'
        rows={1}
      />
      <textarea
        id="blog-description"
        value={flowDescription}
        placeholder='Enter the description here!!!'
        onChange={handleDescription}
        className="bg-background text-left italic outline-none w-full focus:outline-none text-sm sm:text-xl font-normal resize-none overflow-hidden"
        style={{
          height: '30px'
        }}
        rows={1}
      />

      <div className='py-5 mt-4 border-t'>
        <Editor debounce={debounce} setIsSaved={setIsSaved} userId={userId} initialValue={jsonContent!} />
      </div>

      <div className='absolute top-5 sm:right-[120px] left-0 flex justify-between items-center gap-5'>
        <div className='hidden sm:flex flex-row items-center p-2'>
          <FiEdit className='mr-2' />
          <div>
            Edit Mode
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <ThemeToggle />
          <Button className={cn(isSaved ? "text-green-500" : "text-red-500")} variant="ghost">{isSaved ? "Saved!" : "Saving..."}</Button>
          <DraftPublishSidebar title={title} userId={userId} flowId={id} thumbnail={thumbnail!} />
        </div>
      </div>
    </div>
  )
}

export default RichEditor


export const FlowPublishButton = ({ flowId, userId, tags, isCommentOff, slug }: FlowPublishButtonProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Button
      type='submit'
      className='disabled:cursor-wait opacity-90'
      disabled={isLoading}
      onClick={async (e) => {
        setIsLoading(true)
        e.preventDefault()
        const { error, success, data } = await publishFlow(flowId, userId, tags, isCommentOff, slug)
        if (error) toast.error(error)
        else if (success) {
          toast.success(success)
          router.replace(`/blog/${data}`)
        }
        setIsLoading(false)
      }}
    >
      {isLoading ? "Publishing..." : "Publish Flow"}
    </Button>
  )
}
