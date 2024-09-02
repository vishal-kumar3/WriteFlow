import React, { forwardRef, useImperativeHandle, useState } from 'react';

interface CommandListProps {
  items: { title: string }[];
  command: (item: any) => void;
}

const CommandList = forwardRef(({ items, command }: CommandListProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    onKeyDown: (props: any) => {
      const { event } = props;

      if (event.key === 'ArrowUp') {
        setSelectedIndex((selectedIndex + items.length - 1) % items.length);
        return true;
      }

      if (event.key === 'ArrowDown') {
        setSelectedIndex((selectedIndex + 1) % items.length);
        return true;
      }

      if (event.key === 'Enter') {
        command(items[selectedIndex]);
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="dropdown-menu">
      {items.length ? (
        items.map((item, index) => (
          <button
            key={index}
            className={`dropdown-button dropdown-item ${index === selectedIndex ? 'is-selected' : ''}`}
            onClick={() => command(item)}
          >
            {item.title}
          </button>
        ))
      ) : (
        <div className="dropdown-item">No results</div>
      )}
    </div>
  );
});

CommandList.displayName = 'CommandList';

export default CommandList;
