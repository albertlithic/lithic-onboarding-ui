// Service and company classification
export type ServiceType = 'po' | 'pm';
export type CompanyType = 'public' | 'private' | 'other';
export type FlowPath = 'pm-private' | 'po-private' | 'public';

// Phase navigation
export type Phase = 'phase-1' | 'phase-2';
export type Phase1Section = 'welcome' | 'service-type' | 'industries' | 'business-details-1';
export type Phase2Section = 'business-details-2' | 'control-persons' | 'beneficial-owners' | 'authorized-signer' | 'financial-docs' | 'contacts';
export type ActiveSection = Phase1Section | Phase2Section | null;

// Hub section definition
export interface HubSectionDef {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
}

// Business Details Part 1 (Phase 1 - common)
export interface BusinessDetailsPart1Data {
  businessName: string;
  dba: string;
  taxId: string;
  website: string;
  companyType: CompanyType | null;
}

// Business Details Part 2 (Phase 2 - varies by path)
export interface BusinessDetailsPart2Data {
  country: string;
  streetAddress: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  employeeCount: string;
  naicsCodes: string;
}

// Person types
export type PersonRole = 'control-person' | 'beneficial-owner' | 'authorized-signer';
export type PersonStatus = 'pending' | 'invited' | 'completed';
export type CitizenshipStatus = 'us-citizen' | 'non-us-in-us' | 'non-us-outside-us';

export interface PersonData {
  id: string;
  role: PersonRole;
  status: PersonStatus;
  inviteEmail: string;
  // Common fields (all paths)
  countryOfResidence: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  title: string;
  // PM-Private + Public fields
  dateOfBirth: string;
  physicalAddress: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  // PM-Private only
  ownershipPercentage: string;
  citizenshipStatus: CitizenshipStatus | null;
  ssn: string;
  itin: string;
  passportNumber: string;
  passportCountry: string;
}

// Industries
export interface IndustriesData {
  cryptocurrencies: boolean;
  cbdCannabis: boolean;
  gambling: boolean;
  adultEntertainment: boolean;
  firearms: boolean;
}

// Contacts
export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ContactsData {
  technicalContact: ContactData;
  productUpdateContact: ContactData;
  sameAsTechnical: boolean;
}

// Financial documents
export interface FinancialDocsData {
  bankStatements: File | null;
  financialStatements: File | null;
}

// Root onboarding state
export interface OnboardingData {
  // Phase 1
  agreedToTerms: boolean;
  serviceType: ServiceType | null;
  industries: IndustriesData;
  businessDetailsPart1: BusinessDetailsPart1Data;
  // Phase 2
  businessDetailsPart2: BusinessDetailsPart2Data;
  persons: PersonData[];
  financialDocs: FinancialDocsData;
  contacts: ContactsData;
}

// Helper to resolve flow path
export function resolveFlowPath(serviceType: ServiceType | null, companyType: CompanyType | null): FlowPath | null {
  if (!serviceType || !companyType) return null;
  if (companyType === 'public') return 'public';
  if (serviceType === 'pm') return 'pm-private';
  return 'po-private';
}

// Helper to create empty person
export function createEmptyPerson(role: PersonRole): PersonData {
  return {
    id: Math.random().toString(36).slice(2),
    role,
    status: 'pending',
    inviteEmail: '',
    countryOfResidence: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    title: '',
    dateOfBirth: '',
    physicalAddress: '',
    unit: '',
    city: '',
    state: '',
    zip: '',
    ownershipPercentage: '',
    citizenshipStatus: null,
    ssn: '',
    itin: '',
    passportNumber: '',
    passportCountry: '',
  };
}

// Helper to create empty contact
export function createEmptyContact(): ContactData {
  return { firstName: '', lastName: '', email: '', phone: '' };
}
