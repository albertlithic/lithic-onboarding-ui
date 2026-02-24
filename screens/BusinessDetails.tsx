'use client';

import FormField from '../FormField';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import { BusinessDetailsData } from '../types';

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

interface BusinessDetailsProps {
  data: BusinessDetailsData;
  onChange: (data: BusinessDetailsData) => void;
  onContinue: () => void;
}

export default function BusinessDetails({ data, onChange, onContinue }: BusinessDetailsProps) {
  const set = (field: keyof BusinessDetailsData) => (
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange({ ...data, [field]: e.target.value })
  );

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[#F0F0F0] text-2xl font-medium"
        style={{ fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif" }}
      >
        Business Details
      </h1>

      <div className="flex flex-col gap-4">
        <FormField label="Business Name" htmlFor="businessName">
          <Input
            id="businessName"
            placeholder="Business"
            value={data.businessName}
            onChange={set('businessName')}
          />
        </FormField>

        <FormField
          label="DBA"
          labelNote="Optional"
          helperText="The operating name of your company, if it is different from the legal name"
          htmlFor="dba"
        >
          <Input
            id="dba"
            placeholder="Doing Business As"
            value={data.dba}
            onChange={set('dba')}
          />
        </FormField>

        <FormField label="Tax ID Number" htmlFor="taxIdNumber">
          <Input
            id="taxIdNumber"
            placeholder="123456789"
            value={data.taxIdNumber}
            onChange={set('taxIdNumber')}
          />
        </FormField>

        <FormField
          label="Country"
          helperText="Your information is encrypted and never shared."
          htmlFor="country"
        >
          <Select id="country" value={data.country} onChange={set('country')}>
            <option value="United States">United States</option>
          </Select>
        </FormField>

        <FormField label="Street Address" labelNote="Not a P.O. Box" htmlFor="streetAddress">
          <Input
            id="streetAddress"
            placeholder="123 Example St"
            value={data.streetAddress}
            onChange={set('streetAddress')}
          />
        </FormField>

        <FormField label="Unit" labelNote="Optional" htmlFor="unit">
          <Input
            id="unit"
            placeholder="Unit, Suite, Building, Floor, etc."
            value={data.unit}
            onChange={set('unit')}
          />
        </FormField>

        <FormField label="City" htmlFor="city">
          <Input
            id="city"
            placeholder="City Name"
            value={data.city}
            onChange={set('city')}
          />
        </FormField>

        <FormField label="State" htmlFor="state">
          <Select id="state" value={data.state} onChange={set('state')}>
            <option value="" disabled>Select One</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="ZIP" htmlFor="zip">
          <Input
            id="zip"
            placeholder="12345"
            maxLength={10}
            value={data.zip}
            onChange={set('zip')}
          />
        </FormField>

        <FormField label="Website" htmlFor="website">
          <Input
            id="website"
            placeholder="www.example.com"
            type="url"
            value={data.website}
            onChange={set('website')}
          />
        </FormField>
      </div>

      <p className="text-[#AAAAAA] text-sm leading-relaxed">
        By proceeding, you confirm all information provided is truthful and accurate.
      </p>

      <Button variant="primary" fullWidth onClick={onContinue}>
        Continue
      </Button>
    </div>
  );
}
