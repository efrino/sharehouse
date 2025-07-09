'use client'

import { useEffect, useState } from 'react'

type Booking = {
  id: string
  namaKos: string
  alamat: string
  tanggalMasuk: string
  durasi: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function HistoryPage() {
  const [data, setData] = useState<Booking[] | null>(null)

  useEffect(() => {
    // Simulasi fetching data
    setTimeout(() => {
      setData([
        {
          id: '1',
          namaKos: 'Kos Mawar Indah',
          alamat: 'Jl. Melati No. 17, Semarang',
          tanggalMasuk: '2024-07-01',
          durasi: '6 bulan',
          status: 'approved',
        },
        {
          id: '2',
          namaKos: 'Kos Putra Harmoni',
          alamat: 'Jl. Anggrek No. 5, Semarang',
          tanggalMasuk: '2024-01-15',
          durasi: '3 bulan',
          status: 'rejected',
        },
      ])
    }, 1200)
  }, [])

  return (
    <main className="min-h-screen px-4 py-8 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Riwayat Pemesanan Kos</h1>

      <div className="space-y-4">
        {!data ? (
          // SKELETON LOADING
          Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white p-4 rounded shadow-md space-y-2"
            >
              <div className="h-4 w-1/3 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
              <div className="h-4 w-1/4 bg-gray-200 rounded" />
              <div className="h-8 w-24 bg-gray-200 rounded mt-2" />
            </div>
          ))
        ) : data.length === 0 ? (
          <p className="text-gray-500">Belum ada riwayat pemesanan.</p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow-md space-y-1 border-l-4"
              style={{
                borderColor:
                  item.status === 'approved'
                    ? '#16a34a'
                    : item.status === 'pending'
                    ? '#facc15'
                    : '#dc2626',
              }}
            >
              <h2 className="text-lg font-semibold">{item.namaKos}</h2>
              <p className="text-sm text-gray-600">{item.alamat}</p>
              <p className="text-sm">Tanggal Masuk: {item.tanggalMasuk}</p>
              <p className="text-sm">Durasi: {item.durasi}</p>
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  item.status === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : item.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {item.status === 'approved'
                  ? 'Disetujui'
                  : item.status === 'pending'
                  ? 'Menunggu'
                  : 'Ditolak'}
              </span>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
