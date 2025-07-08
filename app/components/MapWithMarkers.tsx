'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import Select from 'react-select'
import { KampusType } from '../types'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})

const kampus: KampusType[] = [
    { label: 'UNDIP', value: 'undip', coords: [-7.0545, 110.4228] },
    { label: 'UNNES', value: 'unnes', coords: [-6.9936, 110.3401] },
    { label: 'UNIKA', value: 'unika', coords: [-7.0084, 110.4148] },
    { label: 'POLINES', value: 'polines', coords: [-7.0489, 110.4392] },
    { label: 'UDINUS', value: 'udinus', coords: [-6.9836, 110.4091] },
]

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
    return (
        <div className="space-y-4">
            {/* Dropdown Filter */}
            <Select
                options={kampus}
                value={selectedKampus}
                onChange={(selected) => setSelectedKampus(selected!)}
                className="text-black"
                menuPlacement="top" // 💡 Agar dropdown membuka ke atas
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

                {/* Marker semua kampus */}
                {kampus.map((item, i) => (
                    <Marker key={i} position={item.coords}>
                        <Popup>{item.label}</Popup>
                    </Marker>
                ))}

                {/* Fly to selected */}
                <FlyToKampus coords={selectedKampus.coords} />
            </MapContainer>
        </div>
    )
}
