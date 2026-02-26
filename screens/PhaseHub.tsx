'use client';

import SectionCard from '../components/SectionCard';
import Button from '../components/Button';
import { HubSectionDef } from '../types';

interface PhaseHubProps {
  title: string;
  description: string;
  sections: HubSectionDef[];
  onSectionClick: (sectionId: string) => void;
  onContinue: () => void;
  continueLabel?: string;
}

export default function PhaseHub({
  title,
  description,
  sections,
  onSectionClick,
  onContinue,
  continueLabel = 'Continue',
}: PhaseHubProps) {
  const allComplete = sections.every((s) => s.isComplete);
  const completedCount = sections.filter((s) => s.isComplete).length;

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[var(--fg-strong)] text-2xl font-medium font-display"
        style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
      >
        {title}
      </h1>

      <p className="text-[var(--fg-default)] text-sm leading-relaxed">{description}</p>

      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <SectionCard
            key={section.id}
            title={section.title}
            description={section.description}
            isComplete={section.isComplete}
            onClick={() => onSectionClick(section.id)}
          />
        ))}
      </div>

      <p className="text-[var(--fg-default)] text-xs">
        {completedCount} of {sections.length} sections completed
      </p>

      <Button variant="primary" fullWidth disabled={!allComplete} onClick={onContinue}>
        {continueLabel}
      </Button>
    </div>
  );
}
