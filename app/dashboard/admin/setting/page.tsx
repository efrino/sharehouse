'use client'

import { useEffect, useState } from 'react'

type Settings = {
  appName: string
  contactEmail: string
  maintenanceMode: boolean
}

export default function AdminSettingPage() {
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<Settings | null>(null)

  useEffect(() => {
    // Simulasi fetching data pengaturan
    setTimeout(() => {
      setSettings({
        appName: 'ShareHouse Platform',
        contactEmail: 'admin@sharehouse.app',
        maintenanceMode: false,
      })
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Pengaturan Aplikasi</h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-xl space-y-4">
        {loading ? (
          <>
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
            <div className="h-10 bg-gray-300 rounded animate-pulse" />
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nama Aplikasi
              </label>
              <input
                type="text"
                value={settings?.appName}
                disabled
                className="mt-1 block w-full p-2 border rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Kontak
              </label>
              <input
                type="email"
                value={settings?.contactEmail}
                disabled
                className="mt-1 block w-full p-2 border rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mode Maintenance
              </label>
              <input
                type="checkbox"
                checked={settings?.maintenanceMode}
                disabled
                className="mt-2"
              />{' '}
              <span className="ml-2 text-gray-600">
                {settings?.maintenanceMode ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>

            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
              Simpan Perubahan
            </button>
          </>
        )}
      </div>
    </main>
  )
}
