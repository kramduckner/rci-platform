import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Card from "../Card";

const DataRequestsPanel = ({ requests = [] }) => {
  const hasRequests = requests.length > 0;

  return (
    <>
       <Header />
            <div className="py-10">
                <main>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
                        <Sidebar />
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-2">Your Data Requests</h2>
      <p className="text-gray-600 mb-6">
        This is where you can view the status of your data requests and download the data once it’s ready.
      </p>

      {hasRequests ? (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req.id}
              className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <div className="font-medium text-gray-900">{req.title}</div>
                <div className="text-sm text-gray-500">Status: {req.status}</div>
              </div>
              {req.status === "completed" && req.downloadUrl && (
                <a
                  href={req.downloadUrl}
                  className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                  download
                >
                  Download
                </a>
              )}
            </li>
          ))}
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
        </>
  );
};

export default DataRequestsPanel;
