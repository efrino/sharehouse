import { NextRequest, NextResponse } from 'next/server'
import { registerUser } from '../../../../lib/auth/registerUser'

export async function POST(req: NextRequest) {
    const { email, password, phone } = await req.json()

    const { data, error } = await registerUser({ email, password, phone })

    if (error) {
        return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ message: 'Register berhasil. Silakan login.' })
}
