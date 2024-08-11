import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';
import CommandList from './CommandsList';

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
    let component: ReactRenderer<typeof CommandList>;
    let popup: any;

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(CommandList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        });
      },

      onUpdate(props: any) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: any) {
        const { event } = props;

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter') {
          // Ensure component.ref is defined and has the onKeyDown method
          const commandListRef = component.ref as any;
          console.log('commandListRef', commandListRef);

          if (commandListRef?.onKeyDown) {
            console.log('commandListRef.onKeyDown', commandListRef.onKeyDown);
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
