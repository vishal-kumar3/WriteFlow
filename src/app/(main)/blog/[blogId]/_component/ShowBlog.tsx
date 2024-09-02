// Import the correct JSONContent type from @tiptap/core
"use client"
import { JSONContent as TipTapJSONContent } from '@tiptap/core';
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './prosemirror.css'

// Use TipTapJSONContent in your code
type ShowBlogProps = {
  jsonContent: TipTapJSONContent | null;
};

// Adjust ShowBlog component
const ShowBlog = ({ jsonContent }: ShowBlogProps) => {
  // Provide default content if jsonContent is null
  const editorContent: TipTapJSONContent = jsonContent || { type: 'doc', content: [] };

  const editor = new Editor({
    extensions: [StarterKit],
    content: editorContent,
  });

  return (
    <div className='ProseMirror' dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
  );
};

export default ShowBlog;
