'use client'

import { useEffect, useState } from 'react'

type KostData = {
  id: string
  name: string
  address: string
  rooms: number
  price: number
}

export default function ManageKostPage() {
  const [loading, setLoading] = useState(true)
  const [kostList, setKostList] = useState<KostData[]>([])

  useEffect(() => {
    setTimeout(() => {
      setKostList([
        {
          id: '1',
          name: 'Kos Harmoni Putra',
          address: 'Jl. Jambu No. 8, Semarang',
          rooms: 10,
          price: 750000,
        },
        {
          id: '2',
          name: 'Kos Melati Indah',
          address: 'Jl. Anggrek No. 12, Semarang',
          rooms: 8,
          price: 850000,
        },
        {
          id: '3',
          name: 'Kos Mawar Putih',
          address: 'Jl. Kenanga No. 5, Semarang',
          rooms: 12,
          price: 700000,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Manajemen Kos Anda</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded shadow animate-pulse space-y-4"
              >
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
              </div>
            ))
          : kostList.map((kost) => (
              <div
                key={kost.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold mb-2">{kost.name}</h2>
                <p className="text-gray-600 mb-1">
                  <strong>Alamat:</strong> {kost.address}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Kamar:</strong> {kost.rooms} unit
                </p>
                <p className="text-gray-600">
                  <strong>Harga:</strong> Rp{kost.price.toLocaleString()}/bulan
                </p>
              </div>
            ))}
      </div>
    </main>
  )
}
