'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '../ui/button'
import { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { publishFlow, updateContent, updateDescription, updateTitle } from '@/actions/flow.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type EditorProps = {
  id: string
  userId: string
  title: string
  description: string | null
  content: string | null
  coverImage: string | null
  tags: string[]
  updatedAt: Date
}

const RichEditor = ({ id, userId, title, description, content, coverImage, tags, updatedAt } : EditorProps) => {

  const router = useRouter()
  const [flowTitle, setFlowTitle] = useState(title || '')
  const [flowDescription, setFlowDescription] = useState(description || '')
  const [flowContent, setFlowContent] = useState(content || '')

  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: content || "<h2>Let's Keep Your Flow Going!!!</h2>",
    editorProps: {
      attributes: {
        class: "prose-xl mx-auto focus:outline-none rounded-b-xl border-x border-b min-h-[200px] border-input disabled:cursor-not-allowed disabled:opacity-50"
      }
    },
    onUpdate({ editor }){
      debounce(editor.getHTML(), userId, updateContent)
    },
    immediatelyRender: false
  })

  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.innerHTML = flowTitle;
    }
  }, [flowTitle]);

  const debounce = useDebouncedCallback(async (update: string, userId: string, action: any) => {
    if(update === '' || !update) return
    const { error, success } = await action(id, userId, update)

    if(error) return toast.error(error)
    else if(success) return toast.success(success)
  }, 1000)

  const handleTitle = (e: any) => {
    console.log(e.target.innerHTML)
    setFlowTitle(e.target.innerHTML)
    debounce(e.target.innerHTML, userId, updateTitle)
  }

  const handleDescription = (e: any) => {
    setFlowDescription(e.target.innerHTML)
    debounce(e.target.innerHTML, userId, updateDescription)
  }



  return (
    <div className='flex flex-col justify-stretch w-full min-h-[300px]'>
      {/* //TODO: contentEditable ko sahi krna h !!! */}
      <p
        contentEditable
        dangerouslySetInnerHTML={{ __html: flowTitle || "Here Is The Title!!!" }}
        ref={titleRef}
        onInput={handleTitle}
        className="text-center pb-2 w-full focus:outline-none border-x text-6xl font-bold px-20"
      />
      <q
        contentEditable
        dangerouslySetInnerHTML={{ __html: flowDescription || 'Write Description Here!!!' }}
        onInput={handleDescription}
        className="text-center pb-4 w-full focus:outline-none border-x text-2xl font-normal px-[7.5rem]"
      />
      <EditorContent editor={editor} />
      <Button
        className='w-[25%] mt-5'
        type='submit'
        onClick={async() => {
          const { error, success } = await publishFlow(id, userId)
          if(error) toast.error(error)
          else if(success) {
            toast.success(success)
            router.replace(`/blog/${id}`)
          }
        }}
      >
        Publish (Isko header me rkhna h)
      </Button>
    </div>
  )
}

export default RichEditor
