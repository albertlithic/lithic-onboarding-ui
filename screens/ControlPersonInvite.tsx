'use client';

import RadioButton from '../RadioButton';
import Button from '../Button';

interface ControlPersonInviteProps {
  choice: 'self' | 'invite' | null;
  onChange: (choice: 'self' | 'invite') => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function ControlPersonInvite({
  choice,
  onChange,
  onBack,
  onContinue,
}: ControlPersonInviteProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[#F0F0F0] text-2xl font-medium"
        style={{ fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif" }}
      >
        Who's the control person?
      </h1>

      <p className="text-[#AAAAAA] text-sm leading-relaxed">
        The control person is an individual with significant responsibility for
        managing the legal entity (e.g., CEO, CFO, COO, Managing Member, General
        Partner, President). This can be an executive, or someone who will have
        program-wide access to the cards that Lithic will provide.
      </p>

      <div className="flex flex-col gap-4">
        <RadioButton
          checked={choice === 'self'}
          onChange={() => onChange('self')}
          label="I will provide the Control Person's information"
        />
        <RadioButton
          checked={choice === 'invite'}
          onChange={() => onChange('invite')}
          label="Invite someone else to provide the Control Person's information"
        />
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" fullWidth onClick={onBack}>
          Go Back
        </Button>
        <Button
          variant="primary"
          fullWidth
          disabled={!choice}
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
