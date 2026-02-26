'use client';

import LithicLogo from '../components/LithicLogo';

interface MagicLinkHeaderProps {
  onMoreInfo: () => void;
}

export default function MagicLinkHeader({ onMoreInfo }: MagicLinkHeaderProps) {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-[var(--bg-canvas)] border-b border-[var(--border-default)]">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <LithicLogo className="text-[var(--fg-strong)]" />
        <span className="font-display text-sm font-semibold text-[var(--fg-strong)]">Lithic</span>
      </div>

      {/* Right: More Information button */}
      <button
        type="button"
        onClick={onMoreInfo}
        className="inline-flex items-center gap-1.5 h-8 px-3 text-sm font-medium text-[var(--accent-fg)] bg-transparent hover:bg-[var(--accent-bg)] rounded-[var(--radius-md)] transition-colors"
      >
        {/* Info icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 7V11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="8" cy="5" r="0.75" fill="currentColor" />
        </svg>
        More Information
      </button>
    </header>
  );
}
