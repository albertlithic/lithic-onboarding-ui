'use client';

import FormField from '../components/FormField';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { BusinessDetailsPart2Data, FlowPath } from '../types';

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

interface BusinessDetailsPart2Props {
  data: BusinessDetailsPart2Data;
  flowPath: FlowPath;
  onChange: (data: BusinessDetailsPart2Data) => void;
  onSave: () => void;
}

export default function BusinessDetailsPart2({ data, flowPath, onChange, onSave }: BusinessDetailsPart2Props) {
  const set = (field: keyof BusinessDetailsPart2Data) => (
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange({ ...data, [field]: e.target.value })
  );

  const showAddress = flowPath === 'pm-private' || flowPath === 'po-private';
  const employeeOptional = flowPath === 'po-private' || flowPath === 'public';

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[var(--fg-strong)] text-2xl font-medium font-display"
        style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
      >
        Additional Business Details
      </h1>

      <div className="flex flex-col gap-4">
        {showAddress && (
          <>
            <FormField label="Country" htmlFor="bd2Country">
              <Select id="bd2Country" value={data.country} onChange={set('country')}>
                <option value="" disabled>Select Country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
              </Select>
            </FormField>

            <FormField label="Street Address" labelNote="Not a P.O. Box" htmlFor="bd2Street">
              <Input
                id="bd2Street"
                placeholder="123 Example St"
                value={data.streetAddress}
                onChange={set('streetAddress')}
              />
            </FormField>

            <FormField label="Unit" labelNote="Optional" htmlFor="bd2Unit">
              <Input
                id="bd2Unit"
                placeholder="Unit, Suite, Building, Floor, etc."
                value={data.unit}
                onChange={set('unit')}
              />
            </FormField>

            <FormField label="City" htmlFor="bd2City">
              <Input
                id="bd2City"
                placeholder="City Name"
                value={data.city}
                onChange={set('city')}
              />
            </FormField>

            <FormField label="State" htmlFor="bd2State">
              <Select id="bd2State" value={data.state} onChange={set('state')}>
                <option value="" disabled>Select One</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </FormField>

            <FormField label="ZIP" htmlFor="bd2Zip">
              <Input
                id="bd2Zip"
                placeholder="12345"
                maxLength={10}
                value={data.zip}
                onChange={set('zip')}
              />
            </FormField>
          </>
        )}

        <FormField
          label="Employee Count"
          labelNote={employeeOptional ? 'Optional' : undefined}
          htmlFor="bd2Employees"
        >
          <Input
            id="bd2Employees"
            placeholder="Number of employees"
            value={data.employeeCount}
            onChange={set('employeeCount')}
          />
        </FormField>

        <FormField
          label="NAICS Codes"
          helperText="Enter your North American Industry Classification System code(s)."
          htmlFor="bd2Naics"
        >
          <Input
            id="bd2Naics"
            placeholder="e.g., 522320"
            value={data.naicsCodes}
            onChange={set('naicsCodes')}
          />
        </FormField>
      </div>

      <Button variant="primary" fullWidth onClick={onSave}>
        Save &amp; Return to Checklist
      </Button>
    </div>
  );
}
