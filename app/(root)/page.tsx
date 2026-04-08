'use client'

import { Orbitron, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import { ShieldCheck, Infinity,SquareTerminal, Database} from "lucide-react";
import {useEffect} from "react";
import CardItems from "@/components/CardItems";

;


const orbitron = Orbitron({
    subsets:['latin'],
    weight: ["500", "400", "700"]
})

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ["500", "400", "700"],
})



const Page = () => {
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>

        const root = document.querySelector(".wired-bg") as HTMLElement;

        const handleMove = (e: MouseEvent) => {
            if(root){
                root.style.setProperty("--x", `${e.clientX}px`);
                root.style.setProperty("--y", `${e.clientY}px`);

                root.classList.add("glow-active")

                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    root.classList.remove("glow-active")
                }, 500)
            }
        };

        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return (
        <div className='wired-bg relative'>
           <div className='px-6 mb-12'>
               <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black'></div>
               <div className='hero-grid'>

                   {/*hero text-grid*/}
                   <div className='flex justify-start flex-col px-6 mt-12'>
                       <h1 className={`hero-text ${spaceGrotesk.className}`}>DogoTracker</h1>
                       <p className='text-gray-300 text-sm mt-6 mb-4 text-wrap'>Mitigate every risk and shut down threats across every attack surface with Self-Learning AI that adapts to your business. Proactive, Intelligent, Dynamic.</p>
                       <div className='mt-6 relative flex items-center justify-center'>
                           <div className='bg-[#00f2ff]/30 h-12 absolute w-115 blur-xl  rounded-md'></div>
                           <div className='text-gray-300 text-sm w-110 p-1 z-10 flex flex-row items-center justify-between bg-black rounded-sm'>
                               <ShieldCheck className='w-6 h-6 text-[#00f2ff]'/>
                               <input type='text' placeholder='Enter email, handley or pone number... ' className='p-2 w-82 active:bg-[#00f2ff]/30 ]   '/>
                               <button className='primary-col cursor-pointer p-2 w-28 font-bold text-black items-center jutify-center'>
                                   Verify
                               </button>
                           </div>
                       </div>
                   </div>

                   {/*image grid*/}
                   <div className='w-full flex justify-end'>
                       <div className='relative'>
                           <div className='bg-[#00f2ff]/20 w-[350px] h-[420px] absolute rounded-full blur-3xl'></div>
                           <div className='hero-image border border-[#00f2ff]/20 z-10 shadow-[0_0_50px_rgba(0,242,255,0.1)]'>
                               <Image src='/dogo-ai.png' alt='hero-ai image' width={200} height={250} className='w-full h-full object-cover z-10' />
                           </div>
                       </div>
                   </div>
               </div>
               <div className='relative z-20 mt-12 mb-12'>
                   <CardItems />

                   <div className='bottom-sec'>
                       <div className='flex flex-col items-center justify-center'>
                           <h1 className='primary-text text-3xl font-bold'>99.9%</h1>
                           <p className='text-gray-300 text-[10px] mt-2'>THREA NEUTRALIZATION</p>
                       </div>
                       <div className='flex flex-col items-center justify-center'>
                           <h1 className='primary-text text-3xl font-bold'>2.4M</h1>
                           <p className='text-gray-300 text-[10px] mt-2'>DAILY AI LOGS</p>
                       </div>

                       <div className='flex flex-col items-center justify-center'>
                           <h1 className='primary-text text-3xl font-bold'>40ms</h1>
                           <p className='text-gray-300 text-[10px] mt-2'>REACTION LATENCY</p>
                       </div>

                       <div className='flex flex-col items-center justify-center'>
                           <Infinity className='w-10 h-10 primary-text'/>
                           <p className='text-gray-300 text-[10px] mt-2'>DAILY AI LOGS</p>
                       </div>
                   </div>
               </div>
           </div>
            <div className='h-28'/>
            <footer className='footer relative z-50 '>
                <div>
                    <h3 className={`primary-text text-sm font-bold ${spaceGrotesk.className}`}>DogoTracker AI</h3>
                    <p className='text-gray-500 text-xs'>&copy; 2025 DogoTracker AI. Sentient Security.</p>
                </div>
                <div className='flex flex-row items-center justify-center gap-4 text-gray-500 text-[10px]'>
                    <a>Privacy</a>
                    <a>Terms of Service</a>
                    <a>Contact Support</a>
                    <a>Security Protocols</a>
                </div>
                <div className='flex items-center justify-center gap-4'>
                    <SquareTerminal  className='p-2 primary-text bg-gray-800 rounded-md w-8 h-8'/>
                    <Database className='p-2 primary-text bg-gray-800 rounded-md w-8 h-8'/>
                </div>
            </footer>
        </div>
    )
}
export default Page
