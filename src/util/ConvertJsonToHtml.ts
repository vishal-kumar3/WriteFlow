
import { Editor } from "@tiptap/react"; // Import TipTap or similar library

// Define JSONContent type or interface if not already defined
type JSONContent = {
  type: string;
  content: Array<any>;
  [key: string]: any;
};

export const convertJsonToHtml = (json: any): string => {
  if (!json) return '';

  // Check if json is a string or already in the expected format
  if (typeof json === 'string') {
    return json; // If it's already HTML, return as is
  }

  // Assuming JSONContent structure
  const content = json as JSONContent;

  // Initialize editor with content
  const editor = new Editor({
    content: content,
  });

  return editor.getHTML();
}
