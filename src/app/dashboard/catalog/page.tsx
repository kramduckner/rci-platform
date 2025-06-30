'use client';

import { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import Card from "../../Card";
import { supabase } from "../../supabaseClient";

export default function Example() {
  const [datasets, setDatasets] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("datasets").select("*");
      setDatasets(data || []);
      setFiltered(data || []);
    };
    fetchData();
  }, []);

  const categories = [...new Set(datasets.map((d) => d.category || 'Other'))];
  const totalDatasets = datasets.length;
  const featuredDatasets = datasets.filter((d) => d.featured).slice(0, 3);

  const handleSearch = () => {
    const q = searchQuery.toLowerCase();
    const filteredData = datasets.filter((d) => {
      
      const matchesQuery = d.title?.toLowerCase().includes(q) || d.description?.toLowerCase().includes(q);
            return matchesQuery ;
    });
    
    setFiltered(filteredData);
  };

  return (
    <>
      <Header />
      <div className="py-10">
        <main>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
            <Sidebar />
            <div className="flex-1 ml-8">
              {/* Hero */}
              <div className="mb-12">
                <h1 className="text-4xl mb-4 font-bold text-gray-900">RCI Discovery Dashboard</h1>
                <p className="text-xl text-gray-600 mb-6 max-w-3xl">
                  Explore our comprehensive data catalog to discover datasets...
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-sky-50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-sky-600">{totalDatasets}</div>
                    <div className="text-sky-800 font-medium">Total Datasets</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-red-600">{categories.length}</div>
                    <div className="text-red-800 font-medium">Data Categories</div>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-emerald-600">{featuredDatasets.length}</div>
                    <div className="text-emerald-800 font-medium">Featured Datasets</div>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="mb-10">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Find Your Data</h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      placeholder="Search datasets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleSearch}
                      className="px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Featured */}
              {featuredDatasets.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Featured Datasets</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {featuredDatasets.map((d) => (
                      <div key={`featured-${d.id}`} className="relative">
                        <div className="absolute top-2 right-2">
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Featured
                          </span>
                        </div>
                        <Card key={d.id} id={d.id} data={d} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Datasets */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">All Datasets</h2>
                  <span className="text-sm text-gray-500">
                    Showing {filtered.length} dataset{filtered.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filtered.map((d) => (
                    <Card key={d.id} id={d.id} data={d} />
                  ))}
                </div>
                {filtered.length === 0 && (
                  <div className="text-center py-12 text-gray-500">No datasets found.</div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
