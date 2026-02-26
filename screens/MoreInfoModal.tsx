'use client';

import LithicLogo from '../components/LithicLogo';

interface MoreInfoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function MoreInfoModal({ open, onClose }: MoreInfoModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Dark branded card */}
      <div
        className="relative bg-[#222] rounded-[var(--radius-lg)] shadow-lg overflow-hidden w-full max-w-[800px]"
        style={{ minHeight: '400px' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/70 hover:text-white"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative z-10 flex flex-col gap-12 p-12 max-w-[320px]">
          {/* Lithic logo (white) */}
          <LithicLogo className="text-white" />

          {/* Tagline */}
          <h1
            className="text-[32px] font-medium text-white tracking-tight leading-[1.2]"
            style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
          >
            Rock solid issuing for
            <br />
            breakthrough products
          </h1>

          {/* Description */}
          <div className="flex flex-col gap-2 text-sm text-white leading-relaxed">
            <p>
              Lithic is a payments platform that allows businesses to build quickly, launch easily,
              and scale confidently. It's designed for developers and trusted by banks.
            </p>
            <p>
              To onboard your business onto our platform, we require details of key individuals like
              a Control Person and Ultimate Beneficial Owners to provide to partner banks, and to
              comply with government regulations. Your teammate has requested that you provide your
              details as part of that onboarding.
            </p>
          </div>
        </div>

        {/* Decorative card image area (gradient overlay) */}
        <div
          className="absolute top-0 right-0 bottom-0 w-[60%] opacity-30"
          style={{
            background: 'linear-gradient(135deg, transparent 20%, #333 50%, #444 100%)',
          }}
        />
      </div>
    </div>
  );
}
