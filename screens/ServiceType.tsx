'use client';

import RadioButton from '../RadioButton';
import Button from '../Button';
import { ServiceType as ServiceTypeValue } from '../types';

interface ServiceTypeProps {
  value: ServiceTypeValue | null;
  onChange: (value: ServiceTypeValue) => void;
  onSave: () => void;
}

const OPTIONS: { value: ServiceTypeValue; label: string; description: string }[] = [
  {
    value: 'pm',
    label: 'Program Managed',
    description: 'Lithic manages your card program end-to-end, including compliance, funding, and card operations.',
  },
  {
    value: 'po',
    label: 'Processor Only',
    description: 'You manage your own card program and use Lithic as your payment processor for transaction authorization and settlement.',
  },
];

export default function ServiceType({ value, onChange, onSave }: ServiceTypeProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[#F0F0F0] text-2xl font-medium"
        style={{ fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif" }}
      >
        How will you use Lithic?
      </h1>

      <p className="text-[#AAAAAA] text-sm leading-relaxed">
        Select the service model that best describes how you plan to work with Lithic.
      </p>

      <div className="flex flex-col gap-4">
        {OPTIONS.map((opt) => (
          <div
            key={opt.value}
            className="bg-[#222222] rounded p-4 flex flex-col gap-2 cursor-pointer hover:bg-[#2A2A2A] transition-colors"
            onClick={() => onChange(opt.value)}
          >
            <RadioButton
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              label={opt.label}
            />
            <p className="text-[#AAAAAA] text-sm leading-relaxed ml-[26px]">
              {opt.description}
            </p>
          </div>
        ))}
      </div>

      <Button variant="primary" fullWidth disabled={!value} onClick={onSave}>
        Save &amp; Return to Checklist
      </Button>
    </div>
  );
}
