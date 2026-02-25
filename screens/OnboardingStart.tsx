'use client';

import Checkbox from '../Checkbox';
import Button from '../Button';

interface OnboardingStartProps {
  agreedToTerms: boolean;
  onAgreementChange: (agreed: boolean) => void;
  onSave: () => void;
}

export default function OnboardingStart({
  agreedToTerms,
  onAgreementChange,
  onSave,
}: OnboardingStartProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[#F0F0F0] text-2xl font-medium"
        style={{ fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif" }}
      >
        Legal &amp; Compliance
      </h1>

      <p className="text-[#AAAAAA] text-sm leading-relaxed">
        Before we begin, please review and agree to the following authorizations.
        This onboarding process will require you to share detailed business
        information. We recommend you have the following ready:
      </p>

      <ul className="text-[#AAAAAA] text-sm leading-relaxed space-y-1 list-disc list-inside">
        <li>Business Information (EIN, physical address, main point of contact)</li>
        <li>Ownership information (owners' info, ownership percentages)</li>
      </ul>

      <Checkbox
        checked={agreedToTerms}
        onChange={onAgreementChange}
        label={
          <span>
            I agree to the{' '}
            <button className="text-[#7F94FF] underline hover:opacity-80 transition-opacity" type="button">
              Card Authorization
            </button>{' '}
            and{' '}
            <button className="text-[#7F94FF] underline hover:opacity-80 transition-opacity" type="button">
              ACH Authorization
            </button>
            .
          </span>
        }
      />

      <Button
        variant="primary"
        fullWidth
        disabled={!agreedToTerms}
        onClick={onSave}
      >
        Save &amp; Return to Checklist
      </Button>
    </div>
  );
}
