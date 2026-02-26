'use client';

import { useState, useEffect, useRef } from 'react';

interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface DropdownButtonProps {
  label: string;
  options: DropdownOption[];
}

export default function DropdownButton({ label, options }: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 h-9 px-3 text-sm font-medium text-[var(--accent-fg)] bg-[var(--accent-bg)] border border-[var(--accent-border)] rounded-[var(--radius-md)] hover:opacity-90 transition-opacity"
      >
        {label}
        {/* Caret-down icon */}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="shrink-0">
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 min-w-[180px] bg-white border border-[var(--border-default)] rounded-[var(--radius-md)] shadow-lg z-10 py-1">
          {options.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-[var(--fg-strong)] hover:bg-[var(--bg-strong)] transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
