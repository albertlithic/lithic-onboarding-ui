'use client';

import { useState } from 'react';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Select from '../components/Select';
import DropdownButton from '../components/DropdownButton';
import PersonCard from '../components/PersonCard';
import InviteModal from './InviteModal';
import { PersonData, PersonRole, createEmptyPerson, OnboardingData } from '../types';

interface ControlPersonOwnersProps {
  persons: PersonData[];
  charityNonProfitExemption: boolean;
  hasUbos: boolean | null;
  onChange: (updates: Partial<Pick<OnboardingData, 'persons' | 'charityNonProfitExemption' | 'hasUbos'>>) => void;
  onEditPerson: (personId: string) => void;
  onSave: () => void;
}

export default function ControlPersonOwners({
  persons,
  charityNonProfitExemption,
  hasUbos,
  onChange,
  onEditPerson,
  onSave,
}: ControlPersonOwnersProps) {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteRole, setInviteRole] = useState<PersonRole>('control-person');

  const controlPersons = persons.filter((p) => p.role === 'control-person');
  const beneficialOwners = persons.filter((p) => p.role === 'beneficial-owner');

  const removePerson = (id: string) => {
    onChange({ persons: persons.filter((p) => p.id !== id) });
  };

  const invitePerson = (name: string, email: string) => {
    const newPerson = createEmptyPerson(inviteRole);
    newPerson.firstName = name.split(' ')[0] || '';
    newPerson.lastName = name.split(' ').slice(1).join(' ') || '';
    newPerson.inviteEmail = email;
    newPerson.email = email;
    newPerson.status = 'invited';
    onChange({ persons: [...persons, newPerson] });
  };

  const resendInvite = (id: string) => {
    // In a real app this would trigger an API call
    onChange({
      persons: persons.map((p) =>
        p.id === id ? { ...p, status: 'invited' as const } : p
      ),
    });
  };

  const openInviteModal = (role: PersonRole) => {
    setInviteRole(role);
    setInviteModalOpen(true);
  };

  const handleSelfFill = () => {
    const newPerson = createEmptyPerson('control-person');
    onChange({ persons: [...persons, newPerson] });
    onEditPerson(newPerson.id);
  };

  const handleSelfFillBo = () => {
    const newPerson = createEmptyPerson('beneficial-owner');
    onChange({ persons: [...persons, newPerson] });
    onEditPerson(newPerson.id);
  };

  const isComplete =
    controlPersons.length > 0 &&
    (charityNonProfitExemption || hasUbos === false || beneficialOwners.length > 0);

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-2xl font-medium text-[var(--fg-strong)]"
        style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
      >
        Control Person & Owners
      </h1>

      {/* Charity/Non-Profit exemption */}
      <Checkbox
        checked={charityNonProfitExemption}
        onChange={(checked) => onChange({ charityNonProfitExemption: checked })}
        label="My business is a Charity or Non-Profit, and does not need to provide ownership information."
      />

      {/* Control Person section */}
      <section className="flex flex-col gap-4">
        <h2
          className="text-lg font-medium text-[var(--fg-strong)]"
          style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
        >
          Control Person
        </h2>

        {controlPersons.map((person) => (
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

        {controlPersons.length === 0 && (
          <DropdownButton
            label="Add Control Person"
            options={[
              { label: 'Invite by Email', onClick: () => openInviteModal('control-person') },
              { label: 'I am the Control Person', onClick: handleSelfFill },
            ]}
          />
        )}
      </section>

      {/* Ultimate Beneficial Owners section */}
      {!charityNonProfitExemption && (
        <section className="flex flex-col gap-4">
          <h2
            className="text-lg font-medium text-[var(--fg-strong)]"
            style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
          >
            Ultimate Beneficial Owners
          </h2>

          <p className="text-sm text-[var(--fg-default)] leading-relaxed">
            Invite your Ultimate Beneficial Owners (owners with at least 25% direct or indirect ownership of your business).
          </p>

          <Select
            value={hasUbos === null ? 'yes' : hasUbos ? 'yes' : 'no'}
            onChange={(e) => {
              onChange({ hasUbos: e.target.value === 'yes' });
            }}
          >
            <option value="no">My business has no UBOs.</option>
            <option value="yes">My business has at least one UBO.</option>
          </Select>

          {(hasUbos === null || hasUbos) && (
            <>
              {beneficialOwners.map((person) => (
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

              <DropdownButton
                label={beneficialOwners.length > 0 ? 'Invite Owner' : 'Add Owner'}
                options={[
                  { label: 'Invite by Email', onClick: () => openInviteModal('beneficial-owner') },
                  { label: 'I am the Beneficial Owner', onClick: handleSelfFillBo },
                ]}
              />
            </>
          )}
        </section>
      )}

      <Button variant="accent" fullWidth onClick={onSave} disabled={!isComplete}>
        Continue
      </Button>

      <InviteModal
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        role={inviteRole}
        onSendInvite={invitePerson}
      />
    </div>
  );
}
