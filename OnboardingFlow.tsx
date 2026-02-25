'use client';

import { useState } from 'react';
import Header from './Header';
import PhaseHub from './screens/PhaseHub';
import OnboardingStart from './screens/OnboardingStart';
import ServiceType from './screens/ServiceType';
import Industries from './screens/Industries';
import BusinessDetailsPart1 from './screens/BusinessDetailsPart1';
import BusinessDetailsPart2 from './screens/BusinessDetailsPart2';
import PersonList from './screens/PersonList';
import PersonDetails from './screens/PersonDetails';
import DocumentCollection from './screens/DocumentCollection';
import Contacts from './screens/Contacts';
import {
  OnboardingData,
  Phase,
  ActiveSection,
  FlowPath,
  HubSectionDef,
  resolveFlowPath,
  createEmptyContact,
} from './types';

// ─── Initial State ───────────────────────────────────────────────

const INITIAL_DATA: OnboardingData = {
  agreedToTerms: false,
  serviceType: null,
  industries: {
    cryptocurrencies: false,
    cbdCannabis: false,
    gambling: false,
    adultEntertainment: false,
    firearms: false,
  },
  businessDetailsPart1: {
    businessName: '',
    dba: '',
    taxId: '',
    website: '',
    companyType: null,
  },
  businessDetailsPart2: {
    country: '',
    streetAddress: '',
    unit: '',
    city: '',
    state: '',
    zip: '',
    employeeCount: '',
    naicsCodes: '',
  },
  persons: [],
  financialDocs: {
    bankStatements: null,
    financialStatements: null,
  },
  contacts: {
    technicalContact: createEmptyContact(),
    productUpdateContact: createEmptyContact(),
    sameAsTechnical: false,
  },
};

// ─── Completion Checks ───────────────────────────────────────────

function isPhase1WelcomeComplete(data: OnboardingData): boolean {
  return data.agreedToTerms;
}

function isPhase1ServiceTypeComplete(data: OnboardingData): boolean {
  return data.serviceType !== null;
}

function isPhase1IndustriesComplete(_data: OnboardingData): boolean {
  // Industries is always "complete" once visited (any combination is valid)
  return true;
}

function isPhase1BusinessDetailsComplete(data: OnboardingData): boolean {
  const bd = data.businessDetailsPart1;
  return !!(bd.businessName && bd.taxId && bd.companyType);
}

function isPhase2BusinessDetailsComplete(data: OnboardingData, flowPath: FlowPath): boolean {
  const bd = data.businessDetailsPart2;
  if (flowPath === 'public') return !!bd.naicsCodes;
  return !!(bd.country && bd.streetAddress && bd.naicsCodes);
}

function isPhase2PeopleComplete(data: OnboardingData, flowPath: FlowPath): boolean {
  if (flowPath === 'public') {
    const signers = data.persons.filter((p) => p.role === 'authorized-signer');
    return signers.length > 0 && signers.every((p) => p.status === 'completed');
  }
  const cps = data.persons.filter((p) => p.role === 'control-person');
  const bos = data.persons.filter((p) => p.role === 'beneficial-owner');
  return (
    cps.length > 0 && cps.every((p) => p.status === 'completed') &&
    bos.length > 0 && bos.every((p) => p.status === 'completed')
  );
}

function isPhase2FinancialDocsComplete(data: OnboardingData): boolean {
  return !!(data.financialDocs.bankStatements && data.financialDocs.financialStatements);
}

function isPhase2ContactsComplete(data: OnboardingData): boolean {
  const tc = data.contacts.technicalContact;
  const pc = data.contacts.productUpdateContact;
  return !!(tc.firstName && tc.email && pc.firstName && pc.email);
}

// ─── Hub Section Builders ────────────────────────────────────────

function getPhase1Sections(data: OnboardingData): HubSectionDef[] {
  return [
    {
      id: 'welcome',
      title: 'Legal & Compliance',
      description: 'Review and agree to authorizations',
      isComplete: isPhase1WelcomeComplete(data),
    },
    {
      id: 'service-type',
      title: 'Service Type',
      description: 'Choose Program Managed or Processor Only',
      isComplete: isPhase1ServiceTypeComplete(data),
    },
    {
      id: 'industries',
      title: 'Industries',
      description: 'Identify applicable business categories',
      isComplete: isPhase1IndustriesComplete(data),
    },
    {
      id: 'business-details-1',
      title: 'Business Details',
      description: 'Basic company information',
      isComplete: isPhase1BusinessDetailsComplete(data),
    },
  ];
}

