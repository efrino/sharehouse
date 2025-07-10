// app/api/user/kost/active/route.ts
import { supabase } from '../../../../../lib/supabaseClient'
import { verifyToken } from '../../../../../lib/auth/jwt'
import { cookies } from 'next/headers'
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
        .from('user_kost')
        .select('kost(*, kost_images(*), universities(name))')
        .eq('user_id', payload.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

    if (error) {
        console.error('Error fetching active kost:', error)
        return NextResponse.json({ error: 'Failed to fetch kost' }, { status: 500 })
    }

    return NextResponse.json({ data })
}
