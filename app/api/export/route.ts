import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'visits'
    
    // Get current user and verify role
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || !['admin', 'staff'].includes(profile.role)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    let data
    let filename
    
    switch (type) {
      case 'visits':
        const { data: visits, error: visitsError } = await supabase
          .from('visits')
          .select(`
            id, visitor_name, visitor_email, visitor_phone, 
            purpose, department, person_to_meet,
            check_in_time, check_out_time, status, remarks
          `)
          .order('check_in_time', { ascending: false })
        
        if (visitsError) throw visitsError
        data = visits
        filename = `visits_export_${new Date().toISOString().split('T')[0]}.json`
        break
        
      case 'profiles':
        if (profile.role !== 'admin') {
          return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
        }
        
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, email, full_name, role, created_at')
        
        if (profilesError) throw profilesError
        data = profiles
        filename = `profiles_export_${new Date().toISOString().split('T')[0]}.json`
        break
        
      default:
        return NextResponse.json({ error: 'Invalid export type' }, { status: 400 })
    }

    return new NextResponse(JSON.stringify(data, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
} 