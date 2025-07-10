// app/api/kost/nearby/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabaseClient'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const univId = searchParams.get('univId')
    const maxDistance = parseFloat(searchParams.get('maxDistance') || '5')

    if (!univId) {
        return NextResponse.json({ error: 'univId is required' }, { status: 400 })
    }

    const { data, error } = await supabase.rpc('get_kost_nearby_by_university', {
        univ_id: univId,
        max_km: maxDistance,
    })

    if (error) {
        console.error('Error fetching nearby kost:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}
