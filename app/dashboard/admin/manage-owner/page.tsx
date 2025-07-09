'use client'

import { useEffect, useState } from 'react'

type Owner = {
  id: string
  name: string
  email: string
  phone: string
  totalKost: number
}

export default function ManageOwnerPage() {
  const [loading, setLoading] = useState(true)
  const [owners, setOwners] = useState<Owner[]>([])

  useEffect(() => {
    // Simulasi loading data
    setTimeout(() => {
      setOwners([
        {
          id: '1',
          name: 'Andi Pratama',
          email: 'andi@example.com',
          phone: '081234567890',
          totalKost: 3,
        },
        {
          id: '2',
          name: 'Siti Nurhaliza',
          email: 'siti@example.com',
          phone: '085612345678',
          totalKost: 2,
        },
        {
          id: '3',
          name: 'Budi Santoso',
          email: 'budi@example.com',
          phone: '082112223333',
          totalKost: 4,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Manajemen Owner Kos</h1>

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
          : owners.map((owner) => (
              <div
                key={owner.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition space-y-2"
              >
                <h2 className="text-lg font-semibold">{owner.name}</h2>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {owner.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>No. HP:</strong> {owner.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Total Kos:</strong> {owner.totalKost}
                </p>
              </div>
            ))}
      </div>
    </main>
  )
}
