'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='h-screen w-full bg-linear-to-b from-white to-gray-400'>
        <div className='flex items-center justify-center h-full'>
          <Link href='/welcome' className='bg-black text-white hover:text-black flex outline w-36 h-10 justify-center items-center gap-1 rounded-lg hover:bg-gray-200 font-semibold hover:scale-105'>
            Click Me<motion.div 
            initial={{x: 0}}
            whileHover={{x:14}}
            className='w-6 h-6 bg-black text-white rounded-full flex items-center justify-center'
            >➡</motion.div>
          </Link>
        </div>
    </div>
  )
}

export default Hero