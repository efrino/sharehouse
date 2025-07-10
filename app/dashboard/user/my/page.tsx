'use client'

import { useEffect, useState } from 'react'
import KosCard from '../../../components/KosCard'
import UniversityFilterSelect from '../../../components/UniversityFilterSelect'

export default function UserKosPage() {
  const [activeKos, setActiveKos] = useState<any | null>(null)
  const [allKos, setAllKos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [univFilter, setUnivFilter] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch kos aktif
        const res = await fetch('/api/user/kost/active')
        const json = await res.json()
        if (json?.data) {
          setActiveKos(json.data)
        } else {
          setActiveKos(null)
          fetchAllKos('')
        }
      } catch (err) {
        console.error('Gagal fetch kost aktif:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const fetchAllKos = async (univId: string) => {
    const url = univId ? `/api/kost/nearby?univId=${univId}&maxDistance=5` : `/api/kost/all`
    const res = await fetch(url)
    const json = await res.json()
    setAllKos(json || [])
  }

  const handleUniversityChange = (univId: string) => {
    setUnivFilter(univId)
    fetchAllKos(univId)
  }

  return (
    <main className="min-h-screen px-4 py-8 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Kos Saya</h1>

      {loading ? (
        <p>Loading...</p>
      ) : activeKos ? (
        <KosCard kost={activeKos.kost} />
      ) : (
        <div>
          <p className="text-gray-600 text-center mb-6">
            Kamu belum memiliki kost aktif. Yuk cari kos di bawah ini!
          </p>

          <UniversityFilterSelect
            selected={univFilter}
            onChange={handleUniversityChange}
            className="max-w-md mx-auto"
          />

          {allKos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allKos.map((k, i) => (
                <KosCard key={i} kost={k.kost || k} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">Kos tidak ditemukan.</p>
          )}
        </div>
      )}
    </main>
  )
}
