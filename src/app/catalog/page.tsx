import Sidebar from "../Sidebar";
import Header from "../Header";
import Card from "../Card";
import { supabase } from "../supabaseClient";


export default async function Example() {
  const { data } = await supabase.from("datasets").select("");
  
  // Group datasets by category for better organization
  const datasetsByCategory = data?.reduce((acc, dataset) => {
    const category = dataset.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(dataset);
    return acc;
  }, {}) || {};

  const totalDatasets = data?.length || 0;
  const categories = Object.keys(datasetsByCategory);
  const featuredDatasets = data?.filter(d => d.featured)?.slice(0, 3) || [];
  
  return (
    <>
      {/* <LoginAndLibrary /> */}
      <Header />
      <div className="py-10">
        <main>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
            <Sidebar />
            <div className="flex-1 ml-8">
              {/* Hero Section */}
              <div className="mb-12">
                <h1 className="text-4xl mb-4 font-bold tracking-tight text-gray-900">
                  RCI Discovery Dashboard
                </h1>
                <p className="text-xl text-gray-600 mb-6 max-w-3xl">
                  Explore our comprehensive data catalog to discover datasets, view interactive reports, 
                  and request access to the data you need for your research and analysis.
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-blue-600">{totalDatasets}</div>
                    <div className="text-blue-800 font-medium">Total Datasets</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-green-600">{categories.length}</div>
                    <div className="text-green-800 font-medium">Data Categories</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-purple-600">{featuredDatasets.length}</div>
                    <div className="text-purple-800 font-medium">Featured Datasets</div>
                  </div>
                </div>
              </div>

              {/* Search and Filter Section */}
              <div className="mb-10">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Find Your Data</h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search datasets..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Featured Datasets Section */}
              {featuredDatasets.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Datasets</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {featuredDatasets.map((dataset) => (
                      <div key={`featured-${dataset.id}`} className="relative">
                        <div className="absolute top-2 right-2 z-10">
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Featured
                          </span>
                        </div>
                        <Card
                          id={dataset.id}
                          data={dataset}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* How to Get Started Section */}
              <div className="mb-12">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Get Started</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Explore Datasets</h3>
                      <p className="text-gray-600">Browse our catalog to find datasets relevant to your research</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">View Reports</h3>
                      <p className="text-gray-600">Click on datasets to view interactive Looker Studio reports</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Request Access</h3>
                      <p className="text-gray-600">Submit access requests for datasets you need</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Datasets Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">All Datasets</h2>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      Showing {totalDatasets} dataset{totalDatasets !== 1 ? 's' : ''}
                    </span>
                    <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                      <option>Sort by Name</option>
                      <option>Sort by Date</option>
                      <option>Sort by Category</option>
                    </select>
                  </div>
                </div>

                {/* Datasets Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {data?.map((dataset) => (
                    <Card
                      key={dataset.id}
                      id={dataset.id}
                      data={dataset}
                    />
                  ))}
                </div>

                {/* Empty State */}
                {(!data || data.length === 0) && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-6a2 2 0 00-2 2v3a2 2 0 01-2 2H8a2 2 0 01-2-2v-3a2 2 0 00-2-2H4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No datasets found</h3>
                    <p className="text-gray-500">There are no datasets available at the moment.</p>
                  </div>
                )}
              </div>

              {/* Footer Info */}
              <div className="border-t pt-8 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                    <p className="text-gray-600 mb-2">
                      Contact our data team for assistance with dataset access or questions about available data.
                    </p>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Contact Support →
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Data Governance</h3>
                    <p className="text-gray-600 mb-2">
                      All datasets are subject to RCI's data governance policies and access controls.
                    </p>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      View Policies →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
