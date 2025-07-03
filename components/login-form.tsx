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
    <form action={formAction} className="space-y-6">
      <div className="space-y-4">
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
              className="h-14 text-base border-gray-200 bg-gray-50 rounded-xl px-4 placeholder:text-gray-500 focus:border-gray-400 focus:bg-white"
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
              className="h-14 text-base border-gray-200 bg-gray-50 rounded-xl px-4 pr-12 placeholder:text-gray-500 focus:border-gray-400 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              disabled={pending}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Error message */}
      {state.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{state.error}</p>
        </div>
      )}

      {/* Login button */}
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 h-14 rounded-xl text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Signing In...
          </div>
        ) : (
          "Get Started"
        )}
      </Button>
    </form>
  )
}
