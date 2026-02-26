'use client';

import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import { IndustriesData } from '../types';

interface IndustriesProps {
  data: IndustriesData;
  onChange: (data: IndustriesData) => void;
  onSave: () => void;
}

const INDUSTRIES: { key: keyof IndustriesData; label: string }[] = [
  { key: 'cryptocurrencies', label: 'Our program involves cryptocurrencies' },
  { key: 'cbdCannabis', label: 'Our program involves issuing cards to the CBD or cannabis industry' },
  { key: 'gambling', label: 'Our program involves an element of gambling' },
  { key: 'adultEntertainment', label: 'Our program involves adult entertainment' },
  { key: 'firearms', label: 'Our program involves firearms' },
];

export default function Industries({ data, onChange, onSave }: IndustriesProps) {
  const toggle = (key: keyof IndustriesData) => (checked: boolean) =>
    onChange({ ...data, [key]: checked });

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[var(--fg-strong)] text-2xl font-medium font-display"
        style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
      >
        What You're Building
      </h1>

      <p className="text-[var(--fg-default)] text-sm leading-relaxed">
        Which of these apply to your business? If you're unsure, leave them unchecked.
      </p>

      <div className="flex flex-col gap-3">
        {INDUSTRIES.map(({ key, label }) => (
          <Checkbox
            key={key}
            checked={data[key]}
            onChange={toggle(key)}
            label={label}
          />
        ))}
      </div>

      <Button variant="primary" fullWidth onClick={onSave}>
        Save &amp; Return to Checklist
      </Button>
    </div>
  );
}
