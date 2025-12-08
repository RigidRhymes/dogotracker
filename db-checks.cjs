require('dotenv').config()
const mongoose = require('mongoose')

async function main() {
    const uri = process.env.MONGODB_URI
    if (!uri) throw new Error('MONGODB_URI missing')

    try {
        const m = await mongoose.connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 8000 })
        console.log('Connected OK:', m.connection.name, m.connection.host)

        // Health check: ping admin
        const ping = await m.connection.db.admin().ping()
        console.log('Ping result:', ping)

        // Basic CRUD smoke test in a temporary collection
        const col = m.connection.db.collection('zz__healthcheck__tmp')
        const doc = { _hc: true, ts: new Date() }
        const ins = await col.insertOne(doc)
        console.log('Insert acknowledged:', ins.acknowledged)
        const got = await col.findOne({ _id: ins.insertedId })
        console.log('Read back OK:', !!got)
        const del = await col.deleteOne({ _id: ins.insertedId })
        console.log('Cleanup deleted count:', del.deletedCount)
    } catch (e) {
        console.error('Connection FAILED:', e.message)
        process.exitCode = 1
    } finally {
        await mongoose.disconnect().catch(() => {})
    }
}

main()