function getPhase2Sections(data: OnboardingData, flowPath: FlowPath): HubSectionDef[] {
  const sections: HubSectionDef[] = [
    {
      id: 'business-details-2',
      title: 'Additional Business Details',
      description: flowPath === 'public' ? 'Employee count and industry codes' : 'Address, employee count, and industry codes',
      isComplete: isPhase2BusinessDetailsComplete(data, flowPath),
    },
  ];

  if (flowPath === 'public') {
    sections.push({
      id: 'authorized-signer',
      title: 'Authorized Signer',
      description: 'Identify and provide signer details',
      isComplete: isPhase2PeopleComplete(data, flowPath),
    });
  } else {
    sections.push(
      {
        id: 'control-persons',
        title: 'Control Persons',
        description: 'Add individuals with management responsibility',
        isComplete: data.persons.filter((p) => p.role === 'control-person').length > 0 &&
          data.persons.filter((p) => p.role === 'control-person').every((p) => p.status === 'completed'),
      },
      {
        id: 'beneficial-owners',
        title: 'Beneficial Owners',
        description: 'Add owners with 25%+ ownership',
        isComplete: data.persons.filter((p) => p.role === 'beneficial-owner').length > 0 &&
          data.persons.filter((p) => p.role === 'beneficial-owner').every((p) => p.status === 'completed'),
      },
    );
  }

  if (flowPath === 'pm-private') {
    sections.push({
      id: 'financial-docs',
      title: 'Financial Documents',
      description: 'Bank statements and financial records',
      isComplete: isPhase2FinancialDocsComplete(data),
    });
  }

  sections.push({
    id: 'contacts',
    title: 'Contacts',
    description: 'Technical and product update contacts',
    isComplete: isPhase2ContactsComplete(data),
  });

  return sections;
}

// ─── Component ───────────────────────────────────────────────────

