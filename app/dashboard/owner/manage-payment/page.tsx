'use client'

import { useEffect, useState } from 'react'

type PaymentRecord = {
  userName: string
  roomName: string
  amount: number
  dueDate: string
  status: 'Lunas' | 'Belum Bayar'
}

export default function ManagePaymentPage() {
  const [loading, setLoading] = useState(true)
  const [payments, setPayments] = useState<PaymentRecord[]>([])

  useEffect(() => {
    setTimeout(() => {
      setPayments([
        {
          userName: 'Andi Pratama',
          roomName: 'Kamar A1',
          amount: 750000,
          dueDate: '2025-08-01',
          status: 'Belum Bayar',
        },
        {
          userName: 'Siti Aminah',
          roomName: 'Kamar B2',
          amount: 850000,
          dueDate: '2025-07-28',
          status: 'Lunas',
        },
        {
          userName: 'Rizky Hidayat',
          roomName: 'Kamar C3',
          amount: 700000,
          dueDate: '2025-08-05',
          status: 'Belum Bayar',
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-6">Manajemen Pembayaran Kos</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Penyewa</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Kamar</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Jumlah</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Tenggat</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24" /></td>
                  <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-16" /></td>
                  <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-20" /></td>
                  <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24" /></td>
                  <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-16" /></td>
                </tr>
              ))
            ) : (
              payments.map((payment, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{payment.userName}</td>
                  <td className="px-4 py-3">{payment.roomName}</td>
                  <td className="px-4 py-3">Rp{payment.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">{payment.dueDate}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        payment.status === 'Lunas'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
