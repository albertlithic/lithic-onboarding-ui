'use client';

import LithicLogo from '../components/LithicLogo';

interface SidebarProps {
  completedSteps: number;
  totalSteps: number;
  userEmail?: string;
}

const navItems = [
  'Overview',
  'Account Holders',
  'Cards',
  'Transactions',
  'Rules',
  'Disputes',
  'Payments',
  'Program Settings',
];

export default function Sidebar({ completedSteps, totalSteps, userEmail }: SidebarProps) {
  return (
    <aside className="w-60 h-screen fixed top-0 left-0 flex flex-col bg-[var(--bg-default)] border-r border-[var(--border-default)]">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5">
        <LithicLogo className="text-[var(--fg-strong)]" />
        <span className="font-display text-sm font-semibold text-[var(--fg-strong)]">Lithic</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {/* Onboarding - active item */}
        <button
          type="button"
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-[var(--fg-strong)] bg-[var(--bg-strong)] rounded-[var(--radius-md)]"
        >
          <div className="flex items-center gap-2">
            {/* Arrow-right icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
              <path
                d="M1 7H13M13 7L8 2M13 7L8 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Onboarding
          </div>
          <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium text-[var(--fg-default)] bg-[var(--bg-default)] rounded-full">
            {completedSteps}/{totalSteps}
          </span>
        </button>

        {/* Decorative / disabled nav items */}
        {navItems.map((item) => (
          <div
            key={item}
            className="flex items-center px-3 py-2 text-sm text-[var(--fg-default)] opacity-60 cursor-default select-none"
          >
            {item}
          </div>
        ))}
      </nav>

      {/* Spacer is handled by flex-1 on nav */}

      {/* Bottom links */}
      <div className="px-3 pb-2 space-y-0.5">
        <div className="flex items-center px-3 py-2 text-sm text-[var(--fg-default)] cursor-default">
          Support
        </div>
        <div className="flex items-center px-3 py-2 text-sm text-[var(--fg-default)] cursor-default">
          Documentation
        </div>
        <div className="flex items-center justify-between px-3 py-2 text-sm text-[var(--fg-default)] cursor-default">
          <span>Sandbox Mode</span>
          {/* Green toggle */}
          <span className="inline-flex items-center justify-center w-8 h-[18px] rounded-full bg-green-500">
            <span className="w-3.5 h-3.5 rounded-full bg-white translate-x-[7px]" />
          </span>
        </div>
      </div>

      {/* User section */}
      <div className="border-t border-[var(--border-default)] px-3 py-3">
        <button
          type="button"
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--fg-default)] rounded-[var(--radius-md)] hover:bg-[var(--bg-strong)] transition-colors"
        >
          {/* Person icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M2 14C2 11.2386 4.23858 9 7 9H9C11.7614 9 14 11.2386 14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="flex-1 truncate text-left">
            {userEmail || 'user@example.com'}
          </span>
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
      </div>
    </aside>
  );
}
