'use client';

interface SectionCardProps {
  title: string;
  description: string;
  isComplete: boolean;
  onClick: () => void;
}

export default function SectionCard({ title, description, isComplete, onClick }: SectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-[#222222] rounded p-4 flex items-center gap-4 text-left hover:bg-[#2A2A2A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F94FF]"
    >
      {/* Status indicator */}
      <div className="shrink-0 w-6 h-6 rounded-full border flex items-center justify-center"
        style={{
          borderColor: isComplete ? '#3F54BF' : '#444444',
          backgroundColor: isComplete ? '#3F54BF' : 'transparent',
        }}
      >
        {isComplete && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span
          className="text-[#F0F0F0] text-sm font-semibold block"
          style={{ fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif" }}
        >
          {title}
        </span>
        <span className="text-[#AAAAAA] text-xs mt-0.5 block">{description}</span>
      </div>

      {/* Chevron */}
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="shrink-0">
        <path d="M1 1L7 7L1 13" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
