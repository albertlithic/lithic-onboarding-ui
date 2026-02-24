'use client';

import FormField from '../FormField';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import { ControlPersonData } from '../types';

interface ControlPersonProps {
  data: ControlPersonData;
  onChange: (data: ControlPersonData) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function ControlPerson({ data, onChange, onBack, onContinue }: ControlPersonProps) {
  const set = (field: keyof ControlPersonData) => (
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange({ ...data, [field]: e.target.value })
  );

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[#F0F0F0] text-2xl font-medium"
        style={{ fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif" }}
      >
        Control Person
      </h1>

      <p className="text-[#AAAAAA] text-sm leading-relaxed">
        The control person is an individual with significant responsibility for
        managing the legal entity (e.g., CEO, CFO, COO, Managing Member, General
        Partner, President). This can be an executive, or someone who will have
        program-wide access to the cards that Lithic will provide.
      </p>

      <div className="flex flex-col gap-4">
        <FormField
          label="Country of Residence"
          helperText="Your information is encrypted and never shared."
          htmlFor="cpCountry"
        >
          <Select id="cpCountry" value={data.countryOfResidence} onChange={set('countryOfResidence')}>
            <option value="" disabled>Select Your Country</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
          </Select>
        </FormField>

        <FormField label="Legal First Name" htmlFor="cpFirstName">
          <Input
            id="cpFirstName"
            placeholder="Given Name"
            value={data.firstName}
            onChange={set('firstName')}
          />
        </FormField>

        <FormField label="Legal Last Name" htmlFor="cpLastName">
          <Input
            id="cpLastName"
            placeholder="Family Name"
            value={data.lastName}
            onChange={set('lastName')}
          />
        </FormField>

        <FormField label="Date of Birth" htmlFor="cpDob">
          <Input
            id="cpDob"
            placeholder="MM/DD/YYYY"
            value={data.dateOfBirth}
            onChange={set('dateOfBirth')}
          />
        </FormField>

        <FormField
          label="SSN"
          helperText="Don't have an SSN? Select the country your passport was issued by at the top of this form."
          htmlFor="cpSsn"
        >
          <Input
            id="cpSsn"
            placeholder="123-45-6789"
            value={data.ssn}
            onChange={set('ssn')}
          />
        </FormField>

        <FormField label="Street Address" labelNote="Not a P.O. Box" htmlFor="cpStreet">
          <Input
            id="cpStreet"
            placeholder="Control Person's Address"
            value={data.streetAddress}
            onChange={set('streetAddress')}
          />
        </FormField>

        <FormField label="Unit" labelNote="Optional" htmlFor="cpUnit">
          <Input
            id="cpUnit"
            placeholder="Unit 1"
            value={data.unit}
            onChange={set('unit')}
          />
        </FormField>

        <FormField label="Zip Code" htmlFor="cpZip">
          <Input
            id="cpZip"
            placeholder="12345"
            value={data.zipCode}
            onChange={set('zipCode')}
          />
        </FormField>

        <FormField label="Phone Number" htmlFor="cpPhone">
          <Input
            id="cpPhone"
            placeholder="(123) 456-7890"
            type="tel"
            value={data.phoneNumber}
            onChange={set('phoneNumber')}
          />
        </FormField>

        <FormField label="Email Address" htmlFor="cpEmail">
          <Input
            id="cpEmail"
            placeholder="email@example.com"
            type="email"
            value={data.emailAddress}
            onChange={set('emailAddress')}
          />
        </FormField>
      </div>

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
