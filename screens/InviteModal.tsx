'use client';

import { useState } from 'react';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import Input from '../components/Input';
import Button from '../components/Button';
import { PersonRole } from '../types';

interface InviteModalProps {
  open: boolean;
  onClose: () => void;
  role: PersonRole;
  onSendInvite: (name: string, email: string) => void;
}

const ROLE_INFO: Record<PersonRole, { title: string; description: string }> = {
  'control-person': {
    title: 'Control Person',
    description:
      'Invite the Control Person to provide their details. The control person is an individual with significant responsibility for managing the legal entity (e.g., CEO, CFO, COO, Managing Member, General Partner, President). This can be an executive, or someone who will have program-wide access to the cards that Lithic will provide.',
  },
  'beneficial-owner': {
    title: 'Beneficial Owner',
    description:
      'Invite a Beneficial Owner to provide their details. A beneficial owner is an individual who owns 25% or more (directly or indirectly) of the business.',
  },
  'authorized-signer': {
    title: 'Authorized Signer',
    description:
      'Invite the Authorized Signer to provide their details. This is the individual authorized to sign agreements on behalf of the company.',
  },
};

export default function InviteModal({ open, onClose, role, onSendInvite }: InviteModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const info = ROLE_INFO[role];

  const handleSend = () => {
    onSendInvite(name, email);
    setName('');
    setEmail('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="500px">
      <div className="flex flex-col gap-6">
        <h2
          className="text-2xl font-medium text-[var(--fg-strong)]"
          style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
        >
          {info.title}
        </h2>

        <p className="text-sm text-[var(--accent-fg)]">
          Invite the {info.title} to provide their details.
        </p>

        <p className="text-sm text-[var(--fg-default)] leading-relaxed">
          {info.description}
        </p>

        <FormField label="Name" htmlFor="invite-name">
          <Input
            id="invite-name"
            placeholder="John Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormField>

        <FormField label="Email" htmlFor="invite-email">
          <Input
            id="invite-email"
            placeholder="email@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>

        <div className="flex gap-4">
          <Button variant="secondary" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button variant="accent" fullWidth onClick={handleSend} disabled={!name || !email}>
            Send Invite
          </Button>
        </div>
      </div>
    </Modal>
  );
}
