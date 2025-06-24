"use client"; // if you're using Next.js App Router

import { useState } from "react";
import { supabase } from "./supabaseClient"; // adjust path as needed

interface DownloadFileButtonProps {
  bucket: string;
  filePath: string; // path within the bucket (e.g., "user_uploads/data.csv")
  label?: string;   // optional label for the button
}

export default function DownloadFileButton({ bucket, filePath, label = "Download File" }: DownloadFileButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.storage.from(bucket).download(filePath);

    if (error) {
      setError("You don't have permission or the file doesn't exist.");
      setLoading(false);
      return;
    }

    const url = window.URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = filePath.split("/").pop() || "download";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Preparing download..." : label}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
