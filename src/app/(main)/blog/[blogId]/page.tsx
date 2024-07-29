"use client"
import Editor from '@/components/BlogEditor/Editor'
import React, { useEffect, useState } from 'react'

type props = {}

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

const page = (props: props) => {

  const [content, setContent] = useState('')

  useEffect(() => {
    console.log(content)
  }, [content, setContent])

  return (
    <div className='mx-auto mt-20'>
      <Editor initialValue={defaultValue} onChange={setContent} />
    </div>
  )
}

export default page