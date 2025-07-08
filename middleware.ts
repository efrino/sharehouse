import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'SUPER_SECRET_KEY')

// Fungsi verifikasi token
async function verifyToken(token?: string) {
    if (!token) return null
    try {
        const { payload } = await jwtVerify(token, secret)
        return payload
    } catch {
        return null
    }
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const url = request.nextUrl
    const { pathname } = url

    const isAuthPage = pathname.startsWith('/auth')
    const isDashboardPage = pathname.startsWith('/dashboard')

    const user = await verifyToken(token)

    if (isAuthPage) {
        // Kalau sudah login, lempar ke dashboard
        if (user) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        return NextResponse.next()
    }

    if (isDashboardPage) {
        // Kalau belum login, lempar ke login
        if (!user) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/auth/:path*', '/dashboard/:path*'],
}
