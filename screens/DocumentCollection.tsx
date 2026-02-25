'use client';

import FormField from '../FormField';
import FileUpload from '../FileUpload';
import Button from '../Button';
import { FinancialDocsData } from '../types';

interface DocumentCollectionProps {
  data: FinancialDocsData;
  onChange: (data: FinancialDocsData) => void;
  onSave: () => void;
}

export default function DocumentCollection({ data, onChange, onSave }: DocumentCollectionProps) {
  const set = (field: keyof FinancialDocsData) => (file: File | null) =>
    onChange({ ...data, [field]: file });

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[#F0F0F0] text-2xl font-medium"
        style={{ fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif" }}
      >
        Financial Documents
      </h1>

      <div className="flex flex-col gap-4">
        <FormField
          label="Last 3 Months' Bank Statements"
          helperText="Your main company account's bank statements from the last 3 months. We'll use these to determine reserve requirements and limits."
          htmlFor="docBank"
        >
          <FileUpload value={data.bankStatements} onChange={set('bankStatements')} accept=".pdf,.jpg,.png" />
        </FormField>

        <FormField
          label="Last 12 Months' Financial Statements"
          helperText="This should include your company balance sheet, income statement, and statement of cash flows. If your business is less than a year old, provide what you have."
          htmlFor="docFinancial"
        >
          <FileUpload value={data.financialStatements} onChange={set('financialStatements')} accept=".pdf,.jpg,.png" />
        </FormField>
      </div>

      <p className="text-[#AAAAAA] text-sm leading-relaxed">
        Files uploaded through this page are securely encrypted, and protected
        for review by our compliance team.
      </p>

      <Button variant="primary" fullWidth onClick={onSave}>
        Save &amp; Return to Checklist
      </Button>
    </div>
  );
}
