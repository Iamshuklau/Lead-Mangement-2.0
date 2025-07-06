"use client"
import { LoginForm } from "@/components/login-form"

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300/30 via-purple-300/30 to-pink-300/30 animate-pulse"></div>
      
      {/* Floating shapes for visual interest */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full blur-xl floating-shapes"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-300/20 rounded-full blur-xl floating-shapes"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-pink-300/20 rounded-full blur-xl floating-shapes"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen w-full">
        {/* Login card */}
        <div className="w-full max-w-lg">
          <div className="login-card bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
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

            <div className="mb-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Sign in with email</h2>
              <p className="text-gray-600 text-center leading-relaxed text-lg">
                Access your dashboard to manage visitors and track activity.
              </p>
            </div>
            
            <LoginForm />
            
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-base">
                Don&apos;t have an account? <button className="text-gray-900 font-medium hover:underline">Contact Admin</button>
              </p>
            </div>
          </div>
        </div>
        
        {/* Credentials card - positioned absolute */}
        <div className="fixed top-8 right-8 bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-xl text-sm text-gray-700 max-w-xs z-20">
          <h4 className="font-semibold text-gray-900 mb-3">Test Credentials</h4>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Admin:</span>
                <button
                  onClick={() => {
                    const emailInput = document.getElementById('email') as HTMLInputElement;
                    const passwordInput = document.getElementById('password') as HTMLInputElement;
                    if (emailInput && passwordInput) {
                      emailInput.value = 'admin@ritm.edu.in';
                      passwordInput.value = 'password123';
                      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
                      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                  }}
                  className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors"
                >
                  Use
                </button>
              </div>
              <div className="text-xs">
                <div><span className="text-gray-600">Email:</span> <span className="font-mono text-gray-800">admin@ritm.edu.in</span></div>
                <div><span className="text-gray-600">Password:</span> <span className="font-mono text-gray-800">password123</span></div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Staff:</span>
                <button
                  onClick={() => {
                    const emailInput = document.getElementById('email') as HTMLInputElement;
                    const passwordInput = document.getElementById('password') as HTMLInputElement;
                    if (emailInput && passwordInput) {
                      emailInput.value = 'staff@ritm.edu.in';
                      passwordInput.value = 'password123';
                      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
                      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                  }}
                  className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded transition-colors"
                >
                  Use
                </button>
              </div>
              <div className="text-xs">
                <div><span className="text-gray-600">Email:</span> <span className="font-mono text-gray-800">staff@ritm.edu.in</span></div>
                <div><span className="text-gray-600">Password:</span> <span className="font-mono text-gray-800">password123</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
