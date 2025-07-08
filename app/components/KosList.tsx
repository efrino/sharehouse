'use client'

import { kosList } from '../data/kos'
import Image from 'next/image'

export default function KosList({ kampus }: { kampus: string }) {
    const filteredKos = kosList.filter((kos) => kos.kampus === kampus)

    if (filteredKos.length === 0) {
        return (
            <p className="text-center text-gray-300 mt-8">
                Belum ada kos untuk kampus ini.
            </p>
        )
    }

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {filteredKos.map((kos) => (
                <div
                    key={kos.id}
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md"
                >
                    <Image
                        src={kos.gambar}
                        alt={kos.nama}
                        width={400}
                        height={240}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-bold mb-2">{kos.nama}</h3>
                        <p className="text-sm text-gray-600">{kos.harga}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
