'use client'

import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '../ui/button'
import { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { publishFlow, updateContent, updateDescription, updateTitle } from '@/actions/flow.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { DraftPublishSidebar } from './DraftPublishSidebar'
import { cn } from '@/lib/utils'
import commands from './SlashCommand/commands'
import suggestion from './SlashCommand/suggestion'


import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import handleDrop from './HandleDrop/HandleDrop'
import FloatingToolbar from './FloatingMenu/FloatingToolbar'


type EditorProps = {
  id: string
  userId: string
  title: string
  description: string | null
  content: string | null
  thumbnail: string | null
  coverImage: string | null
  tags: { tag: string }[]
  updatedAt: Date
}

type FlowPublishButtonProps = {
  flowId: string
  userId: string
  tags: string[]
  isCommentOff: boolean
  slug: string
}

const RichEditor = ({ id, userId, title, description, content, coverImage, tags, thumbnail, updatedAt }: EditorProps) => {

  const [flowTitle, setFlowTitle] = useState(title || '')
  const [flowDescription, setFlowDescription] = useState(description || '')
  const [isSaved, setIsSaved] = useState(true)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Dropcursor,
      Image,
      commands.configure({
        suggestion,
      }),
    ],
    content: content || "<h2>Let's Keep Your Flow Going!!!</h2>",
    editorProps: {
      attributes: {
        class: "prose-xl mx-auto focus:outline-none rounded-b-xl border-x border-b min-h-[200px] border-input disabled:cursor-not-allowed disabled:opacity-50"
      },
      handleDrop: ( view, event, slice, moved ) => handleDrop({ view, event, slice, moved })
    },
    onUpdate({ editor }) {
      setIsSaved(false)
      debounce(editor.getHTML(), userId, updateContent)
    },
    immediatelyRender: false
  })

  const debounce = useDebouncedCallback(async (update: string, userId: string, action: any) => {
    if (update === '' || !update) return
    const { error, success } = await action(id, userId, update)

    if (error) return toast.error(error)
    else if (success) {
      setIsSaved(true)
      return toast.success(success)
    }
  }, 1000)

  const handleTitle = (e: any) => {
    setIsSaved(false)
    setFlowTitle(e.target.value)
    debounce(e.target.value, userId, updateTitle)
  }

  const handleDescription = (e: any) => {
    setIsSaved(false)
    setFlowDescription(e.target.value)
    debounce(e.target.value, userId, updateDescription)
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
        value={flowTitle || 'Enter Your Title Here!!!'}
      />
      <textarea
        value={flowDescription || 'Write Description Here!!!'}
        onChange={handleDescription}
        className="bg-background text-center italic outline-none pb-16 w-full focus:outline-none border-x text-2xl font-normal px-[7.5rem] resize-none"
      />


      <FloatingToolbar editor={editor} />


      <EditorContent editor={editor} />
      <div className='absolute top-5 right-0 flex items-center'>
      </div>
      <div className='absolute top-5 right-0 w-full flex justify-between items-center gap-5'>
        <div className='bg-slate-100 dark:bg-background p-2 px-6 rounded-md hover:bg-slate-200'>
          Edit Mode
        </div>
        <div className='space-x-3'>
          <Button className={cn(isSaved ? "text-green-500" : "text-red-500")} variant="ghost">{isSaved ? "Saved!" : "Saving..."}</Button>
          <DraftPublishSidebar title={title} userId={userId} flowId={id} thumbnail={thumbnail} />
        </div>
      </div>
    </div>
  )
}

export default RichEditor


export const FlowPublishButton = ({ flowId, userId, tags, isCommentOff, slug }: FlowPublishButtonProps) => {
  const router = useRouter()
  return (
    <Button
      className=''
      type='submit'
      onClick={async (e) => {
        e.preventDefault()
        const { error, success, data } = await publishFlow(flowId, userId, tags, isCommentOff, slug)
        if (error) toast.error(error)
        else if (success) {
          toast.success(success)
          router.replace(`/blog/${data}`)
        }
      }}
    >
      Publish
    </Button>
  )
}
