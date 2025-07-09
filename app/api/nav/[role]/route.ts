// import { NextRequest, NextResponse } from 'next/server'
// import path from 'path'
// import { promises as fs } from 'fs'

// export async function GET(
//     req: NextRequest,
//     { params }: { params: { role: string } }
// ) {
//     const role = params.role
//     const baseDir = path.join(process.cwd(), 'app', 'dashboard', role)

//     try {
//         const files = await fs.readdir(baseDir, { withFileTypes: true })

//         const folders = await Promise.all(
//             files
//                 .filter((f) => f.isDirectory())
//                 .map(async (folder) => {
//                     const pagePath = path.join(baseDir, folder.name, 'page.tsx')
//                     try {
//                         await fs.access(pagePath)
//                         return folder.name
//                     } catch {
//                         return null
//                     }
//                 })
//         )

//         const validFolders = folders.filter(Boolean)

//         return NextResponse.json({ routes: validFolders })
//     } catch (error) {
//         return NextResponse.json({ routes: [] })
//     }
// }
// app/api/nav/[role]/route.ts
import fs from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

// Optional: Daftar role yang valid (untuk keamanan)
const allowedRoles = ['admin', 'user', 'owner']

export async function GET(
    _: NextRequest,
    context: { params?: { role?: string } }
) {
    try {
        const role = context?.params?.role

        if (!role || !allowedRoles.includes(role)) {
            return NextResponse.json(
                { error: 'Invalid role' },
                { status: 400 }
            )
        }

        const baseDir = path.join(process.cwd(), 'app', 'dashboard', role)

        const files = await fs.readdir(baseDir, { withFileTypes: true })

        const routes = files
            .filter((f) => f.isDirectory())
            .map((f) => f.name)
            .filter((name) => !['(components)', '(layout)', 'page.tsx'].includes(name))
            .sort()

        return NextResponse.json({ routes })
    } catch (error) {
        console.error('[API NAV ERROR]', error)
        return NextResponse.json({ routes: [] }, { status: 500 })
    }
}
