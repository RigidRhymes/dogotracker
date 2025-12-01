'use client'
import Image from 'next/image'
import { Raleway, Orbitron } from 'next/font/google'
import Button from '@/components/Button'
import CardLong from '@/components/Lon-Card'


const raleway = Raleway({
    subsets: ['latin'],
    weight: ['100','400', '700']
})

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['400', '700']
})
const page = () => {
  return (
    <div className='w-full h-auto relative overflow-hidden '>
        <div className='relative w-full md:h-100 h-50 bg-linear-to-r from-black  to-blue-950'>
            <Image src='/bg-image.jpg' alt='backgroundImage' fill className='opacity-40 z-1 space-y-reverse'/>
        </div>
        <div className='absolute md:right-2 md:top-0 z-10 md:w-[320px] md:h-[400px] p-4 '>
            <Image src='/AIn.png' alt='ai' fill className='object-cover opacity-80 hidden md:flex'/>
            
        </div>
        <div className='md:hidden flex w-[180px] h-[220px] absolute top-0 left-10 z-50'>
                    <Image src='/ai-mobile.png' alt='ai-mobile' fill className='object-contain'/>
                
            </div>
        <div className='z-10 absolute md:top-30 md:left-40 top-18 right-8 md:h-full md:w-full '>
            <p className={`text-blue-200 font-semibold text-[10px] tracking-widest ${orbitron.className} mb-2`}>Proactive AI Security Platform</p>
            <div className={`${raleway.className} font-mono md:text-4xl md:gap-1.5 gap-2 text-white flex md:flex-col flex-row `}>
                <span>Proactive,</span>
                <span>Intelligent,</span>
                <span>Dynamic,</span>
            </div>
            <div className={`text-white  pt-2 ${raleway.className} md:text-[12px] text-[10px] mb-4 hidden md:flex`}>
                Mitigate every risk and shut down threats across every attack
                <br/>surface with Self-Learning AI that adapts to your business.
            </div>
        <div className='md:flex md:flex-row absolute flex-col gap-2 '>
                <Button label='Explore the platform' variant='primary' onClick={() => alert('Submitted')}/> 
                <Button variant='secondary' label='Get a demo' onClick={() => alert('You press my yansh')}  className='hidden md:flex'/>
             </div>
        </div>
        <div className={`${raleway.className} md:font-bold tracking-tight font-semibold text-center mt-7 text-[35px] md:text-[40px] w-full h-50 px-4 flex justify-center`}>
            <div>Take Control of Your Digital Footprint <br/>
                <span className='font-thin text-[30px] md:text-[40px]'>Scan your email, track your online presence, <br/> and delete your data—on your terms</span>
            </div>
        </div>
    </div>
  )
}

export default page