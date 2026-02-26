'use client';

import { useState } from 'react';
import LithicLogo from '../components/LithicLogo';
import FormField from '../components/FormField';
import Input from '../components/Input';
import Select from '../components/Select';
import RadioButton from '../components/RadioButton';
import Button from '../components/Button';
import { PersonData, FlowPath, PersonRole, CitizenshipStatus, createEmptyPerson } from '../types';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

interface InvitePersonFormProps {
  role: PersonRole;
  flowPath: FlowPath;
  onSubmit: (person: PersonData) => void;
}

export default function InvitePersonForm({ role, flowPath, onSubmit }: InvitePersonFormProps) {
  const [person, setPerson] = useState<PersonData>(createEmptyPerson(role));
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof PersonData) => (
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setPerson({ ...person, [field]: e.target.value })
  );

  const setCitizenship = (status: CitizenshipStatus) =>
    setPerson({ ...person, citizenshipStatus: status });

  const isMpmPrivate = flowPath === 'pm-private';
  const isPublic = flowPath === 'public';
  const isBo = role === 'beneficial-owner';

  const roleLabel = role === 'control-person'
    ? 'Control Person'
    : role === 'beneficial-owner'
      ? 'Beneficial Owner'
      : 'Authorized Signer';

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--bg-default)] flex items-center justify-center">
        <div className="w-[400px] flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--accent-strong-bg)] flex items-center justify-center">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <path d="M2 8L8 14L18 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1
            className="text-[var(--fg-strong)] text-2xl font-medium font-display"
            style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
          >
            Information Submitted
          </h1>
          <p className="text-[var(--fg-default)] text-sm leading-relaxed">
            Thank you for providing your information. The requesting company will be notified.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-default)] flex flex-col">
      {/* Simple header */}
      <header className="w-full flex items-center justify-center px-8 h-16 bg-[var(--bg-default)] border-b border-[var(--border-default)]">
        <div className="flex items-center gap-3">
          <LithicLogo />
          <span
            className="text-[var(--fg-strong)] text-lg font-medium font-display"
            style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
          >
            Complete Your Information
          </span>
        </div>
      </header>

      <main className="flex-1 flex justify-center py-10 px-4 overflow-y-auto">
        <div className="w-full max-w-[400px] flex flex-col gap-6">
          <h1
            className="text-[var(--fg-strong)] text-2xl font-medium font-display"
            style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
          >
            {roleLabel} Information
          </h1>

          <div className="bg-[var(--bg-default)] rounded p-4">
            <p className="text-[var(--fg-default)] text-sm leading-relaxed">
              You've been invited to provide your information as part of a company's onboarding process with Lithic.
              We're required to collect this information to comply with federal regulations. Your data is encrypted end-to-end and never shared with unauthorized parties.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Ownership % - PM-Private BOs only */}
            {isMpmPrivate && isBo && (
              <FormField label="Ownership Percentage" htmlFor="invOwnership">
                <Input
                  id="invOwnership"
                  placeholder="25"
                  value={person.ownershipPercentage}
                  onChange={set('ownershipPercentage')}
                />
              </FormField>
            )}

            <FormField label="Country of Residence" htmlFor="invCountry">
              <Select id="invCountry" value={person.countryOfResidence} onChange={set('countryOfResidence')}>
                <option value="" disabled>Select Your Country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
              </Select>
            </FormField>

            {/* Citizenship - PM-Private only */}
            {isMpmPrivate && (
              <>
                <FormField label="Citizenship Status">
                  <div className="flex flex-col gap-2 mt-1">
                    <RadioButton
                      checked={person.citizenshipStatus === 'us-citizen'}
                      onChange={() => setCitizenship('us-citizen')}
                      label="US Citizen"
                    />
                    <RadioButton
                      checked={person.citizenshipStatus === 'non-us-in-us'}
                      onChange={() => setCitizenship('non-us-in-us')}
                      label="Non-US Citizen, Residing in US"
                    />
                    <RadioButton
                      checked={person.citizenshipStatus === 'non-us-outside-us'}
                      onChange={() => setCitizenship('non-us-outside-us')}
                      label="Non-US Citizen, Residing Outside US"
                    />
                  </div>
                </FormField>

                {person.citizenshipStatus === 'us-citizen' && (
                  <FormField label="SSN" htmlFor="invSsn">
                    <Input id="invSsn" placeholder="123-45-6789" value={person.ssn} onChange={set('ssn')} />
                  </FormField>
                )}

                {person.citizenshipStatus === 'non-us-in-us' && (
                  <>
                    <FormField label="ITIN" htmlFor="invItin">
                      <Input id="invItin" placeholder="900-00-0000" value={person.itin} onChange={set('itin')} />
                    </FormField>
                    <FormField label="Passport Number" htmlFor="invPassport">
                      <Input id="invPassport" placeholder="Passport number" value={person.passportNumber} onChange={set('passportNumber')} />
                    </FormField>
                    <FormField label="Passport Issuing Country" htmlFor="invPassportCountry">
                      <Input id="invPassportCountry" placeholder="Country" value={person.passportCountry} onChange={set('passportCountry')} />
                    </FormField>
                  </>
                )}

                {person.citizenshipStatus === 'non-us-outside-us' && (
                  <>
                    <FormField label="Passport Number" htmlFor="invPassport2">
                      <Input id="invPassport2" placeholder="Passport number" value={person.passportNumber} onChange={set('passportNumber')} />
                    </FormField>
                    <FormField label="Passport Issuing Country" htmlFor="invPassportCountry2">
                      <Input id="invPassportCountry2" placeholder="Country" value={person.passportCountry} onChange={set('passportCountry')} />
                    </FormField>
                  </>
                )}
              </>
            )}

            <FormField label="Legal First Name" htmlFor="invFirstName">
              <Input id="invFirstName" placeholder="Given Name" value={person.firstName} onChange={set('firstName')} />
            </FormField>

            <FormField label="Legal Last Name" htmlFor="invLastName">
              <Input id="invLastName" placeholder="Family Name" value={person.lastName} onChange={set('lastName')} />
            </FormField>

            {(isMpmPrivate || isPublic) && (
              <FormField label="Date of Birth" htmlFor="invDob">
                <Input id="invDob" placeholder="MM/DD/YYYY" value={person.dateOfBirth} onChange={set('dateOfBirth')} />
              </FormField>
            )}

            {(isMpmPrivate || isPublic) && (
              <>
                <FormField label="Physical Address" labelNote="Not a P.O. Box" htmlFor="invAddress">
                  <Input id="invAddress" placeholder="123 Example St" value={person.physicalAddress} onChange={set('physicalAddress')} />
                </FormField>
                <FormField label="Unit" labelNote="Optional" htmlFor="invUnit">
                  <Input id="invUnit" placeholder="Unit 1" value={person.unit} onChange={set('unit')} />
                </FormField>
                <FormField label="City" htmlFor="invCity">
                  <Input id="invCity" placeholder="City Name" value={person.city} onChange={set('city')} />
                </FormField>
                <FormField label="State" htmlFor="invState">
                  <Select id="invState" value={person.state} onChange={set('state')}>
                    <option value="" disabled>Select One</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Select>
                </FormField>
                <FormField label="ZIP Code" htmlFor="invZip">
                  <Input id="invZip" placeholder="12345" maxLength={10} value={person.zip} onChange={set('zip')} />
                </FormField>
              </>
            )}

            <FormField label="Phone Number" htmlFor="invPhone">
              <Input id="invPhone" placeholder="(123) 456-7890" type="tel" value={person.phone} onChange={set('phone')} />
            </FormField>

            <FormField label="Email Address" htmlFor="invEmail">
              <Input id="invEmail" placeholder="email@example.com" type="email" value={person.email} onChange={set('email')} />
            </FormField>

            <FormField label="Title" htmlFor="invTitle">
              <Input id="invTitle" placeholder="e.g., CEO, CFO, Managing Director" value={person.title} onChange={set('title')} />
            </FormField>
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              onSubmit({ ...person, status: 'completed' });
              setSubmitted(true);
            }}
          >
            Submit Information
          </Button>
        </div>
      </main>
    </div>
  );
}
