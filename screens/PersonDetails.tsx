'use client';

import FormField from '../FormField';
import Input from '../Input';
import Select from '../Select';
import RadioButton from '../RadioButton';
import Button from '../Button';
import { PersonData, FlowPath, CitizenshipStatus } from '../types';

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

interface PersonDetailsProps {
  person: PersonData;
  flowPath: FlowPath;
  onChange: (person: PersonData) => void;
  onSave: () => void;
  onBack: () => void;
}

export default function PersonDetails({ person, flowPath, onChange, onSave, onBack }: PersonDetailsProps) {
  const set = (field: keyof PersonData) => (
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange({ ...person, [field]: e.target.value })
  );

  const setCitizenship = (status: CitizenshipStatus) =>
    onChange({ ...person, citizenshipStatus: status });

  const isMpmPrivate = flowPath === 'pm-private';
  const isPoPrivate = flowPath === 'po-private';
  const isPublic = flowPath === 'public';
  const isBo = person.role === 'beneficial-owner';

  const roleLabel = person.role === 'control-person'
    ? 'Control Person'
    : person.role === 'beneficial-owner'
      ? 'Beneficial Owner'
      : 'Authorized Signer';

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[#F0F0F0] text-2xl font-medium"
        style={{ fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif" }}
      >
        {roleLabel} Details
      </h1>

      <p className="text-[#AAAAAA] text-sm leading-relaxed">
        We're required to collect this information to comply with federal Know Your Customer (KYC) regulations. Your data is encrypted end-to-end and never shared with third parties.
      </p>

      <div className="flex flex-col gap-4">
        {/* Ownership % - PM-Private BOs only */}
        {isMpmPrivate && isBo && (
          <FormField label="Ownership Percentage" htmlFor="pdOwnership">
            <Input
              id="pdOwnership"
              placeholder="25"
              value={person.ownershipPercentage}
              onChange={set('ownershipPercentage')}
            />
          </FormField>
        )}

        {/* Country of Residence - all paths */}
        <FormField
          label="Country of Residence"
          helperText="Your information is encrypted and never shared."
          htmlFor="pdCountry"
        >
          <Select id="pdCountry" value={person.countryOfResidence} onChange={set('countryOfResidence')}>
            <option value="" disabled>Select Your Country</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
          </Select>
        </FormField>

        {/* Citizenship-based ID logic - PM-Private only */}
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

            {/* SSN - US citizens */}
            {person.citizenshipStatus === 'us-citizen' && (
              <FormField label="SSN" htmlFor="pdSsn">
                <Input
                  id="pdSsn"
                  placeholder="123-45-6789"
                  value={person.ssn}
                  onChange={set('ssn')}
                />
              </FormField>
            )}

            {/* ITIN + Passport - Non-US in US */}
            {person.citizenshipStatus === 'non-us-in-us' && (
              <>
                <FormField label="ITIN" htmlFor="pdItin">
                  <Input
                    id="pdItin"
                    placeholder="900-00-0000"
                    value={person.itin}
                    onChange={set('itin')}
                  />
                </FormField>
                <FormField label="Passport Number" htmlFor="pdPassport">
                  <Input
                    id="pdPassport"
                    placeholder="Passport number"
                    value={person.passportNumber}
                    onChange={set('passportNumber')}
                  />
                </FormField>
                <FormField label="Passport Issuing Country" htmlFor="pdPassportCountry">
                  <Input
                    id="pdPassportCountry"
                    placeholder="Country"
                    value={person.passportCountry}
                    onChange={set('passportCountry')}
                  />
                </FormField>
              </>
            )}

            {/* Passport only - Non-US outside US */}
            {person.citizenshipStatus === 'non-us-outside-us' && (
              <>
                <FormField label="Passport Number" htmlFor="pdPassport2">
                  <Input
                    id="pdPassport2"
                    placeholder="Passport number"
                    value={person.passportNumber}
                    onChange={set('passportNumber')}
                  />
                </FormField>
                <FormField label="Passport Issuing Country" htmlFor="pdPassportCountry2">
                  <Input
                    id="pdPassportCountry2"
                    placeholder="Country"
                    value={person.passportCountry}
                    onChange={set('passportCountry')}
                  />
                </FormField>
              </>
            )}
          </>
        )}

        {/* Legal Name - all paths */}
        <FormField label="Legal First Name" htmlFor="pdFirstName">
          <Input
            id="pdFirstName"
            placeholder="Given Name"
            value={person.firstName}
            onChange={set('firstName')}
          />
        </FormField>

        <FormField label="Legal Last Name" htmlFor="pdLastName">
          <Input
            id="pdLastName"
            placeholder="Family Name"
            value={person.lastName}
            onChange={set('lastName')}
          />
        </FormField>

        {/* DOB - PM-Private and Public */}
        {(isMpmPrivate || isPublic) && (
          <FormField label="Date of Birth" htmlFor="pdDob">
            <Input
              id="pdDob"
              placeholder="MM/DD/YYYY"
              value={person.dateOfBirth}
              onChange={set('dateOfBirth')}
            />
          </FormField>
        )}

        {/* SSN (general) - PM-Private only, shown if US citizen selected */}
        {isMpmPrivate && person.citizenshipStatus === 'us-citizen' && (
          <></>
        )}

        {/* Physical Address - PM-Private and Public */}
        {(isMpmPrivate || isPublic) && (
          <>
            <FormField label="Physical Address" labelNote="Not a P.O. Box" htmlFor="pdAddress">
              <Input
                id="pdAddress"
                placeholder="123 Example St"
                value={person.physicalAddress}
                onChange={set('physicalAddress')}
              />
            </FormField>

            <FormField label="Unit" labelNote="Optional" htmlFor="pdUnit">
              <Input
                id="pdUnit"
                placeholder="Unit 1"
                value={person.unit}
                onChange={set('unit')}
              />
            </FormField>

            <FormField label="City" htmlFor="pdCity">
              <Input
                id="pdCity"
                placeholder="City Name"
                value={person.city}
                onChange={set('city')}
              />
            </FormField>

            <FormField label="State" htmlFor="pdState">
              <Select id="pdState" value={person.state} onChange={set('state')}>
                <option value="" disabled>Select One</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </FormField>

            <FormField label="ZIP Code" htmlFor="pdZip">
              <Input
                id="pdZip"
                placeholder="12345"
                maxLength={10}
                value={person.zip}
                onChange={set('zip')}
              />
            </FormField>
          </>
        )}

        {/* Phone - all paths */}
        <FormField label="Phone Number" htmlFor="pdPhone">
          <Input
            id="pdPhone"
            placeholder="(123) 456-7890"
            type="tel"
            value={person.phone}
            onChange={set('phone')}
          />
        </FormField>

        {/* Email - all paths */}
        <FormField label="Email Address" htmlFor="pdEmail">
          <Input
            id="pdEmail"
            placeholder="email@example.com"
            type="email"
            value={person.email}
            onChange={set('email')}
          />
        </FormField>

        {/* Title - all paths */}
        <FormField label="Title" htmlFor="pdTitle">
          <Input
            id="pdTitle"
            placeholder="e.g., CEO, CFO, Managing Director"
            value={person.title}
            onChange={set('title')}
          />
        </FormField>
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" fullWidth onClick={onBack}>
          Go Back
        </Button>
        <Button variant="primary" fullWidth onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
