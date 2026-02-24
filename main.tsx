import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import OnboardingFlow from './OnboardingFlow';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OnboardingFlow />
  </StrictMode>
);
