// lib/auth/loginUser.ts
import { supabase } from '../supabaseClient'
import bcrypt from 'bcryptjs'

export async function loginUser({
    email,
    password,
}: {
    email: string
    password: string
}) {
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

    if (error || !user) {
        return { error: 'Email tidak ditemukan' }
    }

    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) {
        return { error: 'Password salah' }
    }

    return { data: user } // Token akan dibuat di API route, bukan di sini
}
