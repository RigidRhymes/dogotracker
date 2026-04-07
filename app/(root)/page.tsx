import { Orbitron, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import {FaFontAwesome} from "react-icons/fa6";


const orbitron = Orbitron({
    subsets:['latin'],
    weight: ["500", "400", "700"]
})

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ["500", "400", "700"],
})



const Page = () => {
    return (
        <div className='px-6'>
            <div className='hero-grid'>

                {/*hero text-grid*/}
                <div className='flex justify-start flex-col px-6 mt-12'>
                    <h1 className={`hero-text ${spaceGrotesk.className}`}>DogoTracker</h1>
                    <p className='text-gray-300 text-sm mt-6 text-wrap'>Mitigate every risk and shut down threats across every attack surface with Self-Learning AI that adapts to your business. Proactive, Intelligent, Dynamic.</p>
                    <div className='mt-6 relative flex items-center justify-center'>
                        <div className='bg-[#00f2ff]/30 h-16 absolute w-120 blur-xl  rounded-md'></div>
                        <div className='text-gray-300 text-sm w-110 p-1 z-50 flex flex-row items-center justify-between bg-black '>
                            <FaFontAwesome name='shield'/> <input type='text' placeholder='Enter email, handley or pone number... ' className='p-2 w-82'/>
                            <button className='primary-col p-2 w-28 font-bold text-black items-center jutify-center'>
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
                        <Image src='/dogo-ai.png' alt='hero-ai image' width={200} height={250} className='w-full h-full object-cover z-50' />
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Page
