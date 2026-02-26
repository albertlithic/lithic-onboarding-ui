'use client';

import { useState } from 'react';
import Button from '../components/Button';
import DropdownButton from '../components/DropdownButton';
import PersonCard from '../components/PersonCard';
import InviteModal from './InviteModal';
import { PersonData, PersonRole, createEmptyPerson } from '../types';

interface PersonListProps {
  role: PersonRole;
  persons: PersonData[];
  onChange: (persons: PersonData[]) => void;
  onEditPerson: (personId: string) => void;
  onSave: () => void;
}

const ROLE_CONFIG: Record<PersonRole, {
  screenTitle: string;
  description: string;
  addLabel: string;
  selfLabel: string;
  maxCount?: number;
}> = {
  'control-person': {
    screenTitle: 'Control Person',
    description: 'A control person is an individual with significant responsibility for managing the legal entity (e.g., CEO, CFO, COO, Managing Member, General Partner, President).',
    addLabel: 'Add Control Person',
    selfLabel: 'I am the Control Person',
  },
  'beneficial-owner': {
    screenTitle: 'Beneficial Owners',
    description: 'Please list all beneficial owners with at least 25% direct or indirect ownership of your company.',
    addLabel: 'Add Beneficial Owner',
    selfLabel: 'I am the Beneficial Owner',
  },
  'authorized-signer': {
    screenTitle: 'Authorized Signer',
    description: 'Identify the individual authorized to sign agreements on behalf of the company. Federal regulations require us to verify this person\'s identity.',
    addLabel: 'Add Authorized Signer',
    selfLabel: 'I am the Authorized Signer',
    maxCount: 1,
  },
};

export default function PersonList({ role, persons, onChange, onEditPerson, onSave }: PersonListProps) {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const config = ROLE_CONFIG[role];
  const rolePersons = persons.filter((p) => p.role === role);
  const canAdd = !config.maxCount || rolePersons.length < config.maxCount;

  const handleSelfFill = () => {
    const newPerson = createEmptyPerson(role);
    onChange([...persons, newPerson]);
    onEditPerson(newPerson.id);
  };

  const handleInvite = (name: string, email: string) => {
    const newPerson = createEmptyPerson(role);
    newPerson.firstName = name.split(' ')[0] || '';
    newPerson.lastName = name.split(' ').slice(1).join(' ') || '';
    newPerson.inviteEmail = email;
    newPerson.email = email;
    newPerson.status = 'invited';
    onChange([...persons, newPerson]);
  };

  const removePerson = (id: string) => {
    onChange(persons.filter((p) => p.id !== id));
  };

  const resendInvite = (id: string) => {
    onChange(persons.map((p) =>
      p.id === id ? { ...p, status: 'invited' as const } : p
    ));
  };

  const isComplete = rolePersons.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-2xl font-medium text-[var(--fg-strong)]"
        style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
      >
        {config.screenTitle}
      </h1>

      <p className="text-sm text-[var(--fg-default)] leading-relaxed">
        {config.description}
      </p>

      {/* Person cards */}
      {rolePersons.map((person) => (
        <PersonCard
          key={person.id}
          name={person.firstName ? `${person.firstName} ${person.lastName}`.trim() : ''}
          email={person.inviteEmail || person.email}
          status={person.status}
          onEdit={() => onEditPerson(person.id)}
          onResendInvite={() => resendInvite(person.id)}
          onRemove={() => removePerson(person.id)}
        />
      ))}

      {/* Add button — hidden once max count is reached */}
      {canAdd && (
        <DropdownButton
          label={config.addLabel}
          options={[
            { label: 'Invite by Email', onClick: () => setInviteModalOpen(true) },
            { label: config.selfLabel, onClick: handleSelfFill },
          ]}
        />
      )}

      <Button variant="accent" fullWidth onClick={onSave} disabled={!isComplete}>
        Continue
      </Button>

      <InviteModal
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        role={role}
        onSendInvite={handleInvite}
      />
    </div>
  );
}
