"use client"

import {useEffect, useState} from "react"
import { useAuth } from "./auth-context";
import { supabase } from "./supabaseClient";
import Link from "next/link";

export default function StatsCards({ accessibleCount, totalDatasets,  recentDataset, accessibleDatasetsCount }:any) {
  const {user}:any = useAuth()
  const [lastAccessedDataset, setLastAccessedDataset]:any = useState({})
  const [accessedDatasetsCount, setAccessedDatasetsCount] = useState(0)
  
  useEffect(()=>{

    async function fetchDatasetAccess() {
      const d:any = await supabase
            .from("dataset_access")
            .select("user_id, last_access, datasets(*)")
            .eq("user_id", user.id)
            .order("last_access", { ascending: false });
      setAccessedDatasetsCount(d.data.length)
      setLastAccessedDataset(d.data[0])

    }
    
    if (user){
      
      fetchDatasetAccess()
    }
  }, [user])
  
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        <div className="bg-sky-50 rounded-lg p-4 border border-sky-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              {user ? (
                <>
                  <p className="text-2xl font-bold text-blue-900">
                    {accessedDatasetsCount}
                  </p>
                  <p className="text-sm font-medium text-blue-800">
                    Your Datasets
                  </p>
                </>
              ) : (
                <>
                  <Link href="/signup" className="text-sm font-medium text-blue-700 hover:underline">
                    Create account to access data
                  </Link>
                </>
              )}

            </div>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-red-400 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-2xl font-bold text-red-900">
                {totalDatasets}
              </p>
              <p className="text-sm font-medium text-red-800">
                Total Datasets
              </p>
            </div>
          </div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4 border border-gray-200">
          <a 
            href="/dashboard/catalog" 
            className="flex items-center justify-between hover:bg-emerald-100 transition-colors rounded-md p-1 -m-1 h-full"
          >
            <div>
              <p className="text-sm font-medium text-emerald-800">
                Explore Catalog
              </p>
              <p className="text-xs text-emerald-600">
                Browse datasets
              </p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recently Added Dataset */}
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recently Added Dataset
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              New
            </span>
          </div>
          {recentDataset ? (
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  {recentDataset.title || recentDataset.name || 'Untitled Dataset'}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {recentDataset.description || 'No description available'}
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Added {new Date(recentDataset.created_at).toLocaleDateString()}
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  <a href={`dataset/${recentDataset.id}`}>
                    View Details
                  </a>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent datasets available</p>
          )}
        </div>
        
        {/* Your Accessed Datasets */}
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Your Last Accessed Dataset
            </h3>
            
          </div>
          {lastAccessedDataset.user_id ? (
            <div className="space-y-3">

              <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {lastAccessedDataset?.datasets?.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {lastAccessedDataset?.datasets?.description}
                  </p>
                </div>
                <button className="ml-2 text-blue-600 hover:text-blue-800 text-xs font-medium flex-shrink-0">
                  <a href={`/dataset/${lastAccessedDataset?.datasets?.id}`}>
                    View
                  </a>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm text-gray-500 mt-2 mb-3">
                No datasets accessed yet
              </p>
              <a 
                href="/dashboard/catalog" 
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Browse Catalog
              </a>
            </div>
          )}
        </div>
      </div>
      <hr className="my-2 border-t border-gray-200" />
      <div className="bg-white shadow-sm rounded-lg p-6 my-8 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="/dashboard/requests" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">View Your Requests</p>
              <p className="text-xs text-gray-500">Track pending and approved access requests</p>
            </div>
            <svg className="ml-auto w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
      {/* Quick Start Guide */}
      {/* <div className="mt-6 pt-6 border-t border-gray-200"> */}
      {/*   <h3 className="text-lg font-medium text-gray-900 mb-3"> */}
      {/*     Getting Started */}
      {/*   </h3> */}
      {/*   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm"> */}
      {/*     <div className="flex items-start"> */}
      {/*       <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5"> */}
      {/*         1 */}
      {/*       </span> */}
      {/*       <span className="text-gray-700"> */}
      {/*         Browse the data catalog to discover relevant caregiver datasets */}
      {/*       </span> */}
      {/*     </div> */}
      {/*     <div className="flex items-start"> */}
      {/*       <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5"> */}
      {/*         2 */}
      {/*       </span> */}
      {/*       <span className="text-gray-700"> */}
      {/*         Submit access requests for datasets that match your research needs */}
      {/*       </span> */}
      {/*     </div> */}
      {/*     <div className="flex items-start"> */}
      {/*       <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5"> */}
      {/*         3 */}
      {/*       </span> */}
      {/*       <span className="text-gray-700"> */}
      {/*         Access approved datasets and begin your analysis */}
      {/*       </span> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </div> */}
    </>
  );
}