export default function OnboardingFlow() {
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);
  const [phase, setPhase] = useState<Phase>('phase-1');
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [editingPersonId, setEditingPersonId] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  // Track which Phase 1 sections have been visited (for Industries always-complete logic)
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());

  const flowPath = resolveFlowPath(data.serviceType, data.businessDetailsPart1.companyType);

  const handleFinishLater = () => {
    console.log('Finish later', data);
  };

  const markVisited = (sectionId: string) => {
    setVisitedSections((prev) => new Set(prev).add(sectionId));
  };

  const goToHub = () => {
    setActiveSection(null);
    setEditingPersonId(null);
  };

  // ─── Completion ────────────────────

  if (completed) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="w-[400px] flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#3F54BF] flex items-center justify-center">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <path d="M2 8L8 14L18 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1
            className="text-[#F0F0F0] text-2xl font-medium"
            style={{ fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif" }}
          >
            Application Submitted
          </h1>
          <p className="text-[#AAAAAA] text-sm leading-relaxed">
            Thank you for completing the onboarding process. Our compliance
            team will review your information and reach out within 2–3 business days.
          </p>
        </div>
      </div>
    );
  }

  // ─── Progress Calculation ──────────

  const currentSections = phase === 'phase-1'
    ? getPhase1Sections(data)
    : flowPath ? getPhase2Sections(data, flowPath) : [];

  // Override industries completion with visited tracking
  const adjustedSections = currentSections.map((s) => {
    if (s.id === 'industries') {
      return { ...s, isComplete: visitedSections.has('industries') };
    }
    return s;
  });

  const completedCount = adjustedSections.filter((s) => s.isComplete).length;
  const totalCount = adjustedSections.length;

  // ─── Render ────────────────────────

  const renderContent = () => {
    // ── Phase 1 Hub ──
    if (phase === 'phase-1' && activeSection === null) {
      return (
        <PhaseHub
          title="Getting Started"
          description="Complete each section below to proceed. You can fill them out in any order."
          sections={adjustedSections}
          onSectionClick={(id) => {
            setActiveSection(id as ActiveSection);
            markVisited(id);
          }}
          onContinue={() => setPhase('phase-2')}
          continueLabel="Continue to Next Phase"
        />
      );
    }

    // ── Phase 1 Sections ──
    if (phase === 'phase-1') {
      switch (activeSection) {
        case 'welcome':
          return (
            <OnboardingStart
              agreedToTerms={data.agreedToTerms}
              onAgreementChange={(agreed) => setData({ ...data, agreedToTerms: agreed })}
              onSave={goToHub}
            />
          );
        case 'service-type':
          return (
            <ServiceType
              value={data.serviceType}
              onChange={(serviceType) => setData({ ...data, serviceType })}
              onSave={goToHub}
            />
          );
        case 'industries':
          return (
            <Industries
              data={data.industries}
              onChange={(industries) => setData({ ...data, industries })}
              onSave={goToHub}
            />
          );
        case 'business-details-1':
          return (
            <BusinessDetailsPart1
              data={data.businessDetailsPart1}
              onChange={(businessDetailsPart1) => setData({ ...data, businessDetailsPart1 })}
              onSave={goToHub}
            />
          );
      }
    }

    // ── Phase 2 Hub ──
    if (phase === 'phase-2' && activeSection === null && !editingPersonId) {
      if (!flowPath) {
        // Shouldn't happen, but guard
        setPhase('phase-1');
        return null;
      }
      return (
        <PhaseHub
          title={flowPath === 'public' ? 'Public Company Details' : flowPath === 'pm-private' ? 'Program Managed Details' : 'Processor Only Details'}
          description="Complete each section below. You can fill them out in any order."
          sections={adjustedSections}
          onSectionClick={(id) => setActiveSection(id as ActiveSection)}
          onContinue={() => setCompleted(true)}
          continueLabel="Submit Application"
        />
      );
    }

    // ── Person Details (editing a specific person) ──
    if (editingPersonId) {
      const person = data.persons.find((p) => p.id === editingPersonId);
      if (!person || !flowPath) return null;
      return (
        <PersonDetails
          person={person}
          flowPath={flowPath}
          onChange={(updated) => {
            setData({
              ...data,
              persons: data.persons.map((p) => p.id === updated.id ? updated : p),
            });
          }}
          onSave={() => {
            // Mark person as completed
            setData({
              ...data,
              persons: data.persons.map((p) =>
                p.id === editingPersonId ? { ...p, status: 'completed' as const } : p
              ),
            });
            setEditingPersonId(null);
          }}
          onBack={() => setEditingPersonId(null)}
        />
      );
    }

    // ── Phase 2 Sections ──
    if (phase === 'phase-2' && flowPath) {
      switch (activeSection) {
        case 'business-details-2':
          return (
            <BusinessDetailsPart2
              data={data.businessDetailsPart2}
              flowPath={flowPath}
              onChange={(businessDetailsPart2) => setData({ ...data, businessDetailsPart2 })}
              onSave={goToHub}
            />
          );
        case 'control-persons':
          return (
            <PersonList
              role="control-person"
              persons={data.persons}
              onChange={(persons) => setData({ ...data, persons })}
              onEditPerson={(id) => setEditingPersonId(id)}
              onSave={goToHub}
            />
          );
        case 'beneficial-owners':
          return (
            <PersonList
              role="beneficial-owner"
              persons={data.persons}
              onChange={(persons) => setData({ ...data, persons })}
              onEditPerson={(id) => setEditingPersonId(id)}
              onSave={goToHub}
            />
          );
        case 'authorized-signer':
          return (
            <PersonList
              role="authorized-signer"
              persons={data.persons}
              onChange={(persons) => setData({ ...data, persons })}
              onEditPerson={(id) => setEditingPersonId(id)}
              onSave={goToHub}
            />
          );
        case 'financial-docs':
          return (
            <DocumentCollection
              data={data.financialDocs}
              onChange={(financialDocs) => setData({ ...data, financialDocs })}
              onSave={goToHub}
            />
          );
        case 'contacts':
          return (
            <Contacts
              data={data.contacts}
              onChange={(contacts) => setData({ ...data, contacts })}
              onSave={goToHub}
            />
          );
      }
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col">
      <Header
        phase={phase}
        completedSections={completedCount}
        totalSections={totalCount}
        onFinishLater={handleFinishLater}
        onBackToHub={activeSection || editingPersonId ? goToHub : undefined}
      />

      <main className="flex-1 flex justify-center py-10 px-4 overflow-y-auto">
        <div className="w-full max-w-[400px]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
