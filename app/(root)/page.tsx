import { Orbitron, Space_Grotesk } from "next/font/google";
import Image from "next/image";


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
            <div className='grid grid-cols-2 mt-12 items-center justify-center'>

                {/*hero text-grid*/}
                <div className='flex justify-start flex-col'>
                    <h1 className={`hero-text ${spaceGrotesk.className}`}>DogoTracker</h1>
                    <p className='text-gray-300 text-sm mt-6 text-wrap'>Mitigate every risk and shut down threats across every attack surface with Self-Learning AI that adapts to your business. Proactive, Intelligent, Dynamic.</p>
                </div>

                {/*image grid*/}
                <div className='w-full flex justify-end'>
                   <div className='rounded-full blur-3xl -inset-4 bg-[#00f2ff]/5 '>
                       <div className='hero-image border border-[#00f2ff]/20 shadow-[0_0_50px_rgba(0,242,255,0.1)]'>
                           <Image src='/dogo-ai.png' alt='hero-ai image' width={350} height={400} className='object-fill rounded-xl' />
                       </div>
                   </div>
                </div>
            </div>
        </div>
    )
}
export default Page
