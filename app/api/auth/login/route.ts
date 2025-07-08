// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { loginUser } from '../../../../lib/auth/loginUser'
import { generateToken } from '../../../../lib/auth/jwt'

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()
    const { data, error } = await loginUser({ email, password })

    if (error) {
        return NextResponse.json({ error }, { status: 401 })
    }

    const token = await generateToken({
        id: data.id,
        email: data.email,
        role: data.role,
    })

    const response = NextResponse.json({ message: 'Login berhasil' })

    // Set HTTP-only cookie agar aman & bisa diakses middleware
    response.cookies.set({
        name: 'token',
        value: token,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 hari
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    })

    return response
}
