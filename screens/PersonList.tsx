'use client';

import { useState } from 'react';
import FormField from '../components/FormField';
import Input from '../components/Input';
import Button from '../components/Button';
import { PersonData, PersonRole, createEmptyPerson } from '../types';

interface PersonListProps {
  role: PersonRole;
  persons: PersonData[];
  onChange: (persons: PersonData[]) => void;
  onEditPerson: (personId: string) => void;
  onSave: () => void;
}

const ROLE_CONFIG: Record<PersonRole, { title: string; description: string; singularLabel: string; maxCount?: number }> = {
  'control-person': {
    title: 'Control Persons',
    description: 'A control person is an individual with significant responsibility for managing the legal entity (e.g., CEO, CFO, COO, Managing Member, General Partner, President).',
    singularLabel: 'Control Person',
  },
  'beneficial-owner': {
    title: 'Beneficial Owners',
    description: 'Please list all beneficial owners with at least 25% direct or indirect ownership of your company.',
    singularLabel: 'Beneficial Owner',
  },
  'authorized-signer': {
    title: 'Authorized Signer',
    description: 'Identify the individual authorized to sign agreements on behalf of the company.',
    singularLabel: 'Authorized Signer',
    maxCount: 1,
  },
};

function PersonCard({
  person,
  index,
  roleLabel,
  onEdit,
  onRemove,
  onInvite,
}: {
  person: PersonData;
  index: number;
  roleLabel: string;
  onEdit: () => void;
  onRemove: () => void;
  onInvite: (email: string) => void;
}) {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState(person.inviteEmail || '');

  const displayName = person.firstName
    ? `${person.firstName} ${person.lastName}`.trim()
    : roleLabel;

  const statusColor = person.status === 'completed' ? 'var(--accent-strong-bg)' : person.status === 'invited' ? 'var(--accent-strong-bg)' : 'var(--border-default)';
  const statusLabel = person.status === 'completed' ? 'Complete' : person.status === 'invited' ? 'Invited' : 'Pending';

  return (
    <div className="bg-[var(--bg-default)] rounded p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-[var(--primary-bg)] flex items-center justify-center text-[var(--fg-default)] text-sm font-medium">
            {index + 1}
          </span>
          <span
            className="text-[var(--fg-strong)] text-sm font-medium font-display"
            style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
          >
            {displayName}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium" style={{ color: statusColor }}>{statusLabel}</span>
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 text-[var(--fg-default)] text-xs hover:text-[var(--fg-strong)] transition-colors"
          >
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path d="M1 3H11M4 3V2H8V3M2 3L2.8 12.1C2.9 12.6 3.3 13 3.8 13H8.2C8.7 13 9.1 12.6 9.2 12.1L10 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Remove
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" fullWidth onClick={onEdit}>
          {person.status === 'completed' ? 'Edit Details' : 'Fill In Details'}
        </Button>
        <Button
          variant="ghost"
          fullWidth
          onClick={() => setShowInvite(!showInvite)}
        >
          {person.status === 'invited' ? 'Resend Invite' : 'Send Invite'}
        </Button>
      </div>

      {showInvite && (
        <div className="flex gap-2">
          <Input
            placeholder="email@example.com"
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <Button
            variant="primary"
            onClick={() => {
              onInvite(inviteEmail);
              setShowInvite(false);
            }}
            disabled={!inviteEmail}
          >
            Send
          </Button>
        </div>
      )}
    </div>
  );
}

export default function PersonList({ role, persons, onChange, onEditPerson, onSave }: PersonListProps) {
  const config = ROLE_CONFIG[role];
  const rolePersons = persons.filter((p) => p.role === role);
  const canAdd = !config.maxCount || rolePersons.length < config.maxCount;

  const addPerson = () => {
    const newPerson = createEmptyPerson(role);
    onChange([...persons, newPerson]);
  };

  const removePerson = (id: string) => {
    onChange(persons.filter((p) => p.id !== id));
  };

  const invitePerson = (id: string, email: string) => {
    onChange(
      persons.map((p) =>
        p.id === id ? { ...p, inviteEmail: email, status: 'invited' as const } : p
      )
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[var(--fg-strong)] text-2xl font-medium font-display"
        style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
      >
        {config.title}
      </h1>

      <p className="text-[var(--fg-default)] text-sm leading-relaxed">
        {config.description}
      </p>

      <p className="text-[var(--fg-default)] text-xs leading-relaxed">
        We collect this information to comply with federal regulations. Your data is encrypted and securely stored.
      </p>

      {rolePersons.length > 0 && (
        <div className="flex flex-col gap-3">
          {rolePersons.map((person, i) => (
            <PersonCard
              key={person.id}
              person={person}
              index={i}
              roleLabel={config.singularLabel}
              onEdit={() => onEditPerson(person.id)}
              onRemove={() => removePerson(person.id)}
              onInvite={(email) => invitePerson(person.id, email)}
            />
          ))}
        </div>
      )}

      {canAdd && (
        <button
          type="button"
          onClick={addPerson}
          className="w-full h-10 bg-[var(--primary-bg)] text-[var(--fg-strong)] text-sm font-semibold rounded flex items-center justify-center gap-2 hover:opacity-90 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add {config.singularLabel}
        </button>
      )}

      <Button variant="primary" fullWidth onClick={onSave}>
        Save &amp; Return to Checklist
      </Button>
    </div>
  );
}
