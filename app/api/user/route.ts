import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { supabase } from '../../../lib/supabaseClient'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'SUPER_SECRET_KEY')

// Fungsi untuk verifikasi token JWT
async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret)
        return payload
    } catch (err) {
        console.error('Token invalid:', err)
        return null
    }
}

// GET /api/user
export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const payload = await verifyToken(token)
    if (!payload || !payload.id) return NextResponse.json({ message: 'Invalid token' }, { status: 401 })

    const { data, error } = await supabase
        .from('users')
        .select('id, email, role, phone, created_at')
        .eq('id', payload.id)
        .single()

    if (error || !data) {
        console.error('Error fetching user:', error)
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(data)
}

// PUT /api/user
export async function PUT(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const payload = await verifyToken(token)
    if (!payload || !payload.id) return NextResponse.json({ message: 'Invalid token' }, { status: 401 })

    const body = await request.json()

    const { email, phone } = body

    const { data, error } = await supabase
        .from('users')
        .update({ email, phone })
        .eq('id', payload.id)
        .select('id, email, phone, role, created_at')
        .single()

    if (error) {
        console.error('Error updating user:', error)
        return NextResponse.json({ message: 'Failed to update user' }, { status: 500 })
    }

    return NextResponse.json(data)
}
