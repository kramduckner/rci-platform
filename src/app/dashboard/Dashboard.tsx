"use client"

import { useState } from 'react';
import Header from "../Header";
import Sidebar from "../Sidebar";
import WelcomeSection from "../WelcomeSection";
import StatsCards from "../StatsCards";
import { supabase } from "../supabaseClient";

export default async function Dashboard({data}:any) {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const recentDataset = data?.toSorted((a:any, b:any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
    
  return (
    <>
      <Header onOpenSidebar={() => setSidebarOpen(true)}/>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex py-10">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">RCI Data Discovery Dashboard</h1>
          <WelcomeSection />
          <StatsCards
            recentDataset={recentDataset}
            totalDatasets={data.length}
            accessibleDatasetsCount={1}
          />
        </div>
      </main>
    </>
  );
}
