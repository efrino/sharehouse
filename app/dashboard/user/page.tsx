'use client'

import { useEffect, useState } from 'react'
import KosCard from '../../components/KosCard'
import UniversityFilterSelect from '../../components/UniversityFilterSelect'

export default function UserDashboard() {
  const [activeKost, setActiveKost] = useState([])
  const [displayKost, setDisplayKost] = useState([])
  const [selectedUniv, setSelectedUniv] = useState<string>('')

  // Fetch kost aktif milik user
  useEffect(() => {
    fetch('/api/user/kost')
      .then(res => res.json())
      .then(data => setActiveKost(data))
  }, [])

  // Fetch nearby/all kos tergantung filter universitas
  useEffect(() => {
    const fetchKost = async () => {
      let url = ''
      if (selectedUniv) {
        url = `/api/kost/nearby?univId=${selectedUniv}&maxDistance=5`
      } else {
        url = '/api/kost/all'
      }

      try {
        const res = await fetch(url)
        const json = await res.json()
        setDisplayKost(json || [])
      } catch (error) {
        console.error('Gagal fetch kos:', error)
        setDisplayKost([])
      }
    }

    fetchKost()
  }, [selectedUniv])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Pengguna</h1>

      {activeKost.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {activeKost.map((item: any) => (
            <KosCard key={item.kost.id} kost={item.kost} />
          ))}
        </div>
      ) : (
        <div className="text-gray-600 mb-6">
          Kamu belum memiliki kost aktif, yuk cari dibawah 👇
        </div>
      )}

      <div className="mb-4">
        <UniversityFilterSelect
          selected={selectedUniv}
          onChange={setSelectedUniv}
        />
      </div>

      {displayKost.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayKost.map((kost: any) => (
            <KosCard key={kost.id} kost={kost} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Tidak ada kost ditemukan.</p>
      )}
    </div>
  )
}
