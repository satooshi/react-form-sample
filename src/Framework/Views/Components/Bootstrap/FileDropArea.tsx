import { debuglog } from 'Utils';
import React from 'react';

export interface Props {
  children?: React.ReactNode;
  error?: string;
  id: string;
  onDrop: (file: File) => void;
}

/** Single file drop area */
export const FileDropArea: React.FC<Props> = React.memo(
  ({ error, id, onDrop, children }) => {
    debuglog('render FileDropArea', { error, id });

    const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };

    const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };

    const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
      e.stopPropagation();
      e.preventDefault();

      const { files } = e.dataTransfer;

      onDrop(files[0]);
    };

    return (
      <div
        id={id}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {children}
      </div>
    );
  }
);
