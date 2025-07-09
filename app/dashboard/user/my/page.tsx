'use client'

import { useEffect, useState } from 'react'

type Kos = {
  id: string
  nama: string
  alamat: string
  harga: string
  status: 'tersedia' | 'penuh'
  gambar: string
}

const dummyKos: Kos[] = [
  {
    id: '1',
    nama: 'Kos Bu Siti',
    alamat: 'Jl. Merdeka No.10, Semarang',
    harga: 'Rp 750.000 / bulan',
    status: 'tersedia',
    gambar: 'https://source.unsplash.com/400x300/?boardinghouse,room',
  },
  {
    id: '2',
    nama: 'Kos Exclusive Jati',
    alamat: 'Jl. Jati Raya No.5, Semarang',
    harga: 'Rp 1.200.000 / bulan',
    status: 'penuh',
    gambar: 'https://source.unsplash.com/400x300/?kost,indonesia',
  },
]

export default function UserKosPage() {
  const [kosan, setKosan] = useState<Kos[]>([])

  useEffect(() => {
    // Simulasi loading data dari API
    setTimeout(() => {
      setKosan(dummyKos)
    }, 800)
  }, [])

  return (
    <main className="min-h-screen px-4 py-8 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Kos Saya</h1>

      {kosan.length === 0 ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse flex gap-4 p-4 border rounded-lg bg-white"
            >
              <div className="bg-gray-200 w-32 h-24 rounded-md" />
              <div className="flex-1 space-y-2">
                <div className="bg-gray-200 h-4 w-3/4 rounded" />
                <div className="bg-gray-200 h-4 w-1/2 rounded" />
                <div className="bg-gray-200 h-4 w-1/4 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {kosan.map((kos) => (
            <div key={kos.id} className="bg-white border rounded-lg p-4 shadow-sm">
              <img
                src={kos.gambar}
                alt={kos.nama}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-bold">{kos.nama}</h2>
              <p className="text-gray-600 text-sm">{kos.alamat}</p>
              <p className="text-blue-600 font-medium mt-1">{kos.harga}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                  kos.status === 'tersedia'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {kos.status === 'tersedia' ? 'Tersedia' : 'Penuh'}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
