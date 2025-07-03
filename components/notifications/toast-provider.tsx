"use client"

import { useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'
import { UserPlus, LogOut } from 'lucide-react'

export function ToastProvider() {
  const supabase = createClient()

  useEffect(() => {
    // Listen for real-time changes
    const channel = supabase
      .channel('visitor_notifications')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'visits' 
        },
        (payload) => {
          const visit = payload.new
          toast.custom((t) => (
            <div className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <UserPlus className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-white">
                      New Visitor Arrived
                    </p>
                    <p className="mt-1 text-sm text-white/90">
                      {visit.full_name} has checked in for {visit.purpose}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-white/20">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-white hover:bg-white/10 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          ), {
            duration: 5000,
          })
        }
      )
      .on(
        'postgres_changes',
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'visits',
          filter: 'status=eq.OUTSIDE'
        },
        (payload) => {
          const visit = payload.new
          toast.custom((t) => (
            <div className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <LogOut className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-white">
                      Visitor Checked Out
                    </p>
                    <p className="mt-1 text-sm text-white/90">
                      {visit.full_name} has left the premises
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-white/20">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-white hover:bg-white/10 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          ), {
            duration: 5000,
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'transparent',
          boxShadow: 'none',
        },
      }}
    />
  )
} 