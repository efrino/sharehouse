'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { supabase } from '../lib/supabaseClient'
import KosList from './components/KosList'
import { KampusType } from './types'

// Dynamic Map component
const MapWithMarkers = dynamic(() => import('./components/MapWithMarkers'), {
  ssr: false,
})

const images = ['/kos3.png', '/kos1.png', '/kos2.png']

export default function Home() {
  const [index, setIndex] = useState(0)
  const [kampusList, setKampusList] = useState<KampusType[]>([])
  const [selectedKampus, setSelectedKampus] = useState<KampusType | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function fetchUniversities() {
      const { data, error } = await supabase.from('universities').select('*')
      if (error) {
        console.error('Gagal mengambil universitas:', error)
        return
      }

      const kampusData: KampusType[] = data.map((u: any) => ({
        label: u.name,
        value: u.id,
        coords: [u.lat, u.lon],
      }))
      setKampusList(kampusData)
      setSelectedKampus(kampusData[0])
    }

    fetchUniversities()
  }, [])

  return (
    <div className="relative min-h-screen text-white">
      {/* Carousel background */}
      <div className="absolute inset-0 z-0">
        <Image
          key={images[index]}
          src={images[index]}
          alt="Kos Semarang"
          fill
          className="object-cover brightness-[0.5] transition-opacity duration-1000"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-12 max-w-2xl mx-auto pt-24">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Temukan Kos Impianmu di Semarang
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Platform modern untuk pencari kos, pemilik kos, dan admin pengelola. Akses mudah,
          informasi lengkap, dan terpercaya.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a
            href="#lokasi"
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Lihat Kos
          </a>
          <a
            href="/auth/sign-up"
            className="bg-transparent border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
          >
            Gabung Sebagai Pemilik Kos
          </a>
        </motion.div>
      </div>

      {/* Peta lokasi & kos */}
      <motion.div
        id="lokasi"
        className="relative z-10 max-w-5xl mx-auto mt-32 p-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          Lokasi Populer di Semarang
        </h2>
        <p className="text-center text-gray-200 mb-6">
          Jelajahi kos-kosan di dekat kampus ternama seperti UNDIP, UNNES, dan lainnya.
        </p>

        {selectedKampus && kampusList.length > 0 && (
          <>
            <MapWithMarkers
              selectedKampus={selectedKampus}
              setSelectedKampus={setSelectedKampus}
              kampusList={kampusList}
            />
            <KosList kampusId={selectedKampus.value} />
          </>
        )}
      </motion.div>
    </div>
  )
}
