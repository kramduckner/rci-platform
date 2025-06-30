"use client";

import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { useAuth } from "../../auth-context";
import { supabase } from "../../supabaseClient";
import { useEffect, useState } from "react";

const DataRequestsPanel = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
            .from("dataset_access_requests")
            .select(`*, datasets(*)`)
            .eq("user_id", user?.id);

      if (error) {
        console.error("Error fetching requests:", error);
        return;
      }

      setRequests(data || []);
    };

    if (user) {
      fetchRequests();
    }
  }, [user]);

  return (
    <div className="py-10">
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
          <Sidebar />
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-semibold mb-2">Your Data Requests</h2>
            <p className="text-gray-600 mb-6">
              View the status of your data requests and download datasets once they're ready.
            </p>

            {requests?.length ? (
              <ul className="space-y-4">
                {requests.map((req: any) => {
                  const dataset = req.datasets;
                return (
                <li
                  key={req.id}
                  className="border border-gray-200 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">
                        {dataset?.title || "Untitled Dataset"}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Status:{" "}
                        <span className="font-medium text-gray-800">{req.status}</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        Requested on:{" "}
                        {new Date(req.requested_at).toLocaleDateString()}
                      </div>
                    </div>
                    {dataset?.path && (
                      <img
                        src={`https://your-supabase-project.supabase.co/storage/v1/object/public/${dataset.bucket}/${dataset.path}`}
                        alt={dataset.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    )}
                  </div>

                  <div className="text-sm text-gray-700 mt-2">
                    {dataset?.description || "No description provided."}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div>
                      Publisher: <span className="text-gray-700">{dataset?.publisher}</span>
                    </div>
                    {dataset?.id && (
                      <a
                        href={`/dataset/${dataset.id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        View Dataset →
                      </a>
                    )}
                  </div>

                  {req.status === "completed" && req.downloadUrl && (
                    <div className="mt-4">
                      <a
                        href={req.downloadUrl}
                        className="text-sm inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        download
                      >
                        Download Dataset
                      </a>
                    </div>
                  )}
                </li>
                );
                })}
              </ul>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-medium">You haven’t made any data requests yet.</p>
                <p className="text-sm mt-2">Once you do, they’ll show up here with their status.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataRequestsPanel;
