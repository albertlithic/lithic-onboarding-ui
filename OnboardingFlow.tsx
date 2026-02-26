'use client';

import { useState } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import OnboardingHeader from './layouts/OnboardingHeader';
import MagicLinkHeader from './layouts/MagicLinkHeader';
import PhaseHub from './screens/PhaseHub';
import OnboardingStart from './screens/OnboardingStart';
import ServiceType from './screens/ServiceType';
import Industries from './screens/Industries';
import BusinessDetailsPart1 from './screens/BusinessDetailsPart1';
import BusinessDetailsPart2 from './screens/BusinessDetailsPart2';
import ControlPersonOwners from './screens/ControlPersonOwners';
import PersonList from './screens/PersonList';
import PersonDetails from './screens/PersonDetails';
import DocumentCollection from './screens/DocumentCollection';
import Contacts from './screens/Contacts';
import OtpLogin from './screens/OtpLogin';
import MagicLinkForm from './screens/MagicLinkForm';
import MoreInfoModal from './screens/MoreInfoModal';
import {
  OnboardingData,
  Phase,
  ActiveSection,
  FlowPath,
  HubSectionDef,
  ViewMode,
  ExternalInviteeStep,
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
  charityNonProfitExemption: false,
  hasUbos: true,
};

// ─── Completion Checks ───────────────────────────────────────────

function isPhase1WelcomeComplete(data: OnboardingData): boolean {
  return data.agreedToTerms;
}

function isPhase1ServiceTypeComplete(data: OnboardingData): boolean {
  return data.serviceType !== null;
}

function isPhase1IndustriesComplete(_data: OnboardingData): boolean {
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
    return signers.length > 0 && signers.every((p) => p.status === 'completed' || p.status === 'submitted');
  }
  if (data.charityNonProfitExemption) {
    const cps = data.persons.filter((p) => p.role === 'control-person');
    return cps.length > 0 && cps.every((p) => p.status === 'completed' || p.status === 'submitted');
  }
  const cps = data.persons.filter((p) => p.role === 'control-person');
  const bos = data.persons.filter((p) => p.role === 'beneficial-owner');
  const cpsDone = cps.length > 0 && cps.every((p) => p.status === 'completed' || p.status === 'submitted');
  const bosDone = data.hasUbos === false || (bos.length > 0 && bos.every((p) => p.status === 'completed' || p.status === 'submitted'));
  return cpsDone && bosDone;
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
      title: 'Agreements',
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
      title: "What You're Building",
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
    sections.push({
      id: 'control-persons',
      title: 'Control Person & Owners',
      description: 'Add control persons and beneficial owners',
      isComplete: isPhase2PeopleComplete(data, flowPath),
    });
  }

  if (flowPath === 'pm-private') {
    sections.push({
      id: 'financial-docs',
      title: 'Business Documents',
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
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());

  // External invitee state
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [externalStep, setExternalStep] = useState<ExternalInviteeStep>('otp');
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);

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

  // ─── External Invitee Flow ─────────
  if (viewMode === 'external-invitee') {
    return (
      <div className="min-h-screen bg-[var(--bg-default)] flex flex-col">
        <MagicLinkHeader onMoreInfo={() => setMoreInfoOpen(true)} />
        <main className="flex-1 flex flex-col">
          {externalStep === 'otp' ? (
            <OtpLogin
              maskedEmail="e***@example.com"
              onSubmit={() => setExternalStep('form')}
              onResend={() => {}}
              onMoreInfo={() => setMoreInfoOpen(true)}
            />
          ) : (
            <MagicLinkForm
              inviterEmail="lucy@example.com"
              role="beneficial-owner"
              onSubmit={(personData) => {
                setData({
                  ...data,
                  persons: data.persons.map((p) =>
                    p.inviteEmail === personData.email ? { ...personData, status: 'submitted' } : p
                  ),
                });
                setViewMode('main');
              }}
            />
          )}
        </main>
        <MoreInfoModal open={moreInfoOpen} onClose={() => setMoreInfoOpen(false)} />
      </div>
    );
  }

  // ─── Completion ────────────────────

  if (completed) {
    return (
      <DashboardLayout completedSteps={0} totalSteps={0}>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-[400px] flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-strong-bg)] flex items-center justify-center">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <path d="M2 8L8 14L18 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1
              className="text-2xl font-medium text-[var(--fg-strong)]"
              style={{ fontFamily: "'ABC Monument Grotesk', sans-serif" }}
            >
              Application Submitted
            </h1>
            <p className="text-sm text-[var(--fg-default)] leading-relaxed">
              Thank you for completing the onboarding process. Our compliance
              team will review your information and reach out within 2–3 business days.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ─── Progress Calculation ──────────

  const currentSections = phase === 'phase-1'
    ? getPhase1Sections(data)
    : flowPath ? getPhase2Sections(data, flowPath) : [];

  const adjustedSections = currentSections.map((s) => {
    if (s.id === 'industries') {
      return { ...s, isComplete: visitedSections.has('industries') };
    }
    return s;
  });

  const completedCount = adjustedSections.filter((s) => s.isComplete).length;
  const totalCount = adjustedSections.length;

  // ─── Render Step Content ───────────

  const renderStepContent = () => {
    // Phase 1 sections
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

    // Person Details (editing a specific person)
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

    // Phase 2 sections
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
          // Combined Control Person & Owners screen for private flows
          return (
            <ControlPersonOwners
              persons={data.persons}
              charityNonProfitExemption={data.charityNonProfitExemption}
              hasUbos={data.hasUbos}
              onChange={(updates) => setData({ ...data, ...updates })}
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

  // ─── Main Render ───────────────────

  const isOnHub = activeSection === null && !editingPersonId;

  return (
    <DashboardLayout
      completedSteps={completedCount}
      totalSteps={totalCount}
    >
      {isOnHub ? (
        // Hub view — no step header
        <div className="px-12 py-6">
          <div className="max-w-[640px]">
            {phase === 'phase-1' ? (
              <PhaseHub
                title="Onboarding"
                description="You can complete the onboarding steps below in any order. Once complete, submit your program for approval by our team before you go live."
                sections={adjustedSections}
                onSectionClick={(id) => {
                  setActiveSection(id as ActiveSection);
                  markVisited(id);
                }}
                onContinue={() => setPhase('phase-2')}
                continueLabel="Continue Onboarding"
              />
            ) : flowPath ? (
              <PhaseHub
                title="Onboarding"
                description="You can complete the onboarding steps below in any order. Once complete, submit your program for approval by our team before you go live."
                sections={adjustedSections}
                onSectionClick={(id) => setActiveSection(id as ActiveSection)}
                onContinue={() => setCompleted(true)}
                continueLabel="Submit Application"
              />
            ) : null}
          </div>
        </div>
      ) : (
        // Step view — with header
        <>
          <OnboardingHeader
            phase={phase}
            completedSections={completedCount}
            totalSections={totalCount}
            onLeave={goToHub}
          />
          <div className="px-12 py-10">
            <div className="max-w-[400px] mx-auto">
              {renderStepContent()}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
