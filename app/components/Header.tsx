'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Header() {
    const [user, setUser] = useState<null | { role: string; email: string }>()
    const [routes, setRoutes] = useState<string[]>([])
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const routeLabelMap: Record<string, string> = {
        users: 'Kelola Pengguna',
        rooms: 'Kamar',
        payments: 'Pembayaran',
        settings: 'Pengaturan',
    }

    useEffect(() => {
        async function checkAuthAndNav() {
            try {
                const res = await fetch('/api/me')
                if (res.ok) {
                    const data = await res.json()
                    setUser({ role: data.role, email: data.email })

                    const navRes = await fetch(`/api/nav/${data.role}`)
                    const navData = await navRes.json()
                    setRoutes(navData.routes || [])
                }
            } catch {
                setUser(null)
            }
        }

        checkAuthAndNav()
    }, [])

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        window.location.href = '/auth/login'
    }

    return (
        <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
                Kosku Semarang
            </Link>

            <nav className="flex gap-4 items-center relative">
                {user ? (
                    <>
                        <Link
                            href={`/dashboard/${user.role}`}
                            className="text-gray-700 hover:text-blue-600 hidden sm:inline"
                        >
                            Dashboard
                        </Link>

                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setOpen(!open)} className="focus:outline-none">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user.email}&background=0D8ABC&color=fff`}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full border cursor-pointer"
                                />
                            </button>

                            {open && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md z-50">
                                    {routes.length === 0 && (
                                        <div className="px-4 py-2 text-sm text-gray-400">Memuat menu...</div>
                                    )}
                                    {[...routes].sort().map((route) => (
                                        <Link
                                            key={route}
                                            href={`/dashboard/${user.role}/${route}`}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize"
                                        >
                                            {routeLabelMap[route] || route.replace(/-/g, ' ')}
                                        </Link>
                                    ))}

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
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
