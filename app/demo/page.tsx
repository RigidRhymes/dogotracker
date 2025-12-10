'use client'
import { useState } from 'react'

export default function PlatformPage() {
    const [email, setEmail] = useState('')
    const [isScanning, setIsScanning] = useState(false)
    const [results, setResults] = useState(null)

    const handleScan = async () => {
        setIsScanning(true)
        setResults(null)

        // Simulate API call
        setTimeout(() => {
            setResults({
                breaches: [
                    {
                        name: 'LinkedIn',
                        date: 'June 2021',
                        exposed: ['Email', 'Password'],
                        risk: 'High',
                    },
                    {
                        name: 'Gravatar',
                        date: 'Oct 2020',
                        exposed: ['Email'],
                        risk: 'Low',
                    },
                ],
            })
            setIsScanning(false)
        }, 3000)
    }

    return (
        <div className="min-h-screen bg-white px-4 py-12">
            <div className="max-w-3xl mx-auto text-center space-y-6">
                <h1 className="text-4xl font-bold">Scan Your Email for Breaches</h1>
                <p className="text-gray-600">
                    Enter your email to check if it has been exposed in any known data breaches.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full sm:w-2/3 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleScan}
                        disabled={!email || isScanning}
                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {isScanning ? 'Scanning...' : 'Scan Now'}
                    </button>
                    <button className='bg-gray-800 text-gray-900 px-6 py-3 rounded-md hover:bg-gray-800 disabled:opacity-50 border border-gray-300 '
                    onClick={() => window.location.href = '/'}
                    >Exit</button>
                </div>

                {isScanning && (
                    <div className="mt-8 text-blue-600 font-medium animate-pulse">
                        🔍 Scanning the web for breaches...
                    </div>
                )}

                {results && (
                    <div className="mt-10 text-left">
                        <h2 className="text-2xl font-semibold mb-4">Scan Results</h2>
                        {results.breaches.length === 0 ? (
                            <p className="text-green-600">🎉 No breaches found for this email!</p>
                        ) : (
                            <ul className="space-y-4">
                                {results.breaches.map((breach, index) => (
                                    <li
                                        key={index}
                                        className="border p-4 rounded-md bg-white shadow-sm"
                                    >
                                        <h3 className="text-lg font-bold">{breach.name}</h3>
                                        <p className="text-sm text-gray-500">Date: {breach.date}</p>
                                        <p className="text-sm">Exposed: {breach.exposed.join(', ')}</p>
                                        <p className={`text-sm font-semibold ${
                                            breach.risk === 'High' ? 'text-red-600' : 'text-yellow-600'
                                        }`}>
                                            Risk Level: {breach.risk}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}


            </div>
        </div>
    )
}
