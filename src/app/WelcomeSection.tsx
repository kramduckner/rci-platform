'use client';

import { useAuth } from './auth-context';

export default function WelcomeSection({ recentDataset, userAccessedDatasets }:any) {
  const { user } = useAuth();

  return (
    <div className="bg-white border rounded-lg p-6 mb-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-3 text-gray-900">Welcome, {user?.email || "Researcher"}</h2>
      <p className="text-gray-700 text-lg leading-relaxed">
        Your gateway to comprehensive caregiver research datasets. This portal provides 
        a centralized platform where researchers, clinicians, and stakeholders can 
        request access to valuable caregiver data, explore available datasets, and 
        gain insights that advance our understanding of caregiving dynamics and outcomes.  
      </p>
    </div>
  );
}
