'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardRedirect() {
    const router = useRouter()

    useEffect(() => {
        const checkRoleAndRedirect = async () => {
            try {
                const res = await fetch('/api/me')

                if (!res.ok) {
                    router.push('/auth/login')
                    return
                }

                const { role } = await res.json()

                switch (role) {
                    case 'admin':
                        router.push('/dashboard/admin')
                        break
                    case 'owner':
                        router.push('/dashboard/owner')
                        break
                    default:
                        router.push('/dashboard/user')
                        break
                }
            } catch (err) {
                console.error('Gagal mengambil role:', err)
                router.push('/auth/login')
            }
        }

        checkRoleAndRedirect()
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Mengarahkan ke dashboard Anda...</p>
        </div>
    )
}
