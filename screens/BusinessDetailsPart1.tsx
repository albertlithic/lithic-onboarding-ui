'use client';

import FormField from '../components/FormField';
import Input from '../components/Input';
import RadioButton from '../components/RadioButton';
import Button from '../components/Button';
import { BusinessDetailsPart1Data, CompanyType } from '../types';

interface BusinessDetailsPart1Props {
  data: BusinessDetailsPart1Data;
  onChange: (data: BusinessDetailsPart1Data) => void;
  onSave: () => void;
}

const COMPANY_TYPES: { value: CompanyType; label: string; description: string }[] = [
  {
    value: 'public',
    label: 'Public',
    description: 'Your company is publicly traded on a stock exchange.',
  },
  {
    value: 'private',
    label: 'Private',
    description: 'Your company is privately held and not traded on a public exchange.',
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Your company is a non-profit, government entity, or other organization type.',
  },
];

export default function BusinessDetailsPart1({ data, onChange, onSave }: BusinessDetailsPart1Props) {
  const set = (field: keyof BusinessDetailsPart1Data) => (
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...data, [field]: e.target.value })
  );

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[var(--fg-strong)] text-2xl font-medium font-display"
        style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
      >
        Business Details
      </h1>

      <div className="flex flex-col gap-4">
        <FormField label="Business Name" htmlFor="businessName">
          <Input
            id="businessName"
            placeholder="Legal business name"
            value={data.businessName}
            onChange={set('businessName')}
          />
        </FormField>

        <FormField
          label="DBA"
          labelNote="Optional"
          helperText="The operating name of your company, if different from the legal name."
          htmlFor="dba"
        >
          <Input
            id="dba"
            placeholder="Doing Business As"
            value={data.dba}
            onChange={set('dba')}
          />
        </FormField>

        <FormField label="Tax ID" htmlFor="taxId">
          <Input
            id="taxId"
            placeholder="123456789"
            value={data.taxId}
            onChange={set('taxId')}
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

        <FormField label="Company Type">
          <div className="flex flex-col gap-3 mt-1">
            {COMPANY_TYPES.map((ct) => (
              <div
                key={ct.value}
                className="bg-[var(--bg-default)] rounded p-3 flex flex-col gap-1.5 cursor-pointer hover:bg-[var(--bg-canvas)] transition-colors"
                onClick={() => onChange({ ...data, companyType: ct.value })}
              >
                <RadioButton
                  checked={data.companyType === ct.value}
                  onChange={() => onChange({ ...data, companyType: ct.value })}
                  label={ct.label}
                />
                <p className="text-[var(--fg-default)] text-xs leading-relaxed ml-[26px]">
                  {ct.description}
                </p>
              </div>
            ))}
          </div>
        </FormField>
      </div>

      <p className="text-[var(--fg-default)] text-sm leading-relaxed">
        By proceeding, you confirm all information provided is truthful and accurate.
      </p>

      <Button variant="primary" fullWidth onClick={onSave}>
        Save &amp; Return to Checklist
      </Button>
    </div>
  );
}
