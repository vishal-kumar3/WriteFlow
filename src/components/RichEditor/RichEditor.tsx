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


type EditorProps = {
  id: string;
  userId: string;
  title: string;
  description?: string | null; // Make description optional
  content?: string | null; // Make content optional
  jsonContent: JSONContent | null;
  thumbnail?: string | null; // Make thumbnail optional
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

  const debounce = useDebouncedCallback(async (userId: string, action: any, content?: string, updateJson?: JSONContent | string) => {
    const { error, success } = await action(id, userId, content, updateJson);

    if (error) return toast.error(error);
    else if (success) {
      setIsSaved(true);
    }
  }, 1000);

  const handleTitle = (e: any) => {
    setIsSaved(false)
    setFlowTitle(e.target.value)
    if(e.target.value === ''){
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
    const titleTextarea = document.getElementById('blog-title') as HTMLTextAreaElement
    const descriptionTextarea = document.getElementById('blog-description') as HTMLTextAreaElement

    if (titleTextarea) adjustTextareaHeight(titleTextarea)
    if (descriptionTextarea) adjustTextareaHeight(descriptionTextarea)
  }, [])



  return (
    <div className='flex flex-col justify-stretch w-full min-h-[300px]'>
      <textarea
        id="blog-title"
        className='bg-background outline-none text-center py-5 w-full focus:outline-none border-x text-xl sm:text-4xl font-bold px-2 sm:px-20 resize-none overflow-hidden'
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
        className="bg-background text-center italic outline-none w-full focus:outline-none border-x text-sm sm:text-xl font-normal px-2 sm:px-[7.5rem] resize-none overflow-hidden mt-4"
        rows={1}
      />

      {/* <FloatingToolbar editor={editor} />
      <EditorContent editor={editor} /> */}

      <Editor debounce={debounce} setIsSaved={setIsSaved} userId={userId} initialValue={jsonContent!} />

      <div className='absolute top-5 sm:right-[120px] left-0 flex justify-between items-center gap-5'>
        <div className='hidden sm:block bg-slate-100 dark:bg-background p-2 px-6 rounded-md hover:bg-slate-200'>
          Edit Mode
        </div>
        <div className='flex gap-4 items-center'>
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
