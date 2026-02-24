'use client';

import FormField from '../FormField';
import FileUpload from '../FileUpload';
import Button from '../Button';
import { DocumentsData } from '../types';

interface DocumentCollectionProps {
  data: DocumentsData;
  onChange: (data: DocumentsData) => void;
  onBack: () => void;
  onFinish: () => void;
}

export default function DocumentCollection({ data, onChange, onBack, onFinish }: DocumentCollectionProps) {
  const set = (field: keyof DocumentsData) => (file: File | null) =>
    onChange({ ...data, [field]: file });

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[#F0F0F0] text-2xl font-medium"
        style={{ fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif" }}
      >
        Business Details
      </h1>

      <div className="flex flex-col gap-4">
        <FormField
          label="Proof of Employer Identification Number"
          helperText="This can be found on most tax documents from the IRS."
          htmlFor="docEIN"
        >
          <FileUpload value={data.proofOfEIN} onChange={set('proofOfEIN')} accept=".pdf,.jpg,.png" />
        </FormField>

        <FormField
          label="Incorporation Documents"
          helperText="Your articles of incorporation or business form from when you registered your business."
          htmlFor="docIncorp"
        >
          <FileUpload value={data.incorporationDocuments} onChange={set('incorporationDocuments')} accept=".pdf,.jpg,.png" />
        </FormField>

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

      <div className="flex gap-4">
        <Button variant="secondary" fullWidth onClick={onBack}>
          Go Back
        </Button>
        <Button variant="primary" fullWidth onClick={onFinish}>
          Finish
        </Button>
      </div>
    </div>
  );
}
