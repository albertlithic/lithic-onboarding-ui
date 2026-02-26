'use client';

import { useRef } from 'react';

interface FileUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
}

export default function FileUpload({ value, onChange, accept }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onChange(file);
  };

  return (
    <div
      className="w-full h-10 bg-white rounded flex items-center justify-center cursor-pointer hover:bg-[var(--bg-canvas)] transition-colors border border-dashed border-[var(--border-default)] hover:border-[var(--accent-strong-bg)]"
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      {value ? (
        <div className="flex items-center gap-2 px-3 w-full">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L5 9M12 2L9 5M5 9L9 5M5 9C4 10 2.5 10 1.5 9C0.5 8 0.5 6.5 1.5 5.5L5 2C6 1 7.5 1 8.5 2C9.5 3 9.5 4.5 8.5 5.5L5 9Z" stroke="var(--accent-strong-bg)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-[var(--fg-strong)] text-sm font-medium truncate">{value.name}</span>
          <button
            type="button"
            className="ml-auto shrink-0 text-[var(--fg-default)] hover:text-[var(--fg-strong)]"
            onClick={(e) => { e.stopPropagation(); onChange(null); }}
          >
            ×
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-[var(--fg-default)]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-sm font-medium">Click to browse or drag files</span>
        </div>
      )}
    </div>
  );
}
