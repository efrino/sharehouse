// components/KosCard.tsx
'use client'

import Image from 'next/image'

export default function KosCard({ kost }: { kost: any }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {kost.kost_images?.length > 0 && (
                <Image
                    src={kost.kost_images[0].url}
                    alt={kost.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{kost.name}</h2>
                <p className="text-sm text-gray-600">{kost.universities?.name || 'Universitas tidak diketahui'}</p>
                <p className="text-blue-600 font-semibold mt-2">Rp {kost.price.toLocaleString()}</p>
                {kost.stars && (
                    <p className="text-yellow-500 text-sm">⭐ {kost.stars}/5</p>
                )}
            </div>
        </div>
    )
}