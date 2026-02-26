'use client';

import { ReactNode } from 'react';

interface InfoBannerProps {
  children: ReactNode;
  onDismiss?: () => void;
}

export default function InfoBanner({ children, onDismiss }: InfoBannerProps) {
  return (
    <div className="flex items-start gap-3 bg-[var(--accent-bg)] border border-[var(--accent-border)] rounded-[var(--radius-md)] p-4">
      <div className="flex-1 text-sm text-[var(--accent-fg)]">{children}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-[var(--accent-fg)] hover:opacity-70 transition-opacity"
          aria-label="Dismiss"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 3L11 11M11 3L3 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
