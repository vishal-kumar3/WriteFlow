import { cn } from '@/lib/utils'
import {
  BubbleMenu,
  Editor,
  FloatingMenu,
} from '@tiptap/react'

type props = {
  editor: Editor | null
}

type BubbleButtonProps = {
  editor: Editor | null
  property: string
  clickEffect: () => void
  icon: string
}

export const BubbleButton = ({editor, property, clickEffect, icon}: BubbleButtonProps) => {
  return (
    <button
      onClick={() => clickEffect()}
      className={cn(editor?.isActive(`${property}`) ? 'bg-gray-200' : '',
      'hover:bg-gray-300 p-2 rounded-md')}
    >
      {icon}
    </button>
  )
}

const holla = [
  'Quote', 'underline', 'code', 'link', 'text-color',


  'Text', 'Heading', 'Bulleted List', 'Numbered List',
]


const FloatingToolbar = ({editor}: props) => {

  const FloatingMenuButton = [
    {
      property: 'bold',
      icon: 'B',
      onclick: () => editor?.chain().focus().toggleBold().run()
    },
    {
      property: 'italic',
      icon: 'I',
      onclick: () => editor?.chain().focus().toggleItalic().run()
    },
    {
      property: 'strike',
      icon: 'S',
      onclick: () => editor?.chain().focus().toggleStrike().run()
    },
    // {
    //   property: 'underline',
    //   icon: 'U',
    //   onclick: () => editor?.chain().focus().toggleUnderline().run()
    // },
    {
      property: 'code',
      icon: '</>',
      onclick: () => editor?.chain().focus().toggleCode().run()
    },
    {
      property: 'heading 1',
      icon: 'H1',
      onclick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run()
    },
    {
      property: 'heading 2',
      icon: 'H2',
      onclick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run()
    },
    // {
    //   property: 'bulletList',
    //   icon: '•',
    //   onclick: () => editor?.chain().focus().toggleBulletList().run()
    // },
    // {
    //   property: 'orderedList',
    //   icon: '1.',
    //   onclick: () => editor?.chain().focus().toggleOrderedList().run()
    // },
    // {
    //   property: 'codeBlock',
    //   icon: '</>',
    //   onclick: () => editor?.chain().focus().toggleCodeBlock().run()
    // },
    // {
    //   property: 'link',
    //   icon: '🔗',
    //   onclick: () => editor?.chain().focus().toggleLink({ href: 'https://www.google.com' }).run()
    // },
    // {
    //   property: 'horizontalRule',
    //   icon: '—',
    //   onclick: () => editor?.chain().focus().setHorizontalRule().run()
    // }
  ]

  return (
    <>
      {editor && <BubbleMenu className="bg-white border-2 border-gray-200 rounded-lg p-2 flex gap-2 shadow-lg" tippyOptions={{ duration: 100 }} editor={editor}>

        {
          FloatingMenuButton.map((button, index) => (
            <BubbleButton
              key={index}
              editor={editor}
              property={button.property}
              clickEffect={button.onclick}
              icon={button.icon}
            />
          ))
        }
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
