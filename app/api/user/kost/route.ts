// GET /api/user/kost
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabaseClient'
import { verifyToken } from '../../../../lib/auth/jwt'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) return NextResponse.json([], { status: 401 })

  const payload = await verifyToken(token)
  if (!payload) return NextResponse.json([], { status: 403 })

  const { data, error } = await supabase
    .from('user_kost')
    .select('kost(*, kost_images(url))')
    .eq('user_id', payload.id)

  if (error) return NextResponse.json([], { status: 500 })

  return NextResponse.json(data)
}
