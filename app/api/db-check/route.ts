import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/database/mongoose'

export async function GET() {
  try {
    const m = await connectToDatabase()
    const db = m.connection.db!
    if(!db){
      throw new Error("Database not connected")
    }
    const admin = db.admin()

    const ping = await admin.ping()

    const colName = 'zz__healthcheck__tmp'
    const col = db.collection(colName)
    const doc = { _hc: true, ts: new Date() }
    const ins = await col.insertOne(doc)
    const got = await col.findOne({ _id: ins.insertedId })
    await col.deleteOne({ _id: ins.insertedId })
    await db.dropCollection(colName).catch(() => {})

    return NextResponse.json({
      ok: true,
      connection: {
        name: m.connection.name,
        host: m.connection.host,
        readyState: m.connection.readyState,
      },
      ping,
      crud: {
        insertAcknowledged: ins.acknowledged,
        readBack: Boolean(got),
      },
    })
  } catch (e: any) {
    return NextResponse.json(
        { ok: false, error: e?.message || 'Unknown error' },
        { status: 500 },
    )
  }
}
