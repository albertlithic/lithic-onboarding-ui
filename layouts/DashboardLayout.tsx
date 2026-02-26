'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  completedSteps: number;
  totalSteps: number;
  userEmail?: string;
}

export default function DashboardLayout({
  children,
  completedSteps,
  totalSteps,
  userEmail,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[var(--bg-canvas)]">
      <Sidebar
        completedSteps={completedSteps}
        totalSteps={totalSteps}
        userEmail={userEmail}
      />
      <main className="flex-1 ml-60 overflow-y-auto">{children}</main>
    </div>
  );
}
