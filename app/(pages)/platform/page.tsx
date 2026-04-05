'use client';
import React, { useEffect, useMemo, useState } from 'react';

type Breach = {
  name: string;
  date: string;
  exposed: string[];
  risk: 'Low' | 'Medium' | 'High';
  source?: string;
};

type ScanResult = {
  breaches: Breach[];
  totalMentions: number;
  signals: {
    isValid: boolean;
    hasGravatar: boolean;
    foundOnGithub: boolean;
    foundInBreaches: boolean;
  };
  summary: string;
};

const Page = () => {
  const [email, setEmail] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult | null>(null);
  const [scanId, setScanId] = useState<string | null>(null);

  // Single token source (dev): set NEXT_PUBLIC_JWT_TOKEN in frontend .env.local
  const token = useMemo(() => process.env.NEXT_PUBLIC_JWT_TOKEN, []);

  const safeParseJson = async (res: Response) => {
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      try {
        return await res.json();
      } catch {
        return null;
      }
    }
    return null;
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    if (!token) {
      alert('Missing JWT token. Define NEXT_PUBLIC_JWT_TOKEN in frontend .env.local');
      return;
    }

    setIsScanning(true);
    setResults(null);

    try {
      const res = await fetch('http://localhost:4000/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const err = await safeParseJson(res);
        const message = (err && (err.error || err.message)) || `Scan failed (${res.status})`;
        alert(message);
        setIsScanning(false);
        return;
      }

      const data = await res.json();
      setScanId(data.scanId);
    } catch (error) {
      console.error('Scan request failed:', error);
      alert('Network error while starting scan');
      setIsScanning(false);
    }
  };

  useEffect(() => {
    if (!scanId || !token) return; // bail early, no state update needed

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/scan/${scanId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          clearInterval(interval);
          setIsScanning(false);
          return;
        }

        if (!res.ok) return;

        const data = await res.json();
        if (data.status === 'completed') {
          clearInterval(interval);
          setResults(data.result || { breaches: [] });
          setIsScanning(false);
        }
      } catch (e) {
        console.warn('Polling error:', e);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [scanId, token]);

  return (
      <div className=" bg-black flex-1 h-screen">
        <div className="max-w-7xl mx-auto text-center space-y-6 gap-6">
          <h1 className="text-gray-300 font-bold text-2xl mt-16">Scan Your Email for Breaches</h1>
          <p className="text-gray-500">
            Enter your email to check if it has been exposed in any known data breaches
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center items-center justify-center gap-4 mt-4">
          <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-2/3 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
              disabled={!email || isScanning}
              onClick={handleScan}
              className="px-6 py-3 text-white rounded-md bg-gray-600 hover:bg-orange-400 transition disabled:opacity-50 cursor-pointer"
          >
            {isScanning ? 'Scanning...' : 'Scan Now'}
          </button>
          <button
              disabled={isScanning || !results}
              className="px-6 py-3 text-white cursor-pointer rounded-md bg-transparent border border-gray-300 hover:animate-pulse hover:transform hover:transition-opacity disabled:opacity-50"
              onClick={() => {
                setResults(null);
                setScanId(null);
                setEmail('');
              }}
          >
            Exit
          </button>
        </div>

        {isScanning && (
            <div className="mt-8 text-gray-500 font-medium animate-pulse">
              🔍 Scanning the web for breaches...
            </div>
        )}

        {results && (
            <div className="mt-10 text-left">
              <h2 className="text-2xl font-semibold mb-4">Scan Result</h2>

              {/* Signals and summary */}
              <div className="mb-6 space-y-1 text-gray-300">
                <p>Email valid: {results.signals.isValid ? 'Yes' : 'No'}</p>
                <p>Gravatar found: {results.signals.hasGravatar ? 'Yes' : 'No'}</p>
                <p>GitHub usage: {results.signals.foundOnGithub ? 'Yes' : 'No'}</p>
                <p>Breaches detected: {results.signals.foundInBreaches ? 'Yes' : 'No'}</p>
                <p>Total mentions: {results.totalMentions}</p>
                <p className="mt-2 italic text-gray-400">{results.summary}</p>
              </div>

              {/* Breach list */}
              {results.breaches.length === 0 ? (
                  <p className="text-gray-300">No breaches found for this email!</p>
              ) : (
                  <ul className="space-y-4">
                    {results.breaches.map((breach, index) => (
                        <li key={index} className="border p-4 rounded-md bg-gray-600 shadow-sm">
                          <h3 className="text-lg font-bold">{breach.name}</h3>
                          <p>Date: {breach.date}</p>
                          <p className="text-sm">Exposed: {breach.exposed.join(', ')}</p>
                          <p
                              className={`text-sm font-semibold ${
                                  breach.risk === 'High' ? 'text-red-600' : 'text-yellow-600'
                              }`}
                          >
                            Risk Level: {breach.risk}
                          </p>
                          {breach.source && (
                              <p className="text-sm text-gray-600 underline">
                                <a href={breach.source} target="_blank" rel="noopener noreferrer">
                                  {breach.source}
                                </a>
                              </p>
                          )}
                        </li>
                    ))}
                  </ul>
              )}
            </div>
        )}
      </div>
  );
};

export default Page;
