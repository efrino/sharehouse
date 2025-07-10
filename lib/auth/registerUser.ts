import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '../supabaseClient'
import { generateToken } from './jwt'

export async function registerUser({
    email,
    password,
    phone,
}: {
    email: string
    password: string
    phone?: string
}) {
    const { data: existing } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle()

    if (existing) {
        return { error: 'Email sudah terdaftar' }
    }

    const password_hash = await bcrypt.hash(password, 10)
    const id = uuidv4()

    const { data, error } = await supabase
        .from('users')
        .insert({
            id,
            email,
            password_hash,
            phone: phone || null,
            role: 'user',
        })
        .select()
        .single()

    if (error) return { error: error.message }

    const token = generateToken({ id: data.id, email, role: data.role })

    return { data: { ...data, token } }
}
