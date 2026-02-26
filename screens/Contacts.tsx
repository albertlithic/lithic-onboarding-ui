'use client';

import FormField from '../components/FormField';
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import { ContactsData, ContactData } from '../types';

interface ContactsProps {
  data: ContactsData;
  onChange: (data: ContactsData) => void;
  onSave: () => void;
}

function ContactSection({
  title,
  contact,
  prefix,
  onChange,
  disabled,
}: {
  title: string;
  contact: ContactData;
  prefix: string;
  onChange: (contact: ContactData) => void;
  disabled?: boolean;
}) {
  const set = (field: keyof ContactData) => (
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...contact, [field]: e.target.value })
  );

  return (
    <div className="flex flex-col gap-4">
      <h2
        className="text-[var(--fg-strong)] text-lg font-medium font-display"
        style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
      >
        {title}
      </h2>

      <FormField label="First Name" htmlFor={`${prefix}FirstName`}>
        <Input
          id={`${prefix}FirstName`}
          placeholder="Given Name"
          value={contact.firstName}
          onChange={set('firstName')}
          disabled={disabled}
        />
      </FormField>

      <FormField label="Last Name" htmlFor={`${prefix}LastName`}>
        <Input
          id={`${prefix}LastName`}
          placeholder="Family Name"
          value={contact.lastName}
          onChange={set('lastName')}
          disabled={disabled}
        />
      </FormField>

      <FormField label="Email" htmlFor={`${prefix}Email`}>
        <Input
          id={`${prefix}Email`}
          placeholder="email@example.com"
          type="email"
          value={contact.email}
          onChange={set('email')}
          disabled={disabled}
        />
      </FormField>

      <FormField label="Phone" htmlFor={`${prefix}Phone`}>
        <Input
          id={`${prefix}Phone`}
          placeholder="(123) 456-7890"
          type="tel"
          value={contact.phone}
          onChange={set('phone')}
          disabled={disabled}
        />
      </FormField>
    </div>
  );
}

export default function Contacts({ data, onChange, onSave }: ContactsProps) {
  const handleSameToggle = (checked: boolean) => {
    if (checked) {
      onChange({
        ...data,
        sameAsTechnical: true,
        productUpdateContact: { ...data.technicalContact },
      });
    } else {
      onChange({ ...data, sameAsTechnical: false });
    }
  };

  const handleTechnicalChange = (technicalContact: ContactData) => {
    if (data.sameAsTechnical) {
      onChange({ ...data, technicalContact, productUpdateContact: { ...technicalContact } });
    } else {
      onChange({ ...data, technicalContact });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-[var(--fg-strong)] text-2xl font-medium font-display"
        style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
      >
        Contacts
      </h1>

      <p className="text-[var(--fg-default)] text-sm leading-relaxed">
        Provide contact information for your technical and product update contacts.
      </p>

      <ContactSection
        title="Technical Contact"
        contact={data.technicalContact}
        prefix="tech"
        onChange={handleTechnicalChange}
      />

      <div className="border-t border-[var(--border-default)] pt-4">
        <Checkbox
          checked={data.sameAsTechnical}
          onChange={handleSameToggle}
          label="Same as Technical Contact"
        />
      </div>

      <ContactSection
        title="Product Update Contact"
        contact={data.productUpdateContact}
        prefix="product"
        onChange={(productUpdateContact) => onChange({ ...data, productUpdateContact })}
        disabled={data.sameAsTechnical}
      />

      <Button variant="primary" fullWidth onClick={onSave}>
        Save &amp; Return to Checklist
      </Button>
    </div>
  );
}
