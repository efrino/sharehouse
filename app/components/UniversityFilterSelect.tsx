// components/UniversityFilterSelect.tsx
'use client'

import { useEffect, useState } from 'react'

type University = {
    id: string
    name: string
}

export default function UniversityFilterSelect({
    selected = '',
    onChange,
    label = 'Filter Universitas',
    className = '',
}: {
    selected?: string
    onChange: (value: string) => void
    label?: string
    className?: string
}) {
    const [universities, setUniversities] = useState<University[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUniversities() {
            try {
                const res = await fetch('/api/universities')
                const json = await res.json()

                if (Array.isArray(json)) {
                    setUniversities(json)
                } else {
                    console.error('Unexpected response from /api/universities:', json)
                }
            } catch (err) {
                console.error('Failed to fetch universities:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchUniversities()
    }, [])

    return (
        <div className={`mb-4 ${className}`}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <select
                value={selected || ''}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            >
                <option value="">Semua Universitas</option>
                {universities.map((u) => (
                    <option key={u.id} value={u.id}>
                        {u.name}
                    </option>
                ))}
            </select>
            {loading && <p className="text-sm text-gray-400 mt-1">Memuat universitas...</p>}
        </div>
    )
}
