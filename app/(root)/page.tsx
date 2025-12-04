'use client'
import Image from 'next/image'
import { Raleway, Orbitron } from 'next/font/google'
import { motion } from 'framer-motion'
import Button from '@/components/Button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { CARD_ITEMS } from '@/lib/constants'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useEffect, useRef, useState } from 'react'
import Testimonial from '@/components/Testimonial'


const raleway = Raleway({
    subsets: ['latin'],
    weight: ['100','400', '700']
})

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['400', '700']
})
const Page = () => {
    const containerRef = useRef<HTMLDivElement>(null)
   

    
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
        <div className={`${raleway.className} mb-3 md:font-bold tracking-tight font-semibold text-center mt-7 text-[35px] md:text-[40px] w-full h-50 px-4 flex justify-center`}>
            <div>Take Control of Your Digital Footprint <br/>
                <span className='font-thin text-[30px] md:text-[40px] text-base leading-tight'>Scan your email, track your online presence, <br/> and delete your data—on your terms</span>
            </div>
        </div>
    
           <div className='w-full h-100 flex items-center justify-center p-12 bg-blue-300/50'>
             <Carousel className='w-full  z-20  bg-white/20 rounded-xl mx-auto backdrop-blur-3xl '>
                <CarouselContent ref={containerRef} className='flex'>
                    {CARD_ITEMS.map((item, index) => (
                        <CarouselItem key={index} className='w-full max-w-lg basis-1/2 p-2'>
                            <motion.div 
                            initial={{scale: 0.9, opacity:0}}
                            whileInView={{scale: 1, opacity: 1}}
                            transition={{duration: 0.6, ease: 'easeOut'}}
                            
                              className=' flex items-center justify-center'
                                >
                                <Card className='h-full'>
                                    <CardHeader className='relative w-full'>
                                       <motion.div className='flex items-center w-16 md:w-32 h-10 justify-center absolute -top-5 right-0 md:-top-5 md:left-50 bg-white rounded-full '
                                      whileHover={{
                                        scale: [1, 1.2, 0.95, 1.05, 1],
                                        transition: {
                                            duration: 0.6,
                                            ease: 'easeInOut',
                                            times: [0, 0.2, 0.4, 0.6, 1]
                                        }
                                      }}
                                       >
                                         <Image src={item.image || '/placeholder.png'} alt={item.title}
                                        width={100} height={150} className='rounded-full object-fill'/>
                                       </motion.div>
                                    </CardHeader>
                                     <CardContent className='flex flex-col justify-center h-full p-6 text-content'>
                                        <h3 className='text-lg font-semibold mb-2 text-center'>{item.title}</h3>
                                        <p className='text-sm text-gray-600 text-center'>{item.desc}</p>
                                        </CardContent>
                                </Card>
                            </motion.div>


                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
           </div>
        <Testimonial />
    </div>
  )
}

export default Page