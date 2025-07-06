"use client"

import { useActionState } from "react"
import { login } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, { error: "" })
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={formAction} className="space-y-8">
      <div className="space-y-6">
        {/* Email field */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              disabled={pending}
              className="h-16 text-lg border-gray-200 bg-gray-50/50 rounded-xl px-6 placeholder:text-gray-500 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-200/50 transition-all duration-200"
            />
          </div>
        </div>

        {/* Password field */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              disabled={pending}
              className="h-16 text-lg border-gray-200 bg-gray-50/50 rounded-xl px-6 pr-14 placeholder:text-gray-500 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-200/50 transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              disabled={pending}
            >
              {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Error message */}
      {state.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-base">{state.error}</p>
        </div>
      )}

      {/* Login button */}
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-5 h-16 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {pending ? (
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin" />
            Signing In...
          </div>
        ) : (
          "Get Started"
        )}
      </Button>
    </form>
  )
}
