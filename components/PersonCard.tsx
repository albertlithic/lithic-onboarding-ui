'use client';

import { useState, useEffect, useRef } from 'react';
import Badge from './Badge';

interface PersonCardProps {
  name: string;
  email: string;
  status: 'pending' | 'invited' | 'completed' | 'submitted';
  onEdit: () => void;
  onResendInvite?: () => void;
  onRemove: () => void;
}

const statusConfig: Record<
  PersonCardProps['status'],
  { label: string; variant: 'accent' | 'neutral' | 'success' }
> = {
  submitted: { label: 'Submitted', variant: 'success' },
  completed: { label: 'Submitted', variant: 'success' },
  invited: { label: 'Invite Sent', variant: 'accent' },
  pending: { label: 'Pending', variant: 'neutral' },
};

export default function PersonCard({
  name,
  email,
  status,
  onEdit,
  onResendInvite,
  onRemove,
}: PersonCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const { label: statusLabel, variant: statusVariant } = statusConfig[status];

  return (
    <div className="flex items-center justify-between bg-white border border-[var(--border-default)] rounded-[var(--radius-md)] px-4 py-3">
      {/* Left: Name + Email */}
      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--fg-strong)] truncate">{name}</p>
        <p className="text-xs text-[var(--fg-default)] truncate">{email}</p>
      </div>

      {/* Right: Badge + Menu */}
      <div className="flex items-center gap-3 shrink-0">
        <Badge variant={statusVariant}>{statusLabel}</Badge>

        {/* Three-dot menu */}
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center justify-center w-8 h-8 text-[var(--fg-default)] hover:bg-[var(--bg-strong)] rounded-[var(--radius-sm)] transition-colors"
            aria-label="More actions"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="3" r="1.25" fill="currentColor" />
              <circle cx="8" cy="8" r="1.25" fill="currentColor" />
              <circle cx="8" cy="13" r="1.25" fill="currentColor" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 min-w-[160px] bg-white border border-[var(--border-default)] rounded-[var(--radius-md)] shadow-lg z-10 py-1">
              <button
                type="button"
                onClick={() => {
                  onEdit();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-[var(--fg-strong)] hover:bg-[var(--bg-strong)] transition-colors"
              >
                Edit Details
              </button>
              {status === 'invited' && onResendInvite && (
                <button
                  type="button"
                  onClick={() => {
                    onResendInvite();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-[var(--fg-strong)] hover:bg-[var(--bg-strong)] transition-colors"
                >
                  Resend Invite
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onRemove();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-[var(--bg-strong)] transition-colors"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
