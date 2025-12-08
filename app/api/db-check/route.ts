import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { connectToDatabase } from '@/database/mongoose'

export async function GET() {
  try {
    const m = await connectToDatabase()

    const db = mongoose.connection.db
    const admin = db.admin()

    // Health check: ping
    const ping = await admin.ping()

    // Basic CRUD smoke test in a temporary collection
    const col = db.collection('zz__healthcheck__tmp')
    const doc = { _hc: true, ts: new Date() }
    const ins = await col.insertOne(doc)
    const got = await col.findOne({ _id: ins.insertedId })
    await col.deleteOne({ _id: ins.insertedId })

    return NextResponse.json({
      ok: true,
      connection: {
        name: mongoose.connection.name,
        host: mongoose.connection.host,
        readyState: mongoose.connection.readyState,
      },
      ping,
      crud: {
        insertAcknowledged: ins.acknowledged,
        readBack: Boolean(got),
      },
    })
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        error: e?.message || 'Unknown error',
      },
      { status: 500 },
    )
  }
}
