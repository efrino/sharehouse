'use client'

import { useEffect, useState } from 'react'

type Room = {
  number: number
  available: boolean
  facilities: string[]
}

type Kost = {
  id: string
  name: string
  address: string
  owner: string
  photo: string
  rooms: Room[]
  status: 'active' | 'inactive'
}

export default function ManageKostAdminPage() {
  const [loading, setLoading] = useState(true)
  const [kostList, setKostList] = useState<Kost[]>([])
  const [editKost, setEditKost] = useState<Kost | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setKostList([
        {
          id: '1',
          name: 'Kos Bunga Mawar',
          address: 'Jl. Gajah Mada No. 88',
          owner: 'Andi Pratama',
          photo: 'https://via.placeholder.com/300x180?text=Kos+Mawar',
          rooms: [
            { number: 1, available: true, facilities: ['AC', 'WiFi'] },
            { number: 2, available: false, facilities: ['Kipas', 'Kamar Mandi Dalam'] },
          ],
          status: 'active',
        },
        {
          id: '2',
          name: 'Kos Melati Asri',
          address: 'Jl. Pandanaran No. 15',
          owner: 'Siti Nurhaliza',
          photo: 'https://via.placeholder.com/300x180?text=Kos+Melati',
          rooms: [
            { number: 1, available: true, facilities: ['Kipas', 'Parkir'] },
            { number: 2, available: true, facilities: ['WiFi'] },
          ],
          status: 'inactive',
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleDelete = (id: string) => {
    setKostList(prev => prev.filter(kost => kost.id !== id))
  }

  const handleEditChange = (field: keyof Kost, value: any) => {
    if (editKost) {
      setEditKost({ ...editKost, [field]: value })
    }
  }

  const handleRoomChange = (index: number, field: keyof Room, value: any) => {
    if (editKost) {
      const updatedRooms = [...editKost.rooms]
      updatedRooms[index] = { ...updatedRooms[index], [field]: value }
      setEditKost({ ...editKost, rooms: updatedRooms })
    }
  }

  const saveEdit = () => {
    setKostList(prev =>
      prev.map(k => (k.id === editKost?.id ? editKost : k))
    )
    setEditKost(null)
  }

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
              </div>
            ))
          : kostList.map((kost) => (
              <div
                key={kost.id}
                className="bg-white p-4 rounded shadow hover:shadow-md transition space-y-2"
              >
                <img src={kost.photo} alt={kost.name} className="w-full h-40 object-cover rounded" />
                <h2 className="text-lg font-semibold">{kost.name}</h2>
                <p className="text-sm text-gray-600"><strong>Alamat:</strong> {kost.address}</p>
                <p className="text-sm text-gray-600"><strong>Owner:</strong> {kost.owner}</p>
                <p className="text-sm text-gray-600"><strong>Jumlah Kamar:</strong> {kost.rooms.length}</p>
                <p className="text-sm text-gray-600">
                  <strong>Kamar Tersedia:</strong> {kost.rooms.filter(r => r.available).length}
                </p>
                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${kost.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {kost.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                </span>
                <div className="flex space-x-2 mt-2">
                  <button onClick={() => setEditKost(kost)} className="text-blue-600 text-sm hover:underline">Edit</button>
                  <button onClick={() => handleDelete(kost.id)} className="text-red-600 text-sm hover:underline">Hapus</button>
                </div>
              </div>
            ))}
      </div>

      {/* Modal Edit */}
      {editKost && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Edit Kos</h2>
            <div className="space-y-3">
              <input value={editKost.name} onChange={e => handleEditChange('name', e.target.value)} className="w-full border p-2 rounded" placeholder="Nama Kos" />
              <input value={editKost.address} onChange={e => handleEditChange('address', e.target.value)} className="w-full border p-2 rounded" placeholder="Alamat" />
              <input value={editKost.photo} onChange={e => handleEditChange('photo', e.target.value)} className="w-full border p-2 rounded" placeholder="URL Foto" />
              <select value={editKost.status} onChange={e => handleEditChange('status', e.target.value)} className="w-full border p-2 rounded">
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>

              <div className="mt-4 space-y-4">
                <h3 className="text-lg font-semibold">Kamar</h3>
                {editKost.rooms.map((room, index) => (
                  <div key={index} className="border p-3 rounded space-y-2 bg-gray-50">
                    <p className="text-sm font-semibold">Kamar #{room.number}</p>
                    <label className="block text-sm">
                      Ketersediaan:
                      <select
                        value={room.available ? 'yes' : 'no'}
                        onChange={e => handleRoomChange(index, 'available', e.target.value === 'yes')}
                        className="w-full mt-1 border p-1 rounded"
                      >
                        <option value="yes">Tersedia</option>
                        <option value="no">Tidak Tersedia</option>
                      </select>
                    </label>
                    <label className="block text-sm">
                      Fasilitas:
                      <input
                        value={room.facilities.join(', ')}
                        onChange={e =>
                          handleRoomChange(index, 'facilities', e.target.value.split(',').map(f => f.trim()))
                        }
                        className="w-full mt-1 border p-1 rounded"
                        placeholder="Contoh: AC, WiFi"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setEditKost(null)} className="px-4 py-2 bg-gray-300 rounded">Batal</button>
              <button onClick={saveEdit} className="px-4 py-2 bg-blue-600 text-white rounded">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
