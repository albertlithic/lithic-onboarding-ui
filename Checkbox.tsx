'use client';

interface CheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string | React.ReactNode;
}

import React from 'react';

export default function Checkbox({ id, checked, onChange, label }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-start gap-2.5 cursor-pointer group"
    >
      <button
        id={id}
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="shrink-0 mt-0.5 w-4 h-4 rounded flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F94FF]"
        style={{ backgroundColor: checked ? '#3F54BF' : '#222222' }}
        type="button"
      >
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path
              d="M1 3.5L3.5 6L8 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <span className="text-[#F0F0F0] text-sm font-medium leading-relaxed">{label}</span>
    </label>
  );
}
