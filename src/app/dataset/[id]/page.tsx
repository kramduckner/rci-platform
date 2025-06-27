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
      <div className="py-10">
        <main>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
            <div className="flex-1 ml-8">
              <div className="flex items-center mb-6">
                <Link
                  href="/"
                  className="text-sky-600 hover:text-sky-800 mr-2"
                >
                  ← Back to Dashboard
                </Link>
              </div>
              <div className="w-100 px-4 py-5 border border-gray-300 overflow-hidden rounded-lg bg-white shadow-md">
                <header className="text-xl mb-8 font-bold sm:px-6">
                  {dataset.title}
                </header>

                <h2 className="font-bold">Dataset Overview</h2>
                <div className="sm:px-6">Created Date: {dataset.created_at}</div>
                <div className="sm:px-6">Description: {dataset.description}</div>
                <div className="sm:p-6">Publisher: {dataset.publisher}</div>

                <div className="sm:p-6 flex gap-4 mt-4 items-center">
                  <Button className="text-sm inline-block px-4 py-2 rounded cursor-pointer">View in Looker Studio</Button>

                  {user ? (
                    hasAccess ? (
                      <Downloader
                        bucket={dataset.bucket}
                        filePath={dataset.path}
                      />
                    ) : (
                      <Button onClick={requestAccess} className="text-sm inline-block px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 cursor-pointer">
                        Request Access
                      </Button>
                    )
                  ) : (
                    <Link href="/signup">
                      <Button>Sign up to get access</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
