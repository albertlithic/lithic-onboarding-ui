'use client';

import LithicLogo from './LithicLogo';
import { Phase } from './types';

interface HeaderProps {
  phase: Phase;
  completedSections: number;
  totalSections: number;
  onFinishLater?: () => void;
  onBackToHub?: () => void;
}

export default function Header({ phase, completedSections, totalSections, onFinishLater, onBackToHub }: HeaderProps) {
  const progressPercent = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;
  const phaseLabel = phase === 'phase-1' ? 'Phase 1' : 'Phase 2';

  return (
    <header className="w-full flex items-center justify-between px-8 h-16 bg-[#1A1A1A] border-b border-[#2A2A2A]">
      {/* Left: Logo + Back */}
      <div className="flex items-center gap-3">
        {onBackToHub && (
          <button
            onClick={onBackToHub}
            className="flex items-center gap-1.5 text-[#AAAAAA] text-sm font-medium hover:text-[#F0F0F0] transition-colors mr-2"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="shrink-0">
              <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        )}
        <LithicLogo />
      </div>

      {/* Center: Title */}
      <span
        className="text-[#F0F0F0] text-lg font-medium"
        style={{ fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif" }}
      >
        Onboarding
      </span>

      {/* Right: progress + finish later */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[#7F94FF] text-sm font-medium">{phaseLabel}</span>
          <div className="relative w-[100px] h-[2px] bg-[#444444] rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-[#7F94FF] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[#AAAAAA] text-sm">{completedSections}/{totalSections}</span>
        </div>

        <button
          onClick={onFinishLater}
          className="flex items-center gap-1.5 text-[#AAAAAA] text-sm font-medium hover:text-[#F0F0F0] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path
              d="M7 1H13M13 1V7M13 1L7.5 6.5M6 2H2C1.44772 2 1 2.44772 1 3V12C1 12.5523 1.44772 13 2 13H11C11.5523 13 12 12.5523 12 12V8"
              stroke="#AAAAAA"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Finish Later
        </button>
      </div>
    </header>
  );
}
