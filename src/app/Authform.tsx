// components/AuthForm.js
"use client"

import { useState } from 'react'
import { supabase } from './supabaseClient'
import Link from 'next/link'
import { useRouter } from "next/navigation";

export default function AuthForm({ mode = 'login' }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter();

  const handleAuth = async (e:any) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      let result: any
      
      if (mode === 'signup') {
        result = await supabase.auth.signUp({ email, password })
      } else {
        result = await supabase.auth.signInWithPassword({ email, password })
        
      }
      
      if (result.error) {
        setError(result.error.message)
      } else if (mode === 'signup') {
        setSuccess(true)
      } else {
        router.push("/");
      }
      
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success && mode === 'signup') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Check your email!</h2>
              <p className="text-gray-600 mb-4">
                We've sent you a confirmation link. Please check your email and click the link to verify your account.
              </p>
              <Link 
                href="/login"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleAuth}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-center">
              <span className="text-sm text-gray-600">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              </span>
              <Link
                href={mode === 'login' ? '/signup' : '/login'}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// // components/AuthGuard.js
// "use client"

// import { useState, useEffect } from 'react'
// import { supabase } from '../lib/supabaseClient' // Adjust path as needed
// import { useRouter } from 'next/navigation'

// export default function AuthGuard({ children, redirectTo = '/login' }) {
//   const [session, setSession] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     // Get initial session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)
//       setLoading(false)
      
//       if (!session) {
//         router.push(redirectTo)
//       }
//     })

//     // Listen for auth changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//       if (!session) {
//         router.push(redirectTo)
//       }
//     })

//     return () => subscription.unsubscribe()
//   }, [router, redirectTo])

//   const handleLogout = async () => {
//     await supabase.auth.signOut()
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-2 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!session) {
//     return null // Will redirect via useEffect
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-gray-700">
//                 {session.user.email}
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm font-medium text-gray-700"
//               >
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         {children}
//       </main>
//     </div>
//   )
// }

// // Example usage in pages:

// // app/login/page.js
// import AuthForm from '../components/AuthForm'

// export default function LoginPage() {
//   return <AuthForm mode="login" />
// }

// // app/signup/page.js
// import AuthForm from '../components/AuthForm'

// export default function SignupPage() {
//   return <AuthForm mode="signup" />
// }

// // app/dashboard/page.js
// import AuthGuard from '../components/AuthGuard'

// export default function DashboardPage() {
//   return (
//     <AuthGuard>
//       <div className="px-4 py-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to your dashboard!</h1>
//         <div className="bg-white overflow-hidden shadow rounded-lg">
//           <div className="px-4 py-5 sm:p-6">
//             <p className="text-gray-600">You're successfully authenticated!</p>
//           </div>
//         </div>
//       </div>
//     </AuthGuard>
//   )
// }
