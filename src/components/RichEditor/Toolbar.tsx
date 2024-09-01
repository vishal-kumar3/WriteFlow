import { type Editor } from '@tiptap/react'
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
} from "lucide-react"
import { Toggle } from '../ui/toggle'

type props = {
  editor: Editor | null
}

const Toolbar = ({editor}: props) => {
  if(!editor) return null
  return (
    <div>
      Toolbar
    </div>
  )
}

export default Toolbar
