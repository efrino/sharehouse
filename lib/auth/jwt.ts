// lib/auth/jwt.ts
import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'SUPER_SECRET_KEY')

export async function generateToken(payload: {
    id: string
    email: string
    role: string
}) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret)
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret)
        return payload
    } catch (err) {
        console.error('Token verification error:', err)
        return null
    }
}
