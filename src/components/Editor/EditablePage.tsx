import React, { useState } from 'react'

type props = {}

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

const initialBlock = { id: uid(), html: '', tag: 'p'}

const EditablePage = (props: props) => {

  const [blocks, setBlocks] = useState([initialBlock])

  return (
    <div>
      {
        blocks.map((block, key) => (
          <div key={key} id={block.id}>
            Tag: {block.tag}, Content: {block.html}
          </div>
        ))
      }
    </div>
  )
}

export default EditablePage