'use client'

import { Orbitron, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import { ShieldCheck, Infinity,SquareTerminal, Database, Shield} from "lucide-react";
import {useEffect} from "react";
import CardItems from "@/components/CardItems";
import MobileCard from "@/components/MobileCard";



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
        <div className='wired-bg relative overflow-hidden'>
           <div className='px-6 mb-12'>
               <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black'></div>
               <div className='hero-grid'>
                   <div className='sm:hidden flex items-center justify-center h-100 w-100 mt-12'>
                       <Image src='/aimobile.png' alt='mobile AI image' width={100} height={100} className='object-cover w-full h-full z-10' />
                   </div>

                   {/*hero text-grid*/}
                   <div className='flex sm:justify-start justify-center flex-col mt-12 '>
                       <h1 className={`hero-text hidden sm:block ${spaceGrotesk.className}`}>DogoTracker</h1>
                       <div className='w-full flex-wrap'>
                           <div className='mobile-heading mb-2'>
                               <p className='text-white '>THE SENTIENT</p>
                               <p className='primary-text'>SECURITY LAYER</p>
                           </div>
                           <div className='text-hero'>Mitigate every risk and shut down threats across every attack surface with Self-Learning AI that adapts to your business.
                               <div className='sm:flex sm:flex-row primary-text sm:gap-2 font-semibold mt-4'>
                                   <p>Proactive,</p>
                                   <p>Intelligent,</p>
                                   <p>Dynamic.</p>
                               </div>
                           </div>
                       </div>
                       <div className='relative flex mt-12 items-center justify-center sm:justify-start'>
                           <div className='bg-[#00f2ff]/30 h-12 absolute sm:w-145 w-80 blur-xl  rounded-md'></div>
                           <div className='text-gray-300 sm:gap-0 gap-3 text-sm w-80 sm:w-140 sm:p-2 p-2 border border-[#00f2ff]/20 sm:border-0 z-10 flex flex-row items-center justify-between bg-black rounded-sm'>
                               <ShieldCheck className='w-6 h-6 text-[#00f2ff]'/>
                               <input type='text' placeholder='Enter email, handle or pone number... ' className='sm:p-2 sm:w-82 w-52 focus:outline-none focus:ring-1 focus:ring-[#00f2ff]/30'/>
                               <button className='primary-col cursor-pointer p-2 w-28 font-bold text-black items-center jutify-center rounded-md sm:rounded-none'>
                                   Check
                               </button>
                           </div>
                       </div>
                           <div className='flex sm:hidden flex-row gap-4 mt-4 items-center z-50 justify-center'>
                               <div className='p-1 rounded-full bg-blue-950 border w-32 flex border-blue-600 text-white text-xs items-center justify-center'>LIVE LOGS ACTIVE</div>
                               <div className='p-1 rounded-full primary-text border w-32 flex items-center justify-center bg-[#00f2ff]/20 border-b-cyan-500 text-xs'>SENTIENT-4.2</div>
                           </div>
                   </div>

                   {/*image grid*/}
                   <div className='w-full sm:flex justify-end mt-4  hidden '>
                       <div className='relative w-[450px] h-[500px]'>
                           <div className='bg-[#00f2ff]/20 w-[350px] h-[420px] absolute rounded-full blur-3xl'></div>
                           <div className='hero-image border border-[#00f2ff]/20 z-10 shadow-[0_0_50px_rgba(0,242,255,0.1)]'>
                               <div className='relative shimmer-effect w-full h-full rounded-md border border-[#00f2ff]/20'>
                               <Image src='/aimobile.png' alt='hero-ai image' width={450} height={500} className='w-full h-full object-cover z-10' />
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
               <div className='relative z-20 mt-12 mb-12'>
                   <div className='hidden sm:block'>
                        <CardItems />
                   </div>
                   <div className='sm:hidden block'>
                       <MobileCard />
                   </div>

                   {/*Mobile Screens*/}
                   <div className='mobile-bottom-sec'>

                       <div className='mobile-bottom-card'>
                           <div className='flex justify-between w-full'>
                               <p className='primary-text text-[10px]'>NETWORK PULSE</p>
                               <div className='h-2 w-2 rounded-full primary-col animate-pulse'/>
                           </div>
                           <div className='mt-6'>
                               <h1 className='text-white font-bold text-[24px]'>99.9%</h1>
                               <p className='text-white text-[10px]'>Threat Mitigation Accuracy</p>
                           </div>


                           </div>
                           <div className='mobile-bottom-network'>
                               <div className='mobile-network'>
                                   <h1 className='text-white font-bold text-[18px]'>2.4M</h1>
                                   <p className='text-gray-500 text-[10px]'>IDENTITIES SECURE</p>
                               </div>

                               <div className='mobile-network'>
                                   <h1 className='text-white font-bold text-[18px]'>12ms</h1>
                                   <p className='text-gray-500 text-[10px]'>NEURAL LATENCY</p>
                               </div>
                       </div>
                   </div>

                   {/*Large Screens*/}
                   <div className='bottom-sec'>
                       <div className='flex flex-col items-center justify-center'>
                           <h1 className='primary-text text-3xl font-bold'>99.9%</h1>
                           <p className='text-gray-300 text-[10px] mt-2'>THREAT NEUTRALIZATION</p>
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
            <div className='sm:h-16 '/>
            <footer className='footer relative z-50'>
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

            <div className='mobile-footer'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='primary-text'>DOGOTRACKER AI</h1>
                    <p className='text-gray-500 text-[10px]'>&copy; 2024 DogoTracker AI. Sentient Security.</p>
                </div>

                <div className='flex flex-col items-center justify-center text-gray-500 font-bold gap-2 mt-2 text-[10px]'>
                    <div className='flex flex-row gap-4'>
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                    </div>
                </div>

                <div className='primary-col w-10 h-10 rounded-full absolute bottom-5 right-5 blur-xl'/>
                <div className='primary-col rounded-md absolute bottom-5 right-5'>
                    <ShieldCheck className='w-12 h-12'/>
                </div>
            </div>
        </div>
    )
}
// @ts-ignore
export default Page
