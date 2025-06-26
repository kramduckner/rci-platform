"use client"
import { useState } from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },  
    { id: 'datasets', label: 'Our Data' },
    { id: 'access', label: 'Getting Access' }
  ];

  const dataTypes = [
    {
      icon: '👥',
      title: 'Demographics & Social',
      description: 'Age, gender, household composition, socioeconomic status, and family structure data'
    },
    {
      icon: '🏥',
      title: 'Health & Medical',
      description: 'Chronic conditions, medication usage, healthcare utilization, and clinical outcomes'
    },
    {
      icon: '💰',
      title: 'Economic Impact',
      description: 'Healthcare costs, lost productivity, insurance coverage, and financial burden analysis'
    },
    {
      icon: '🧠',
      title: 'Mental Health',
      description: 'Caregiver stress, depression, anxiety, burnout, and psychological wellbeing metrics'
    },
    {
      icon: '⏰',
      title: 'Time & Activities',
      description: 'Hours of care provided, types of assistance, daily living activities, and care intensity'
    },
    {
      icon: '🌐',
      title: 'Geographic',
      description: 'Regional variations, urban/rural differences, and location-based care patterns'
    }
  ];

  const features = [
    {
      icon: '🔍',
      title: 'Smart Search & Discovery',
      description: 'Find relevant datasets using advanced search filters, tags, and AI-powered recommendations'
    },
    {
      icon: '📊',
      title: 'Interactive Previews',
      description: 'Explore data through Looker Studio reports and interactive visualizations before requesting access'
    },
    {
      icon: '🔐',
      title: 'Secure Access Management',
      description: 'Request and manage data access with built-in privacy controls and compliance tracking'
    },
    {
      icon: '📈',
      title: 'Real-time Analytics',
      description: 'View usage statistics, download trends, and impact metrics for datasets'
    },
    {
      icon: '🤝',
      title: 'Collaboration Tools',
      description: 'Share findings, collaborate on research, and connect with other caregiving researchers'
    },
    {
      icon: '📚',
      title: 'Research Resources',
      description: 'Access methodology guides, best practices, and published research using our datasets'
    }
  ];

  const useCases = [
    {
      title: 'Academic Research',
      description: 'Support longitudinal studies on caregiver outcomes, policy analysis, and intervention effectiveness',
      users: 'Universities, Research Institutes'
    },
    {
      title: 'Policy Development',
      description: 'Inform healthcare policy, social services planning, and legislative initiatives',
      users: 'Government Agencies, Think Tanks'
    },
    {
      title: 'Healthcare Planning',
      description: 'Develop caregiver support programs, resource allocation, and service delivery models',
      users: 'Hospitals, Health Systems'
    },
    {
      title: 'Technology Innovation',
      description: 'Build caregiving apps, AI tools, and digital health solutions',
      users: 'Tech Companies, Startups'
    }
  ];

  return (
    <>
      <Header />
      <div className="py-10">
        <main>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
            <Sidebar />
            <div className="min-h-screen bg-gray-50">
              {/* Hero Section */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                  <div className="text-center">
                    <h1 className="text-5xl font-bold mb-6">
                      Caregiving Data Catalog
                    </h1>
                    <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                      The comprehensive repository for caregiving research data, empowering researchers, 
                      policymakers, and organizations to understand and improve the caregiving experience.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <a href="/catalog">
                        Explore Datasets
                        </a>
                      </button>
                      <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                        <a href="/signup">
                          Sign Up Get Access
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Content Sections */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-16">
                    {/* Mission Statement */}
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                      <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                        To accelerate caregiving research and improve outcomes for millions of caregivers worldwide 
                        by providing open access to high-quality, standardized datasets that capture the full 
                        spectrum of the caregiving experience.
                      </p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600">150+</div>
                        <div className="text-gray-600">Datasets Available</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600">2.1M</div>
                        <div className="text-gray-600">Caregiver Records</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-600">500+</div>
                        <div className="text-gray-600">Research Partners</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-orange-600">50+</div>
                        <div className="text-gray-600">Countries</div>
                      </div>
                    </div>

                    {/* Problem Statement */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">The Caregiving Challenge</h3>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <p className="text-gray-600 mb-4">
                            Over 53 million Americans provide unpaid care to family members and friends. 
                            These caregivers face significant physical, emotional, and financial challenges 
                            that impact their health, employment, and quality of life.
                          </p>
                          <p className="text-gray-600">
                            Despite the critical importance of caregiving, research has been fragmented 
                            across institutions, making it difficult to understand patterns, identify 
                            effective interventions, and develop evidence-based policies.
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Challenges:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li>• Data silos across research institutions</li>
                            <li>• Inconsistent measurement approaches</li>
                            <li>• Limited access to longitudinal data</li>
                            <li>• Lack of diverse, representative samples</li>
                            <li>• Difficulty comparing findings across studies</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Who Uses Our Platform</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {useCases.map((useCase, index) => (
                          <div key={index} className="bg-white rounded-lg shadow-md p-6">
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">{useCase.title}</h4>
                            <p className="text-gray-600 mb-3">{useCase.description}</p>
                            <div className="text-sm text-blue-600 font-medium">{useCase.users}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                  <div className="space-y-12">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
                      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Our platform provides comprehensive tools for discovering, exploring, and accessing 
                        caregiving datasets with enterprise-grade security and compliance.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {features.map((feature, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                          <div className="text-3xl mb-4">{feature.icon}</div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* How It Works */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h3>
                      <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">1</span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">Search & Discover</h4>
                          <p className="text-gray-600 text-sm">Use filters and keywords to find relevant caregiving datasets</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">2</span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">Preview Data</h4>
                          <p className="text-gray-600 text-sm">Explore interactive reports and data summaries</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">3</span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">Request Access</h4>
                          <p className="text-gray-600 text-sm">Submit access requests with research justification</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">4</span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">Analyze & Share</h4>
                          <p className="text-gray-600 text-sm">Download data and collaborate with the community</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Datasets Tab */}
                {activeTab === 'datasets' && (
                  <div className="space-y-12">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Data Collection</h2>
                      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We maintain the largest repository of caregiving data, spanning demographics, 
                        health outcomes, economic impacts, and psychosocial factors.
                      </p>
                    </div>

                    {/* Data Types */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {dataTypes.map((type, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6">
                          <div className="text-4xl mb-4">{type.icon}</div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">{type.title}</h3>
                          <p className="text-gray-600">{type.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Data Sources */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Data Sources & Partners</h3>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Government Surveys</h4>
                          <ul className="text-gray-600 space-y-1">
                            <li>• National Alliance for Caregiving Studies</li>
                            <li>• Health and Retirement Study (HRS)</li>
                            <li>• American Community Survey</li>
                            <li>• National Health Interview Survey</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Research Institutions</h4>
                          <ul className="text-gray-600 space-y-1">
                            <li>• University research centers</li>
                            <li>• Medical school studies</li>
                            <li>• Healthcare system data</li>
                            <li>• Non-profit organizations</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Data Quality */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Quality & Standards</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-green-600 text-3xl mb-2">✓</div>
                          <h4 className="font-semibold text-gray-900 mb-2">Standardized</h4>
                          <p className="text-gray-600 text-sm">Consistent formats and coding across all datasets</p>
                        </div>
                        <div className="text-center">
                          <div className="text-blue-600 text-3xl mb-2">🔒</div>
                          <h4 className="font-semibold text-gray-900 mb-2">De-identified</h4>
                          <p className="text-gray-600 text-sm">Privacy-protected and HIPAA compliant</p>
                        </div>
                        <div className="text-center">
                          <div className="text-purple-600 text-3xl mb-2">📊</div>
                          <h4 className="font-semibold text-gray-900 mb-2">Validated</h4>
                          <p className="text-gray-600 text-sm">Quality checked and research-ready</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Access Tab */}
                {activeTab === 'access' && (
                  <div className="space-y-12">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Access to Data</h2>
                      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We provide secure, compliant access to caregiving datasets for qualified researchers 
                        and organizations through our streamlined request process.
                      </p>
                    </div>

                    {/* Access Process */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Access Request Process</h3>
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                            <span className="text-white font-bold">1</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Create Account & Profile</h4>
                            <p className="text-gray-600">Register with your institutional email and complete your researcher profile</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                            <span className="text-white font-bold">2</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Submit Data Request</h4>
                            <p className="text-gray-600">Provide research proposal, IRB approval, and intended use details</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                            <span className="text-white font-bold">3</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Review & Approval</h4>
                            <p className="text-gray-600">Our data governance committee reviews requests (typically 5-10 business days)</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                            <span className="text-white font-bold">4</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Data Access & Usage</h4>
                            <p className="text-gray-600">Receive secure access credentials and begin your research</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li>• Institutional affiliation (academic, government, or non-profit)</li>
                          <li>• IRB or ethics committee approval</li>
                          <li>• Detailed research proposal</li>
                          <li>• Data use agreement</li>
                          <li>• Publication sharing commitment</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Access Levels</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="font-medium text-green-600">Public</div>
                            <div className="text-sm text-gray-600">Aggregated data and summary statistics</div>
                          </div>
                          <div>
                            <div className="font-medium text-blue-600">Restricted</div>
                            <div className="text-sm text-gray-600">De-identified individual records</div>
                          </div>
                          <div>
                            <div className="font-medium text-purple-600">Controlled</div>
                            <div className="text-sm text-gray-600">Sensitive data requiring special approval</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg p-8 text-center">
                      <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                      <p className="text-lg mb-6 opacity-90">
                        Join hundreds of researchers using our platform to advance caregiving science
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                          Create Account
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                          Contact Us
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>

  );
}
