'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    const handleRegister = async () => {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, phone }),
            headers: { 'Content-Type': 'application/json' },
        })

        const data = await res.json()
        if (!res.ok) {
            setError(data.error || 'Registrasi gagal')
            setSuccess('')
        } else {
            setError('')
            setSuccess('Registrasi berhasil. Silakan login.')
            setTimeout(() => router.push('/auth/login'), 1500)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Daftar Akun</h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="No. HP (opsional)"
                    className="w-full border p-2 rounded mb-4"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                {error && <p className="text-red-500 mb-2">{error}</p>}
                {success && <p className="text-green-600 mb-2">{success}</p>}
                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Daftar
                </button>
                <p className="mt-4 text-sm text-center">
                    Sudah punya akun?{' '}
                    <a href="/auth/login" className="text-blue-600 hover:underline">
                        Masuk
                    </a>
                </p>
            </div>
        </div>
    )
}
