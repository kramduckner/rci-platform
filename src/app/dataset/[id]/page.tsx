"use client";

import Header from "@/app/Header";
import { supabase } from "@/app/supabaseClient";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { useAuth } from "../../auth-context";
import Downloader from "../../Downloader";
import { useEffect, useState } from "react";

export default function CardDetail({ params }: any) {
  const { user } = useAuth();
  const [dataset, setDataset] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const datasetId = params.id;

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
        const { data: accessData } = await supabase
              .from("dataset_access_requests")
              .select("*")
              .eq("dataset_id", datasetId)
              .eq("user_id", user.id);

        setHasAccess((accessData || []).length > 0);
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
    alert("Access request submitted.");
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (!dataset) return <div className="p-10">Dataset not found</div>;

  return (
    <>
      <Header />
      <div className="py-10 bg-gray-50 min-h-screen">
        <main>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Link href="/" className="text-sky-600 hover:text-sky-800">
                ← Back to Dashboard
              </Link>
            </div>

            {/* Header with border */}
            <div className="border-b pb-6 mb-10">
              <h1 className="text-4xl font-bold text-gray-900">{dataset.title}</h1>
              <p className="text-gray-600 mt-2">Created on {new Date(dataset.created_at).toLocaleDateString()}</p>
            </div>

            {/* About this data + Additional Info */}
            <section className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: About */}
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
                      hasAccess ? (
                        <Downloader bucket={dataset.bucket} filePath={dataset.path} />
                      ) : (
                        <Button
                          onClick={requestAccess}
                          className="text-sm inline-block px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 cursor-pointer"
                        >
                          Request Access
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
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Additional Information</h2>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li><strong>Category:</strong> {dataset.category || "Uncategorized"}</li>
                    <li><strong>Tags:</strong> {dataset.tags?.join(', ') || "None"}</li>
                    <li><strong>Frequency:</strong> {dataset.update_frequency || "Unknown"}</li>
                    <li><strong>Last Updated:</strong> {new Date(dataset.updated_at).toLocaleDateString() || "N/A"}</li>
                    <li><strong>Rows:</strong> {dataset.row_count || "Unknown"}</li>
                    <li><strong>File Size:</strong> {dataset.size || "Unknown"}</li>
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
      </div>
    </>
  );
}
