'use client';

interface OnboardingHeaderProps {
  phase: 'phase-1' | 'phase-2';
  completedSections: number;
  totalSections: number;
  onLeave: () => void;
  leaveLabel?: string;
}

export default function OnboardingHeader({
  phase,
  completedSections,
  totalSections,
  onLeave,
  leaveLabel,
}: OnboardingHeaderProps) {
  const phaseLabel = phase === 'phase-1' ? 'Phase 1' : 'Phase 2';
  const pct = totalSections > 0 ? `${(completedSections / totalSections) * 100}%` : '0%';

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-[var(--bg-canvas)] border-b border-[var(--border-default)]">
      <h2 className="font-display text-lg font-medium text-[var(--fg-strong)]">Onboarding</h2>
      <div className="flex items-center gap-4">
        <span className="text-xs text-[var(--fg-default)]">{phaseLabel}</span>
        <div className="w-24 h-1.5 bg-[var(--bg-strong)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent-strong-bg)] rounded-full transition-all duration-300"
            style={{ width: pct }}
          />
        </div>
        <span className="text-xs text-[var(--fg-default)]">
          {completedSections}/{totalSections}
        </span>
        <button
          type="button"
          onClick={onLeave}
          className="h-8 px-3 text-sm font-medium text-[var(--fg-default)] border border-[var(--border-muted)] rounded-[var(--radius-md)] hover:bg-[var(--bg-canvas)] transition-colors"
        >
          {leaveLabel || 'Leave Onboarding Step'}
        </button>
      </div>
    </header>
  );
}
