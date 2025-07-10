import { cookies } from 'next/headers'
import { supabase } from '../../../../../lib/supabaseClient'
import { verifyToken } from '../../../../../lib/auth/jwt'
import { NextResponse } from 'next/server'

export async function GET() {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { data, error } = await supabase
        .from('kost_booking')
        .select('id, start_date, duration, status, kost(id, name, description)')
        .eq('user_id', payload.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching booking history:', error)
        return NextResponse.json({ error: 'Failed to fetch booking history' }, { status: 500 })
    }

    return NextResponse.json(data)
}
