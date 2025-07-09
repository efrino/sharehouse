'use client'

import { useEffect, useState } from 'react'

type Kost = {
  id: string
  name: string
  address: string
  owner: string
  rooms: number
  status: 'active' | 'inactive'
}

export default function ManageKostAdminPage() {
  const [loading, setLoading] = useState(true)
  const [kostList, setKostList] = useState<Kost[]>([])

  useEffect(() => {
    setTimeout(() => {
      setKostList([
        {
          id: '1',
          name: 'Kos Bunga Mawar',
          address: 'Jl. Gajah Mada No. 88',
          owner: 'Andi Pratama',
          rooms: 15,
          status: 'active',
        },
        {
          id: '2',
          name: 'Kos Melati Asri',
          address: 'Jl. Pandanaran No. 15',
          owner: 'Siti Nurhaliza',
          rooms: 12,
          status: 'inactive',
        },
        {
          id: '3',
          name: 'Kos Putra Harmoni',
          address: 'Jl. Diponegoro No. 21',
          owner: 'Budi Santoso',
          rooms: 10,
          status: 'active',
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Manajemen Semua Kos</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded shadow animate-pulse space-y-4">
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
              </div>
            ))
          : kostList.map((kost) => (
              <div
                key={kost.id}
                className="bg-white p-6 rounded shadow hover:shadow-md transition space-y-2"
              >
                <h2 className="text-lg font-semibold">{kost.name}</h2>
                <p className="text-sm text-gray-600">
                  <strong>Alamat:</strong> {kost.address}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Owner:</strong> {kost.owner}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Jumlah Kamar:</strong> {kost.rooms}
                </p>
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    kost.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {kost.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </div>
            ))}
      </div>
    </main>
  )
}
