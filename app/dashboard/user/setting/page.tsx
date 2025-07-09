'use client'

import { useEffect, useState } from 'react'

type UserProfile = {
  email: string
  fullName: string
  phone?: string
}

export default function UserSettingPage() {
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    // Simulasi fetching data user
    setTimeout(() => {
      setUser({
        email: 'user@example.com',
        fullName: 'Zahrah Thalib',
        phone: '081234567890',
      })
    }, 1000)
  }, [])

  return (
    <main className="min-h-screen px-4 py-8 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Pengaturan Akun</h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
        {!user ? (
          // Skeleton
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, idx) => (
              <div key={idx}>
                <div className="h-4 bg-gray-200 w-24 rounded mb-2" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            ))}
            <div className="h-4 bg-gray-200 w-32 rounded mb-2" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        ) : (
          // User Form
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={user.fullName}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">No. HP</label>
              <input
                type="tel"
                value={user.phone || ''}
                className="w-full p-2 border rounded"
              />
            </div>

            <hr className="my-4" />

            <div>
              <label className="block text-sm font-medium mb-1">Ubah Password</label>
              <input
                type="password"
                placeholder="Password baru"
                className="w-full p-2 border rounded"
              />
            </div>

            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Simpan Perubahan
            </button>
          </>
        )}
      </div>
    </main>
  )
}
