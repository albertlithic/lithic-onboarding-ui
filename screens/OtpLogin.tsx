'use client';

import { useState } from 'react';
import Button from '../components/Button';

interface OtpLoginProps {
  maskedEmail: string;
  onSubmit: (code: string) => void;
  onResend: () => void;
  onMoreInfo: () => void;
}

export default function OtpLogin({ maskedEmail, onSubmit, onResend }: OtpLoginProps) {
  const [code, setCode] = useState('');

  return (
    <div className="flex flex-col items-center justify-center flex-1 pb-20">
      <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-lg)] shadow-md p-6 w-full max-w-[400px]">
        <div className="flex flex-col gap-6">
          {/* Heading row */}
          <div className="flex items-center gap-4">
            <h1
              className="text-2xl font-medium text-[var(--fg-strong)] flex-1"
              style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
            >
              One-Time Passcode
            </h1>
            <button
              type="button"
              onClick={onResend}
              className="text-sm font-medium text-[var(--accent-fg)] hover:opacity-80"
            >
              Resend Code
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--fg-default)]">
            Enter the code sent to{' '}
            <span className="font-semibold text-[var(--fg-strong)]">{maskedEmail}</span>
          </p>

          {/* Code input */}
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            maxLength={6}
            className="w-full h-10 bg-white border border-[var(--input-border)] text-[var(--input-fg)] text-sm font-medium rounded-[var(--radius-md)] px-4 placeholder:text-[var(--input-placeholder)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-strong-bg)] transition-shadow"
          />

          {/* Continue button */}
          <Button variant="accent" fullWidth onClick={() => onSubmit(code)} disabled={code.length < 6}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
