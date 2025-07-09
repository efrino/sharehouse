'use client'

import { useEffect, useState } from 'react'

type OwnerSetting = {
  name: string
  email: string
  phone: string
  kosName: string
  address: string
}

export default function OwnerSettingPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<OwnerSetting | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setData({
        name: 'Budi Santoso',
        email: 'budi.kos@example.com',
        phone: '081234567890',
        kosName: 'Kos Harmoni Putra',
        address: 'Jl. Jambu No. 8, Semarang',
      })
      setLoading(false)
    }, 1200)
  }, [])

  return (
    <main className="min-h-screen px-4 py-8 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Pengaturan Akun Pemilik</h1>

      <div className="bg-white p-6 rounded shadow-md max-w-xl space-y-4">
        {loading || !data ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>
        ) : (
          <>
            <div>
              <label className="text-sm font-medium">Nama Lengkap</label>
              <p className="text-gray-700">{data.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-gray-700">{data.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Nomor HP</label>
              <p className="text-gray-700">{data.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Nama Kos</label>
              <p className="text-gray-700">{data.kosName}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Alamat Kos</label>
              <p className="text-gray-700">{data.address}</p>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
