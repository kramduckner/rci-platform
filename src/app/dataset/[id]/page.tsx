"use client";

import Header from "@/app/Header";
import { supabase } from "@/app/supabaseClient";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { useAuth } from "../../auth-context";
import Downloader from "../../Downloader";
import Sidebar from "../../Sidebar"
import { useEffect, useState } from "react";




export default function CardDetail({ params }: any) {
  const { user }:any = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dataset, setDataset] = useState<any>(null);
  const [access, setAccess]: any = useState("No Access");
  const [loading, setLoading] = useState(true);
  const datasetId = params.id;


  const fetchAccessStatus = async () => {
    const { data: accessData }: any = await supabase
          .from("dataset_access_requests")
          .select("*")
          .eq("dataset_id", datasetId)
          .eq("user_id", user.id);
    
    setAccess(accessData[0]?.status || "No Access");
  };


  useEffect(() => {
    if (user && datasetId) {
      recordDatasetAccess();
    }

    async function recordDatasetAccess() {
      
      const { data: existing, error } = await supabase
            .from("dataset_access")
            .select("*")
            .eq("user_id", user.id)
            .eq("dataset_id", datasetId)
            .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error checking access:", error);
        return;
      }

      if (existing) {
        // Update last_access timestamp
        const { error: updateError } = await supabase
              .from("dataset_access")
              .update({ last_access: new Date().toISOString() })
              .eq("user_id", user.id)
              .eq("dataset_id", datasetId);

        if (updateError) console.error("Error updating last_access:", updateError);
      } else {
        // Insert new access record
        const { error: insertError } = await supabase
              .from("dataset_access")
              .insert({
                user_id: user.id,
                dataset_id: datasetId,
                last_access: new Date().toISOString(),
              });

        if (insertError) console.error("Error inserting dataset access:", insertError);
      }
    }
  }, [user, datasetId]);


  

  useEffect(() => {
    const fetchDataset = async () => {
      const { data, error } = await supabase
            .from("datasets")
            .select("*")
            .eq("id", datasetId);

      if (error || !data || data.length === 0) {
        return;
      }

      setDataset(data[0]);

      if (user) {
        await fetchAccessStatus();
      }

      setLoading(false);
    };

    fetchDataset();
  }, [datasetId, user]);

  const requestAccess = async () => {
    if (!user) return;

    await supabase.from("dataset_access_requests").insert({
      dataset_id: datasetId,
      user_id: user.id,
    });

    
    await fetchAccessStatus();
  };


  if (loading) return <div className="p-10">Loading...</div>;
  if (!dataset) return <div className="p-10">Dataset not found</div>;
  
  return (
    <>
      <Header onOpenSidebar={() => setSidebarOpen(true)}/>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex py-10">

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          <div className="border-b pb-6 mb-10">
            <h1 className="text-4xl font-bold text-gray-900">{dataset.title}</h1>
            <p className="text-gray-600 mt-2">Created on {new Date(dataset.created_at).toLocaleDateString()}</p>
          </div>
          <section className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">About this data</h2>
                <p className="text-gray-700 mb-2">{dataset.description}</p>
                <p className="text-gray-600 text-sm">Published by: {dataset.publisher}</p>

                <div className="mt-4 flex gap-4 items-center flex-wrap">
                  {dataset.looker_url && (
                    <a
                      href={dataset.looker_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm inline-block px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                      View in Looker Studio
                    </a>
                  )}

                  {user ? (
                    access === "Approved" ? (
                      <Downloader bucket={dataset.bucket} filePath={dataset.path} />
                    ) : (
                      <Button
                        onClick={requestAccess}
                        disabled={access === "Pending"}
                        className="text-sm inline-block px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 cursor-pointer"
                      >
                        {access === "Pending" ? "Request Pending" : "Request Access" }
                      </Button>
                    )
                  ) : (
                    <Link href="/signup">
                      <Button className="text-sm inline-block px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700">
                        Sign up to get access
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Right Column: Additional Info */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Dataset Overview</h2>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li><strong>Category:</strong> {dataset.category || "Uncategorized"}</li>
                  <li><strong>Region</strong> {dataset.region || "None"}</li>
                  <li><strong>Last Updated:</strong> {new Date(dataset.created_at).toLocaleDateString() || "N/A"}</li>
                  <li><strong>Rows:</strong> {dataset.number_of_rows || "Unknown"}</li>
                  <li><strong>Format:</strong> {dataset.format || "Unknown"}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Looker Studio Embed */}
          {dataset.looker_url && (
            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Left: Title and context */}
                <div className="md:col-span-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Explore this data</h2>
                  <p className="text-gray-600 text-sm">
                    Interact with charts and visualizations generated from this dataset.
                  </p>
                </div>

                {/* Right: Looker iframe */}
                <div className="md:col-span-3">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={dataset.looker_url}
                      title="Looker Studio Report"
                      className="w-full h-[600px] rounded border"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
      
    </>
  );
}
