'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  variant: 'accent' | 'neutral' | 'success';
  children: ReactNode;
}

const variantClasses: Record<BadgeProps['variant'], string> = {
  accent: 'bg-[var(--accent-bg)] text-[var(--accent-fg)] border border-[var(--accent-border)]',
  neutral: 'bg-[var(--bg-strong)] text-[var(--fg-default)]',
  success: 'bg-[var(--success-bg)] text-white',
};

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-[var(--radius-sm)] ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
