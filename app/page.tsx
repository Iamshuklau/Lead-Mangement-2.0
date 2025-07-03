"use client"
import { LoginForm } from "@/components/login-form"

export default function Login() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" 
         style={{ backgroundImage: 'url(/login-bg.jpg)' }}>
      {/* Main login card and note */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">RITM VMS</h1>
                <p className="text-gray-600 text-sm">Visitor Management System</p>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in with email</h2>
              <p className="text-gray-600">
                Access your dashboard to manage visitors and track activity.
              </p>
            </div>
            
            <LoginForm />
            
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Don&apos;t have an account? <a href="#" className="text-gray-900 font-medium">Contact Admin</a>
              </p>
            </div>
          </div>
        </div>
        {/* Note with credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-md text-sm text-gray-700 max-w-xs w-full">
          <h4 className="font-semibold text-gray-900 mb-2">Test Credentials</h4>
          <div className="mb-2">
            <span className="font-medium">Admin:</span><br/>
            Email: <span className="font-mono">admin@ritm.edu.in</span><br/>
            Password: <span className="font-mono">password123</span>
          </div>
          <div>
            <span className="font-medium">Staff:</span><br/>
            Email: <span className="font-mono">staff@ritm.edu.in</span><br/>
            Password: <span className="font-mono">password123</span>
          </div>
        </div>
      </div>
    </div>
  )
}
