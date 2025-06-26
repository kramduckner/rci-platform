import React from 'react';
import { User, Clock } from 'lucide-react';
import Sidebar from "../Sidebar";
import Header from "../Header";

export default function MyAccountPage() {
  
  const userEmail = 'user@example.com';
  const lastSignIn = 'June 24, 2025 at 3:42 PM';

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex my-10">
        <Sidebar />
        <div className="min-h-screen py-8">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  My Account
                </h1>
                <p className="text-gray-600 mt-1">Manage your account information</p>
              </div>

              {/* Account Information */}
              <div className="px-6 py-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 cursor-not-allowed focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Last Sign In
                  </label>
                  <input
                    type="text"
                    value={lastSignIn}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 cursor-not-allowed focus:outline-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                <p className="text-sm text-gray-500">
                  Need to update your information? Contact support for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
