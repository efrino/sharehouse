import { supabase } from '@/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const kostId = formData.get('kostId') as string

    if (!file || !kostId) {
        return NextResponse.json({ error: 'Missing file or kostId' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${kostId}-${randomUUID()}.${fileExt}`

    // Upload ke Supabase Storage
    const { error: uploadError } = await supabase.storage
        .from('kost-images')
        .upload(fileName, file, {
            contentType: file.type,
            upsert: false,
        })

    if (uploadError) {
        return NextResponse.json({ error: 'Upload failed', detail: uploadError.message }, { status: 500 })
    }

    // Ambil public URL
    const { data: publicUrlData } = supabase.storage
        .from('kost-images')
        .getPublicUrl(fileName)

    const url = publicUrlData?.publicUrl

    // Simpan ke tabel kost_images
    const { error: dbError } = await supabase
        .from('kost_images')
        .insert({
            kost_id: kostId,
            url,
        })

    if (dbError) {
        return NextResponse.json({ error: 'DB insert failed', detail: dbError.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Upload sukses', url })
}
