'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { KampusType } from '../types'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})

function FlyToKampus({ coords }: { coords: [number, number] }) {
    const map = useMap()
    useEffect(() => {
        if (coords) {
            map.flyTo(coords, 15)
        }
    }, [coords, map])
    return null
}

export default function MapWithMarkers({
    selectedKampus,
    setSelectedKampus,
}: {
    selectedKampus: KampusType
    setSelectedKampus: (kampus: KampusType) => void
}) {
    const [kampusList, setKampusList] = useState<KampusType[]>([])

    useEffect(() => {
        async function fetchUniversities() {
            try {
                const res = await fetch('/api/universities')
                const data = await res.json()
                const kampusData = data.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                    coords: [item.lat, item.lon] as [number, number],
                }))
                setKampusList(kampusData)
                if (kampusData.length > 0 && !selectedKampus) {
                    setSelectedKampus(kampusData[0])
                }
            } catch (err) {
                console.error('Gagal mengambil universitas:', err)
            }
        }

        fetchUniversities()
    }, [setSelectedKampus])

    return (
        <div className="space-y-4">
            {/* Dropdown Filter */}
            <Select
                options={kampusList}
                value={selectedKampus}
                onChange={(selected) => selected && setSelectedKampus(selected)}
                className="text-black"
                menuPlacement="top"
                styles={{
                    control: (base) => ({
                        ...base,
                        borderRadius: '0.5rem',
                        padding: '2px',
                        zIndex: 50,
                    }),
                }}
            />

            {/* Map */}
            <MapContainer
                center={[-7.0, 110.4]}
                zoom={12}
                scrollWheelZoom={false}
                style={{ height: '400px', width: '100%' }}
                className="rounded-lg shadow-lg z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {kampusList.map((kampus, i) => (
                    <Marker key={i} position={kampus.coords}>
                        <Popup>{kampus.label}</Popup>
                    </Marker>
                ))}

                {/* Auto fly to selected kampus */}
                {selectedKampus && <FlyToKampus coords={selectedKampus.coords} />}
            </MapContainer>
        </div>
    )
}
