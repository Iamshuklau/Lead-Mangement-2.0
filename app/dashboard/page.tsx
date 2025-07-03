import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'admin') {
    return redirect('/admin-dashboard')
  }

  if (profile?.role === 'staff') {
    return redirect('/staff-dashboard')
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <p>You are logged in, but your role has not been assigned. Please contact an administrator.</p>
    </div>
  )
} 