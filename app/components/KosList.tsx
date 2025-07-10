// app/components/KosList.tsx
'use client'

import { useEffect, useState } from 'react'

type KostType = {
    id: string
    name: string
    price: number
    stars: number
    distance_km: number
}

export default function KosList({ kampusId }: { kampusId: string }) {
    const [kostList, setKostList] = useState<KostType[]>([])

    useEffect(() => {
        async function fetchKost() {
            const res = await fetch(`/api/kost/nearby?univId=${kampusId}`)
            const data = await res.json()
            setKostList(data)
        }

        if (kampusId) fetchKost()
    }, [kampusId])

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Kos Terdekat</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {kostList.map((kost) => (
                    <div key={kost.id} className="bg-white text-black p-4 rounded shadow">
                        <h4 className="font-semibold">{kost.name}</h4>
                        <p className="text-sm text-gray-600">Rp {kost.price.toLocaleString()}</p>
                        <p className="text-sm">⭐ {kost.stars || 0}</p>
                        <p className="text-sm text-blue-600">{kost.distance_km.toFixed(2)} km dari kampus</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
