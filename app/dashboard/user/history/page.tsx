'use client'

import { useEffect, useState } from 'react'

export default function BookingHistory() {
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await fetch('/api/user/kost/history')
        const json = await res.json()
        setHistory(json || [])
      } catch (err) {
        console.error('Gagal fetch riwayat pemesanan:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBooking()
  }, [])

  return (
    <main className="min-h-screen px-4 py-8 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Riwayat Pemesanan Kos</h1>

      <div className="space-y-4">
        {loading ? (
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
        ) : history.length === 0 ? (
          <p className="text-gray-500">Belum ada riwayat pemesanan.</p>
        ) : (
          history.map((item) => (
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
              <h2 className="text-lg font-semibold">{item.kost?.name}</h2>
              <p className="text-sm text-gray-600">{item.kost?.address || 'Alamat tidak tersedia'}</p>
              <p className="text-sm">Tanggal Masuk: {item.start_date}</p>
              <p className="text-sm">Durasi: {item.duration} bulan</p>
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${item.status === 'approved'
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