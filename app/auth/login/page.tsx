'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async () => {
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Login gagal')
                return
            }

            // ✅ Gunakan full reload agar middleware bisa membaca cookie yang baru diset
            window.location.href = '/dashboard'
        } catch (err) {
            console.error(err)
            setError('Terjadi kesalahan saat login')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Masuk</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Memproses...' : 'Masuk'}
                </button>

                <p className="mt-4 text-sm text-center">
                    Belum punya akun?{' '}
                    <a href="/auth/register" className="text-blue-600 hover:underline">
                        Daftar
                    </a>
                </p>
            </div>
        </div>
    )
}
