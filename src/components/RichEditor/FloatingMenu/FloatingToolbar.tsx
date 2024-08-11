import { cn } from '@/lib/utils'
import {
  BubbleMenu,
  Editor,
  FloatingMenu,
} from '@tiptap/react'

type props = {
  editor: Editor | null
}

const FloatingToolbar = ({editor}: props) => {
  return (
    <>
      {editor && <BubbleMenu className="bg-white border-2 border-gray-200 rounded-lg p-2 flex gap-2 shadow-lg" tippyOptions={{ duration: 100 }} editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(editor.isActive('bold') ? 'bg-gray-200' : '',
          'hover:bg-gray-300 p-2 rounded-md')}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          Strike
        </button>
      </BubbleMenu>}

      {/* {editor && <FloatingMenu className="flex bg-white border-2 shadow-lg p-2 rounded-md" tippyOptions={{ duration: 100 }} editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet list
        </button>
      </FloatingMenu>} */}
    </>
  )
}

export default FloatingToolbar
