import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'SUPER_SECRET_KEY')

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
    const { pathname } = request.nextUrl

    const user = await verifyToken(token)

    // Bypass public pages
    if (pathname.startsWith('/auth')) {
        if (user) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        return NextResponse.next()
    }

    // Protect all /dashboard routes
    if (pathname.startsWith('/dashboard')) {
        if (!user) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }

        // Role-based protection
        if (
            pathname.startsWith('/dashboard/admin') &&
            user.role !== 'admin'
        ) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }

        if (
            pathname.startsWith('/dashboard/owner') &&
            user.role !== 'owner'
        ) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }

        if (
            pathname.startsWith('/dashboard/user') &&
            user.role !== 'user'
        ) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }

        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/auth/:path*', '/dashboard/:path*'],
}
