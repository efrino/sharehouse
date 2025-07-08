'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch('/api/me')
                setIsAuthenticated(res.ok)
            } catch {
                setIsAuthenticated(false)
            }
        }

        checkAuth()
    }, [])

    const handleLogout = () => {
        // Hapus cookie token secara manual (pakai expired cookie)
        document.cookie = 'token=; Max-Age=0; path=/'
        window.location.href = '/auth/login'
    }

    return (
        <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
                Kosku Semarang
            </Link>

            <nav className="flex gap-4 items-center">
                {isAuthenticated ? (
                    <>
                        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                            Dashboard
                        </Link>
                        <Link href="/profile" className="text-gray-700 hover:text-blue-600">
                            Profil
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:underline"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/auth/login" className="text-gray-700 hover:text-blue-600">
                            Login
                        </Link>
                        <Link href="/auth/register" className="text-gray-700 hover:text-blue-600">
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    )
}
