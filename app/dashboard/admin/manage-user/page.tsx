'use client'

import { useEffect, useState } from 'react'

type User = {
  id: string
  name: string
  email: string
  phone: string
  status: 'aktif' | 'nonaktif'
}

export default function ManageUserPage() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // Simulasi loading data dummy
    setTimeout(() => {
      setUsers([
        {
          id: 'u1',
          name: 'Rani Kusuma',
          email: 'rani@example.com',
          phone: '081222334455',
          status: 'aktif',
        },
        {
          id: 'u2',
          name: 'Agus Saputra',
          email: 'agus@example.com',
          phone: '082233445566',
          status: 'nonaktif',
        },
        {
          id: 'u3',
          name: 'Intan Permata',
          email: 'intan@example.com',
          phone: '083344556677',
          status: 'aktif',
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Manajemen Pengguna</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow animate-pulse space-y-4"
              >
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
              </div>
            ))
          : users.map((user) => (
              <div
                key={user.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition space-y-2"
              >
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>No. HP:</strong> {user.phone}
                </p>
                <p
                  className={`text-sm font-medium ${
                    user.status === 'aktif' ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  Status: {user.status}
                </p>
              </div>
            ))}
      </div>
    </main>
  )
}
