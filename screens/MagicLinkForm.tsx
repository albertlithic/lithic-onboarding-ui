'use client';

import { useState } from 'react';
import FormField from '../components/FormField';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import InfoBanner from '../components/InfoBanner';
import { PersonData, PersonRole, CitizenshipStatus, createEmptyPerson } from '../types';

interface MagicLinkFormProps {
  inviterEmail: string;
  role: PersonRole;
  onSubmit: (data: PersonData) => void;
}

const ROLE_LABELS: Record<PersonRole, string> = {
  'control-person': 'the Control Person',
  'beneficial-owner': 'an Ultimate Beneficial Owner',
  'authorized-signer': 'the Authorized Signer',
};

export default function MagicLinkForm({ inviterEmail, role, onSubmit }: MagicLinkFormProps) {
  const [person, setPerson] = useState<PersonData>(createEmptyPerson(role));
  const [ownershipSelect, setOwnershipSelect] = useState('');
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const set = (field: keyof PersonData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPerson((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isUsResident = person.countryOfResidence === 'US' || person.countryOfResidence === 'United States';

  const handleSubmit = () => {
    onSubmit({ ...person, status: 'submitted' });
  };

  return (
    <div className="flex flex-col gap-6 max-w-[400px] mx-auto py-12 px-4">
      <h1
        className="text-2xl font-medium text-[var(--fg-strong)]"
        style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
      >
        Your Details
      </h1>

      {!bannerDismissed && (
        <InfoBanner onDismiss={() => setBannerDismissed(true)}>
          <span className="font-semibold">{inviterEmail}</span>{' '}
          submitted you as {ROLE_LABELS[role]} of the business they are
          onboarding onto our platform. Please provide your details below for
          our team to review.
        </InfoBanner>
      )}

      {/* Ownership (for beneficial owners) */}
      {role === 'beneficial-owner' && (
        <FormField label="Ownership" htmlFor="ownership">
          <p className="text-sm text-[var(--fg-default)] py-1">
            Federal regulations require us to verify the identity of individuals who own 25% or more of a business.
          </p>
          <Select
            id="ownership"
            value={ownershipSelect}
            onChange={(e) => setOwnershipSelect(e.target.value)}
          >
            <option value="" disabled>Select One</option>
            <option value="25+">I own 25% or more of the business</option>
            <option value="under25">I do not own 25% or more of the business</option>
          </Select>
          {ownershipSelect === '25+' && (
            <Input
              placeholder="0%"
              value={person.ownershipPercentage}
              onChange={set('ownershipPercentage')}
            />
          )}
        </FormField>
      )}

      {/* Country of Residence */}
      <FormField label="Country of Residence" htmlFor="country">
        <Select id="country" value={person.countryOfResidence} onChange={set('countryOfResidence')}>
          <option value="" disabled>Select Your Country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
        </Select>
      </FormField>

      {/* Personal details */}
      <FormField label="Legal First Name" htmlFor="firstName">
        <Input id="firstName" placeholder="Given Name" value={person.firstName} onChange={set('firstName')} />
      </FormField>

      <FormField label="Legal Last Name" htmlFor="lastName">
        <Input id="lastName" placeholder="Family Name" value={person.lastName} onChange={set('lastName')} />
      </FormField>

      <FormField label="Date of Birth" htmlFor="dob">
        <Input id="dob" placeholder="MM/DD/YYYY" value={person.dateOfBirth} onChange={set('dateOfBirth')} />
      </FormField>

      {/* SSN / Passport (conditional) */}
      {isUsResident ? (
        <FormField label="SSN" htmlFor="ssn">
          <p className="text-sm text-[var(--fg-default)] py-1">
            Don't have an SSN? Select the country your passport was issued by at the top of this form.
          </p>
          <Input id="ssn" placeholder="123-45-6789" value={person.ssn} onChange={set('ssn')} />
        </FormField>
      ) : person.countryOfResidence ? (
        <>
          <FormField label="Passport Number" htmlFor="passport">
            <Input id="passport" placeholder="Passport Number" value={person.passportNumber} onChange={set('passportNumber')} />
          </FormField>
          <FormField label="Passport Issuing Country" htmlFor="passportCountry">
            <Input id="passportCountry" placeholder="Country" value={person.passportCountry} onChange={set('passportCountry')} />
          </FormField>
        </>
      ) : null}

      {/* Address */}
      <FormField label="Street Address" labelNote="Not a P.O. Box" htmlFor="address">
        <Input id="address" placeholder="123 Example Street" value={person.physicalAddress} onChange={set('physicalAddress')} />
      </FormField>

      <FormField label="Unit" htmlFor="unit">
        <Input id="unit" placeholder="Unit 1" value={person.unit} onChange={set('unit')} />
      </FormField>

      <FormField label="City / Town" htmlFor="city">
        <Input id="city" placeholder="Town or City" value={person.city} onChange={set('city')} />
      </FormField>

      <FormField label="State / Province / Region" htmlFor="state">
        <Input id="state" placeholder="State, Province, or Region" value={person.state} onChange={set('state')} />
      </FormField>

      <FormField label="Zip Code" htmlFor="zip">
        <Input id="zip" placeholder="12345" value={person.zip} onChange={set('zip')} maxLength={10} />
      </FormField>

      <FormField label="Phone Number" htmlFor="phone">
        <Input id="phone" placeholder="(123) 456-7890" type="tel" value={person.phone} onChange={set('phone')} />
      </FormField>

      <FormField label="Email Address" htmlFor="email">
        <Input id="email" placeholder="email@example.com" type="email" value={person.email} onChange={set('email')} />
      </FormField>

      <p className="text-sm text-[var(--fg-default)]">
        By proceeding, you confirm all information provided is truthful and accurate.
      </p>

      <Button variant="accent" fullWidth onClick={handleSubmit}>
        Submit Details
      </Button>
    </div>
  );
}
