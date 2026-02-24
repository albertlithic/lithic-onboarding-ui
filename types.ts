export type OnboardingStep =
  | 'start'
  | 'business-details'
  | 'control-person-invite'
  | 'control-person'
  | 'industries'
  | 'ownership'
  | 'document-collection';

export interface BusinessDetailsData {
  businessName: string;
  dba: string;
  taxIdNumber: string;
  country: string;
  streetAddress: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  website: string;
}

export interface ControlPersonData {
  countryOfResidence: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  streetAddress: string;
  unit: string;
  zipCode: string;
  phoneNumber: string;
  emailAddress: string;
}

export interface Owner {
  id: string;
  countryOfResidence: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssnLast4: string;
  ownershipPercentage: string;
  streetAddress: string;
  aptOrUnit: string;
  zip: string;
  phone: string;
}

export interface IndustriesData {
  cryptocurrencies: boolean;
  cbdCannabis: boolean;
  gambling: boolean;
  adultEntertainment: boolean;
  firearms: boolean;
}

export interface OwnershipData {
  isCharityOrNonProfit: boolean;
  controlPersonOwnership: string;
  owners: Owner[];
}

export interface DocumentsData {
  proofOfEIN: File | null;
  incorporationDocuments: File | null;
  bankStatements: File | null;
  financialStatements: File | null;
}

export interface OnboardingData {
  agreedToTerms: boolean;
  controlPersonChoice: 'self' | 'invite' | null;
  businessDetails: BusinessDetailsData;
  controlPerson: ControlPersonData;
  industries: IndustriesData;
  ownership: OwnershipData;
  documents: DocumentsData;
}
