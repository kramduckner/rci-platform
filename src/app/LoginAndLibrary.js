"use client"

import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

export default function AuthGateWithModal() {
  const [session, setSession] = useState(null)
  const [authMode, setAuthMode] = useState('login') // or 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleAuth = async () => {
    setLoading(true)
    setError(null)
    let error
    
    if (authMode === "signup"){
      await supabase.auth.signUp({email, password})  
    } else {
      await supabase.auth.signInWithPassword({email, password})  
    }
    
    //const { error } = await authFn({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  return (
    <div className=" bg-gray-50 p-6 flex flex-col items-center justify-center">
      {session ? (
        <>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome, you're logged in!</h1>
          <button
            onClick={handleLogout}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Log Out
          </button>
        </>
      ) : (
        <AuthModal
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleAuth}
          loading={loading}
          error={error}
          authMode={authMode}
          setAuthMode={setAuthMode}
        />
      )}
    </div>
  )
}

function AuthModal({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  loading,
  error,
  authMode,
  setAuthMode,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {authMode === 'login' ? 'Log In' : 'Sign Up'}
        </h2>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-md p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={onSubmit}
          className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Processing...' : authMode === 'login' ? 'Log In' : 'Sign Up'}
        </button>

        <div className="text-center mt-4 text-sm text-gray-600">
          {authMode === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button
                onClick={() => setAuthMode('signup')}
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setAuthMode('login')}
                className="text-blue-600 hover:underline"
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
