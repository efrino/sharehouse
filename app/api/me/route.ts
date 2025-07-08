import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'SUPER_SECRET_KEY')

async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret)
        return payload
    } catch (err) {
        console.error('Token invalid:', err)
        return null
    }
}

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyToken(token)

    if (!payload) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Kirim data user yang dibutuhkan (bisa juga email atau id jika diperlukan)
    return NextResponse.json({
        id: payload.id,
        email: payload.email,
        role: payload.role,
    })
}
