'use client'

import { Button } from '../ui/button'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { publishFlow, updateDescription, updateTitle } from '@/actions/flow.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { DraftPublishSidebar } from './DraftPublishSidebar'
import { cn } from '@/lib/utils'


import Document from '@tiptap/extension-document'
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

const CustomDocument = Document.extend({
  content: 'heading block*',
})

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
    debounce(userId, updateTitle, e.target.value)
  }

  const handleDescription = (e: any) => {
    setIsSaved(false)
    setFlowDescription(e.target.value)
    debounce(userId, updateDescription, e.target.value)
  }

  // const addImage = () => {
  //   const url = window.prompt('URL')

  //   if (url) {
  //     editor?.chain().focus().setImage({ src: url }).run()
  //   }
  // }


  return (
    <div className='flex flex-col justify-stretch w-full min-h-[300px]'>
      {/* //TODO: contentEditable ko sahi krna h !!! */}
      {/* <p
        contentEditable
        dangerouslySetInnerHTML={{ __html: flowTitle || "Here Is The Title!!!" }}
        onInput={handleTitle}
        className="text-center py-5 pb-8 w-full focus:outline-none border-x text-6xl font-bold px-20"
      /> */}
      <textarea
        className='bg-background outline-none text-center py-5 pb-8 w-full focus:outline-none border-x text-6xl font-bold px-20 resize-none'
        onChange={handleTitle}
        value={flowTitle || ''}
        placeholder='Enter the title here!!!'
      />
      <textarea
        value={flowDescription || ''}
        placeholder='Enter the description here!!!'
        onChange={handleDescription}
        className="bg-background text-center italic outline-none pb-16 w-full focus:outline-none border-x text-2xl font-normal px-[7.5rem] resize-none"
      />

      {/* <FloatingToolbar editor={editor} />
      <EditorContent editor={editor} /> */}

      <Editor debounce={debounce} setIsSaved={setIsSaved} userId={userId} initialValue={jsonContent!} />

      <div className='absolute top-5 right-[100px] w-full flex justify-between items-center gap-5'>
        <div className='bg-slate-100 dark:bg-background p-2 px-6 rounded-md hover:bg-slate-200'>
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
