import { Editor, ReactRenderer } from '@tiptap/react';
import tippy, { Instance as TippyInstance } from 'tippy.js';
import CommandList from './CommandsList';
import React from 'react';

interface CommandListProps {
  items: { title: string }[];
  command: (item: any) => void;
  editor: Editor;
}

const suggestion = {
  items: ({ query }: { query: string }) => {
    return [
      {
        title: 'Heading 1',
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
        },
      },
      {
        title: 'Heading 2',
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
        },
      },
      {
        title: 'Bold',
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).setMark('bold').run();
        },
      },
      {
        title: 'Italic',
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).setMark('italic').run();
        },
      },
    ]
      .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 10);
  },

  render: () => {
    let component: ReactRenderer<React.ForwardRefExoticComponent<CommandListProps>>;
    let popup: TippyInstance[];

    return {
      onStart: (props: CommandListProps & { clientRect: DOMRect }) => {
        component = new ReactRenderer(CommandList as React.ForwardRefExoticComponent<CommandListProps>, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy('body', {
          getReferenceClientRect: () => props.clientRect, // Use a function that returns the DOMRect
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-end',
        });
      },

      onUpdate(props: CommandListProps & { clientRect: DOMRect }) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: () => props.clientRect, // Use a function that returns the DOMRect
        });
      },

      onKeyDown(props: any) {
        const { event } = props;

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter') {
          const commandListRef = component.ref as any;

          if (commandListRef?.onKeyDown) {
            return commandListRef.onKeyDown(props);
          }
        }

        if (event.key === 'Escape') {
          popup[0].hide();
          return true;
        }

        return false;
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};

export default suggestion;
