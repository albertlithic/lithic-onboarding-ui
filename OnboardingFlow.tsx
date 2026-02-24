'use client';

import { useState } from 'react';
import Header from './Header';
import OnboardingStart from './screens/OnboardingStart';
import BusinessDetails from './screens/BusinessDetails';
import ControlPersonInvite from './screens/ControlPersonInvite';
import ControlPerson from './screens/ControlPerson';
import Industries from './screens/Industries';
import Ownership from './screens/Ownership';
import DocumentCollection from './screens/DocumentCollection';
import { OnboardingData, OnboardingStep } from './types';

const STEP_CONFIG: Record<OnboardingStep, { step: number; total: number }> = {
  'start':                  { step: 1, total: 2 },
  'business-details':       { step: 1, total: 5 },
  'control-person-invite':  { step: 2, total: 5 },
  'control-person':         { step: 2, total: 5 },
  'industries':             { step: 3, total: 5 },
  'ownership':              { step: 4, total: 5 },
  'document-collection':    { step: 5, total: 5 },
};

const INITIAL_DATA: OnboardingData = {
  agreedToTerms: false,
  controlPersonChoice: null,
  businessDetails: {
    businessName: '', dba: '', taxIdNumber: '', country: 'United States',
    streetAddress: '', unit: '', city: '', state: '', zip: '', website: '',
  },
  controlPerson: {
    countryOfResidence: '', firstName: '', lastName: '', dateOfBirth: '',
    ssn: '', streetAddress: '', unit: '', zipCode: '', phoneNumber: '', emailAddress: '',
  },
  industries: {
    cryptocurrencies: false, cbdCannabis: false, gambling: false,
    adultEntertainment: false, firearms: false,
  },
  ownership: {
    isCharityOrNonProfit: false,
    controlPersonOwnership: '',
    owners: [],
  },
  documents: {
    proofOfEIN: null, incorporationDocuments: null,
    bankStatements: null, financialStatements: null,
  },
};

export default function OnboardingFlow() {
  const [step, setStep] = useState<OnboardingStep>('start');
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);
  const [completed, setCompleted] = useState(false);

  const { step: currentStep, total: totalSteps } = STEP_CONFIG[step];

  const handleFinishLater = () => {
    // In a real app: persist state and navigate away
    console.log('Finish later', data);
  };

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

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col">
      <Header
        currentStep={currentStep}
        totalSteps={totalSteps}
        onFinishLater={handleFinishLater}
      />

      <main className="flex-1 flex justify-center py-10 px-4 overflow-y-auto">
        <div className="w-full max-w-[400px]">
          {step === 'start' && (
            <OnboardingStart
              agreedToTerms={data.agreedToTerms}
              onAgreementChange={(agreed) => setData({ ...data, agreedToTerms: agreed })}
              onContinue={() => setStep('business-details')}
            />
          )}

          {step === 'business-details' && (
            <BusinessDetails
              data={data.businessDetails}
              onChange={(businessDetails) => setData({ ...data, businessDetails })}
              onContinue={() => setStep('control-person-invite')}
            />
          )}

          {step === 'control-person-invite' && (
            <ControlPersonInvite
              choice={data.controlPersonChoice}
              onChange={(controlPersonChoice) => setData({ ...data, controlPersonChoice })}
              onBack={() => setStep('business-details')}
              onContinue={() => setStep('control-person')}
            />
          )}

          {step === 'control-person' && (
            <ControlPerson
              data={data.controlPerson}
              onChange={(controlPerson) => setData({ ...data, controlPerson })}
              onBack={() => setStep('control-person-invite')}
              onContinue={() => setStep('industries')}
            />
          )}

          {step === 'industries' && (
            <Industries
              data={data.industries}
              onChange={(industries) => setData({ ...data, industries })}
              onBack={() => setStep('control-person')}
              onContinue={() => setStep('ownership')}
            />
          )}

          {step === 'ownership' && (
            <Ownership
              data={data.ownership}
              onChange={(ownership) => setData({ ...data, ownership })}
              onBack={() => setStep('industries')}
              onContinue={() => setStep('document-collection')}
            />
          )}

          {step === 'document-collection' && (
            <DocumentCollection
              data={data.documents}
              onChange={(documents) => setData({ ...data, documents })}
              onBack={() => setStep('ownership')}
              onFinish={() => setCompleted(true)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
