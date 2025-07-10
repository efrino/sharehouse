import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabaseClient'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const universityId = searchParams.get('universityId')

    let query = supabase
        .from('kost')
        .select('*, kost_images(*), universities(name)')
        .order('created_at', { ascending: false })

    if (universityId) {
        query = query.eq('university_id', universityId)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching kost:', error)
        return NextResponse.json([], { status: 500 })
    }

    return NextResponse.json(data)
}
