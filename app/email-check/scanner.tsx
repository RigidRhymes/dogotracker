'use client'

import {RadioTower, Search, CirclePower, RotateCcw } from 'lucide-react'
import {useState} from "react";


type Breach = {
    name: string
    date: string
    exposed: string[]
    risk: string
    source: string
}

type ScanResult = {
   breaches: Breach[]
    totalMentions: number;
   signals: {
       isValid: boolean,
       hasGravatar: boolean,
       foundOnGitHub: boolean,
       foundInBreaches: boolean,
   };
   summary: string
}

const Scanner = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState<ScanResult | null>(null)


    const handleScan = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/scan`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
                credentials: "include",
            });

            const { scanId } = await res.json();

            let done = false;
            let retries = 0
            const maxRetries = 20

            while(!done && retries < maxRetries ){
                retries++

                const poll = await fetch(`/api/scan/${scanId}`, {
                    credentials: "include",
                });

                if(!poll.ok){
                    console.error("Polling failed", poll.status)
                    break
                }

                const data = await poll.json();

                if(data.status === 'completed' || data.status === 'failed'){
                    setResults(data.result);
                    done = true;
                }else {
                    await new Promise(r => setTimeout(r, 3000));
                }
            }
        }catch (err){
            console.log("Scan failed",err)
        }finally {
            setLoading(false)
        }
    }

    const handleReset = () => {
        setEmail("")
        setResults(null)
    }

    return (
        <div className=''>
            <div className='w-full h-full'>
                <h2 className='text-5xl text-white font-bold'>Neural Scanner <span className='primary-text'>v2.4</span></h2>
                <p className='text-gray-500'>Deploying sentient heuristics for real-time identity validation. Cross-referencing 4.2B data points across decentralized networks.</p>

                <div className='mt-12 relative'>
                    <div className='bg-[#00f2ff]/20 blur-3xl absolute rounded-full h-[450px] w-[650px]'></div>
                    <div className='relative h-[450px] w-[650px] border border-[#00f2ff]/20 z-10 rounded-md bg-gray-800 px-6'>
                        <div className='flex flex-col mt-6'>
                            <div className='items-center flex gap-2'>
                                <RadioTower className='w-10 h-10 primary-text'/>
                                <h1 className='text-2xl font-bold text-white p-4'>SCAN EMAIL ADDRESS</h1>
                            </div>
                        <p className='text-gray-500 px-6'>TARGET IDENTIFICATION EMAIL</p>
                        </div>
                        <div className='flex items-end gap-2'>
                            <div className='mt-12 border-b-2 border-[#00f2ff] flex items-center gap-4 p-1 bg-black'>
                                <Search className='primary-text w-8 h-8'/>
                                <input value={email} onChange={e => setEmail(e.target.value)} placeholder='example@email.com' className='text-gray-500 rounded-md bg-[#00f2ff]/20 p-2 text-2xl focus:outline-none active:bg-[#00f2ff]/20'/>
                            </div>
                            <div className='bg-[#00f2ff] absolute rounded-full h-[38px] w-[38px] blur-3xl'></div>
                            <div className='relative'>
                                <button className='primary-col h-[38px] p-4 rounded-md font-bold flex items-center justify-center' onClick={handleScan} disabled={loading}>
                                    <CirclePower className='text-black w-10 h-10'/>
                                    {loading ? "Scanning..." : "INITIALIZE SCAN"}
                                </button>
                            </div>
                            <button className='primary-col h-[38px] p-4 rounded-md font-bold' onClick={handleReset} disabled={loading}>
                                <RotateCcw />
                            </button>
                        </div>
                        {results && (
                            <div className='text-gray-500'>
                                <h3>Scan Summary</h3>
                                <p>{results.summary}</p>
                                <h3>Signals</h3>
                                <ul>
                                    <li>Email valid: {results.signals.isValid ? "Yes" : "No"}</li>
                                    <li>Has Gravatar: {results.signals.hasGravatar ? "Yes" : "No"}</li>
                                    <li>Found on Github: {results.signals.foundOnGitHub ? "Yes" : "No"}</li>
                                    <li>Found in Breaches: {results.signals.foundInBreaches ? "Yes": "No"}</li>
                                </ul>
                                <h3>Breaches</h3>
                                {results.breaches.length > 0  ? (
                                    <table>
                                        <thead>
                                        <tr>
                                            <th className="border border-gray-600 px-2 py-1">Name</th>
                                            <th className="border border-gray-600 px-2 py-1">Date</th>
                                            <th className="border border-gray-600 px-2 py-1">Exposed</th>
                                            <th className="border border-gray-600 px-2 py-1">Risk</th>
                                            <th className="border border-gray-600 px-2 py-1">Source</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {results.breaches.map((b, idx) => (
                                            <tr key={idx}>
                                                <td className="border border-gray-600 px-2 py-1">{b.name}</td>
                                                <td className="border border-gray-600 px-2 py-1">{b.date}</td>
                                                <td className="border border-gray-600 px-2 py-1">{b.exposed.join(", ")}</td>
                                                <td className="border border-gray-600 px-2 py-1">{b.risk}</td>
                                                <td className="border border-gray-600 px-2 py-1">{b.source}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No Breaches found</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Scanner
