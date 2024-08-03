"use client"
import Editor from '@/components/BlogEditor/Editor'
import React, { useEffect, useState } from 'react'

type props = {
  params: {
    draftId: string
  }
}

export const defaultValue = {
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Wow, this editor instance exports its content as JSON."
        }
      ]
    }
  ]
}

const DraftBlog = ({params}: props) => {
  const draftId = params.draftId;
  const [content, setContent] = useState('')

  useEffect(() => {
    console.log(content)
  }, [content, setContent])

  return (
    <div className='mx-auto mt-20'>
      <Editor initialValue={defaultValue} />
    </div>
  )
}

export default DraftBlog
