'use client';

import { useState } from 'react';
import FormField from '../FormField';
import Input from '../Input';
import Select from '../Select';
import Checkbox from '../Checkbox';
import Button from '../Button';
import { Owner, OwnershipData } from '../types';

interface OwnershipProps {
  data: OwnershipData;
  onChange: (data: OwnershipData) => void;
  onBack: () => void;
  onContinue: () => void;
}

function OwnerCard({
  owner,
  index,
  isControlPerson,
  onChange,
  onRemove,
}: {
  owner: Owner;
  index: number;
  isControlPerson: boolean;
  onChange: (owner: Owner) => void;
  onRemove?: () => void;
}) {
  const set = (field: keyof Owner) => (
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange({ ...owner, [field]: e.target.value })
  );

  return (
    <div className="bg-[#222222] rounded p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-[#333333] flex items-center justify-center text-[#AAAAAA] text-sm font-medium">
            {index + 1}
          </span>
          <span
            className="text-lg font-medium"
            style={{
              fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif",
              color: isControlPerson ? '#F0F0F0' : '#707070',
            }}
          >
            {isControlPerson ? 'Control Person' : owner.firstName ? `${owner.firstName} ${owner.lastName}`.trim() : 'Owner'}
          </span>
        </div>
        {!isControlPerson && onRemove && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRemove}
              className="flex items-center gap-1 text-[#AAAAAA] text-sm hover:text-[#F0F0F0] transition-colors"
            >
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                <path d="M1 3H11M4 3V2H8V3M2 3L2.8 12.1C2.9 12.6 3.3 13 3.8 13H8.2C8.7 13 9.1 12.6 9.2 12.1L10 3" stroke="#AAAAAA" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {!isControlPerson && (
          <>
            <FormField label="Country of Residence" helperText="Your information is encrypted and never shared." htmlFor={`owner-${owner.id}-country`}>
              <Select id={`owner-${owner.id}-country`} value={owner.countryOfResidence} onChange={set('countryOfResidence')}>
                <option value="" disabled>Select One</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
              </Select>
            </FormField>
            <FormField label="Legal First Name" htmlFor={`owner-${owner.id}-first`}>
              <Input id={`owner-${owner.id}-first`} placeholder="Given Name" value={owner.firstName} onChange={set('firstName')} />
            </FormField>
            <FormField label="Legal Last Name" htmlFor={`owner-${owner.id}-last`}>
              <Input id={`owner-${owner.id}-last`} placeholder="Family Name" value={owner.lastName} onChange={set('lastName')} />
            </FormField>
            <FormField label="Date of Birth" htmlFor={`owner-${owner.id}-dob`}>
              <Input id={`owner-${owner.id}-dob`} placeholder="MM/DD/YYYY" value={owner.dateOfBirth} onChange={set('dateOfBirth')} />
            </FormField>
            <FormField label="SSN Last 4" helperText="Your information is encrypted and never shared." htmlFor={`owner-${owner.id}-ssn`}>
              <Input id={`owner-${owner.id}-ssn`} placeholder="123-45-6789" value={owner.ssnLast4} onChange={set('ssnLast4')} />
            </FormField>
          </>
        )}
        <FormField label="Ownership %" htmlFor={`owner-${owner.id}-pct`}>
          <Input id={`owner-${owner.id}-pct`} placeholder={isControlPerson ? '25' : '25'} value={owner.ownershipPercentage} onChange={set('ownershipPercentage')} />
        </FormField>
        {!isControlPerson && (
          <>
            <FormField label="Street Address" labelNote="Not a P.O. Box" htmlFor={`owner-${owner.id}-street`}>
              <Input id={`owner-${owner.id}-street`} placeholder="Control Person's Address" value={owner.streetAddress} onChange={set('streetAddress')} />
            </FormField>
            <FormField label="Apt or Unit" labelNote="Optional" htmlFor={`owner-${owner.id}-unit`}>
              <Input id={`owner-${owner.id}-unit`} placeholder="Unit 1" value={owner.aptOrUnit} onChange={set('aptOrUnit')} />
            </FormField>
            <FormField label="ZIP" htmlFor={`owner-${owner.id}-zip`}>
              <Input id={`owner-${owner.id}-zip`} placeholder="12345" value={owner.zip} onChange={set('zip')} />
            </FormField>
            <FormField label="Phone" htmlFor={`owner-${owner.id}-phone`}>
              <Input id={`owner-${owner.id}-phone`} placeholder="(123) 456-7890" type="tel" value={owner.phone} onChange={set('phone')} />
            </FormField>
          </>
        )}
      </div>
    </div>
  );
}

function createEmptyOwner(): Owner {
  return {
    id: Math.random().toString(36).slice(2),
    countryOfResidence: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ssnLast4: '',
    ownershipPercentage: '',
    streetAddress: '',
    aptOrUnit: '',
    zip: '',
    phone: '',
  };
}

export default function Ownership({ data, onChange, onBack, onContinue }: OwnershipProps) {
  const controlPersonOwner: Owner = {
    id: 'control-person',
    countryOfResidence: 'United States',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ssnLast4: '',
    ownershipPercentage: data.controlPersonOwnership,
    streetAddress: '',
    aptOrUnit: '',
    zip: '',
    phone: '',
  };

  const addOwner = () =>
    onChange({ ...data, owners: [...data.owners, createEmptyOwner()] });

  const updateOwner = (id: string, updated: Owner) =>
    onChange({
      ...data,
      owners: data.owners.map((o) => (o.id === id ? updated : o)),
    });

  const removeOwner = (id: string) =>
    onChange({ ...data, owners: data.owners.filter((o) => o.id !== id) });

  const updateControlPersonOwnership = (owner: Owner) =>
    onChange({ ...data, controlPersonOwnership: owner.ownershipPercentage });

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[#F0F0F0] text-2xl font-medium"
        style={{ fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif" }}
      >
        Ownership
      </h1>

      <p className="text-[#AAAAAA] text-sm leading-relaxed">
        Please enter all beneficial owners with at least 25% direct or indirect
        ownership of your company
      </p>

      <Checkbox
        checked={data.isCharityOrNonProfit}
        onChange={(checked) => onChange({ ...data, isCharityOrNonProfit: checked })}
        label="My business is a Charity or Non-Profit, and does not need to provide ownership information"
      />

      {!data.isCharityOrNonProfit && (
        <div className="flex flex-col gap-4">
          <OwnerCard
            owner={controlPersonOwner}
            index={0}
            isControlPerson
            onChange={updateControlPersonOwnership}
          />
          {data.owners.map((owner, i) => (
            <OwnerCard
              key={owner.id}
              owner={owner}
              index={i + 1}
              isControlPerson={false}
              onChange={(updated) => updateOwner(owner.id, updated)}
              onRemove={() => removeOwner(owner.id)}
            />
          ))}
          <button
            type="button"
            onClick={addOwner}
            className="w-full h-10 bg-[#333333] text-[#F0F0F0] text-sm font-semibold rounded flex items-center justify-center gap-2 hover:bg-[#3D3D3D] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1V11M1 6H11" stroke="#F0F0F0" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Add an additional owner
          </button>
        </div>
      )}

      <p className="text-[#AAAAAA] text-sm leading-relaxed">
        By proceeding, you confirm all information provided is truthful and accurate.
      </p>

      <div className="flex gap-4">
        <Button variant="secondary" fullWidth onClick={onBack}>
          Go Back
        </Button>
        <Button variant="primary" fullWidth onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
