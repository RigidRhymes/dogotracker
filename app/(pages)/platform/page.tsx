'use client'
import React, {useEffect, useState} from 'react'
import Button from "@/components/Button";
import {clearInterval} from "node:timers";


const Page = () => {
    const [email, setEmail] = useState('')
    const [isScanning, setIsScanning] = useState(false)
    const [results, setResults] = useState(null)
    const [scanId, setScanId] = useState<string | null>(null)


    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsScanning(true)
        setResults(null)

        const res = await fetch('http://localhost:4000/api/scan',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_TOKEN}`,
            },
            body: JSON.stringify({email}),
        });

        const data = await res.json();
        setIsScanning(false);
        if(res.ok){
            setScanId(data.scanId)
        }else {
            alert(data.error || 'Scan failed')
            setIsScanning(false)
        }

    }
    useEffect(() => {
        if(!scanId) return;

        const interval = setInterval(async() => {
            const res = await fetch(`http://localhost:4000/api/scan/${scanId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_TOKEN}`,
                },
            });
            const data = await res.json();

            if(data.status === 'completed'){
                clearInterval(interval);
                setResults(data.result || {breaches: []})
                setIsScanning(false)
            }
        }, 2000)
        return () => clearInterval(interval)
    }, [scanId]);

    return (
        <div className='w-full min-h-screen text-white relative sm:mt-4 mt-10'>
            <div className='max-w-7xl mx-auto text-center space-y-6'>
                <h1 className='text-gray-300 font-bold text-2xl'>Scan Your Email for Breaches</h1>
                <p className='text-gray-500'>Enter you email to check if it has been exposed in any known data Breaches</p>
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-center sm:items-center items-center justify-center gap-4 mt-4'>
                <input type='email' placeholder='you@example.com'
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="w-full sm:w-2/3 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    disabled={!email || isScanning}
                    onClick={handleScan}
                    className='px-6 py-3 text-white rounded-md bg-gray-600 hover:bg-orange-400 transition disabled:opacity-50 cursor-pointer'>
                    {isScanning ? 'Scanning...' : 'Scan Now'}
                </button>
                <button
                    disabled={isScanning || !results}
                    className='px-6 py-3 text-white cursor-pointer rounded-md bg-transparent border border-gray-300 hover:animate-pulse hover:transform hover:transition-opacity disabled:opacity-50'>Exit</button>
            </div>
                {isScanning && (
                <div className='mt-8 text-gray-500 font-medium animate-spin'>
                    🔍 Scanning the web for breaches...
                </div>
            )}
            {results && (
                <div className='mt-10 text-left'>
                    <h2 className='text-2xl font-semibold mb-4'>Scan Result</h2>
                    {results.breaches.length === 0 ? (
                        <p className='text-gray-300'>No breaches found for this email!</p>
                    ) : (
                        <ul className='space-y-4'>
                            {results.breaches.map((breach, index) => (
                                <li key={index} className='border p-4 rounded-md bg-gray-600 shadow-sm'>
                                    <h3 className='text-lg font-bold'>{breach.name}</h3>
                                    <p>Date: {breach.date}</p>
                                    <p className='text-sm'>Exposed: {breach.exposed.join((', '))}</p>
                                    <p className={`text-sm font-semibold ${breach.risk === 'High' ? 'text-red-600' : 'text-yellow-600'
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
    )
}
export default Page
