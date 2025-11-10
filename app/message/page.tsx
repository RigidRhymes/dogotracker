'use client'

import { animate, motion, useAnimationControls } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { RocknRoll_One, Roboto, Sawarabi_Mincho } from "next/font/google"
import confetti from "canvas-confetti"
import Image from "next/image"







const rocknroll = RocknRoll_One({subsets: ['latin'], weight: ['400']})
const roboto = Roboto({subsets: ['latin'], weight: ['400', '700']})
const sawarabi = Sawarabi_Mincho({subsets: ['latin'], weight: ['400']})
const Page = () => {
    
     const getTimeBasedGreeting = () => {
      const hour = new Date().getHours()
      if(hour >= 5 && hour < 12) {
        return {
          greeting: 'Morning',
          msg: 'Wishing you a day full of sunny smiles and happy thoughts!',
          em: '☀️'
        }
      } else if (hour >= 12 && hour < 17 ){
        return {
          greeting: 'Afternoon',
          msg: 'Hoope your afternoon is as bright and cheerful as you are!',
          em: '🌤️'
        }
      } else if (hour >= 17 && hour < 21){
        return {
          greeting: 'Evening',
          msg: 'Wiishing you a relaxing evening filled with peace and joy!',
          em: '🌆'
        }
      } else {
        return {
          greeting: 'Night',
          msg: 'Maay your dreams be sweet and your rest be peaceful!',
          em: '🌙'
        }
      }
    }

    const defaultGreeting = {
      greeting: 'Morning',
      msg: 'Wishing you a day full of sunny smiles and happy thoughts!',
      em: '☀️'
    }

    const [greetingData, setGreetingData] = useState(defaultGreeting)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      // This setState is OK in this case as it's a one-time initialization
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true)
      if (typeof window !== 'undefined') {
        setGreetingData(getTimeBasedGreeting())
      }
    }, [])
    const iconRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (typeof window !== 'undefined') {
        // Run confetti
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: {y: 0.6},
          })
        }, 0)

        // Handle animation
        if (iconRef.current) {
          animate(
            iconRef.current,
            { rotate: [0, 360] },
            { duration: 4, repeat: Infinity, ease: 'linear' }
          )
        }
      }
    }, [])
    

    const controls = useAnimationControls();
    useEffect(() => {
    async function sequence() {
        await controls.start({
            rotate: 180, 
            transition:{type: 'spring', stiffness: 260, damping: 20}
        });

        controls.start({
            rotate: -180,
            transition:{
                repeat: Infinity,
                ease: 'linear',
                duration: 20
            },
        });
    }

    sequence();
    }, [controls])

    const searchParams = useSearchParams()
    const name = searchParams.get("name")

  const Typewriter = ({text, speed = 100}: {text: string, speed?: number}) => {
    const [displayedText, setDisplayedText] = useState('')
    useEffect(() => {
     let index = 0;
     const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if(index === text.length) clearInterval(interval)
     }, speed)
    return () => clearInterval(interval)
    }, [text, speed])
  return (
    <div>
        {displayedText}
    </div>
  )
}
    


  return (
    <div className="flex flex-col h-screen w-full  bg-[#E2FFD3] relative overflow-x-hidden">
        <motion.div
        initial={{opacity: 0, x:3}}
        animate={{opacity: 2, y:0}}
        transition={{duration: 2, delay:0.1}}
        className={`px-8 mt-24 ${rocknroll.className} text-[40px] font-bold`}>Hello!</motion.div>
        <motion.div 
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0 }}
        transition={{duration: 1, delay: 0.2}}
        className={`${roboto.className} relative px-8 text-[86px] font-bold text-[#2DDE15] drop-shadow-emerald-950`}>{name}</motion.div>
        <motion.div className="absolute right-10 top-10 text-4xl">{greetingData.em}</motion.div>
        <motion.div
        className="absolute top-35 right-10"
        animate={controls}
        ref={iconRef}
        >
        <Image src='/greenFlower.png' width={100} height={100} alt="celebration" className=""/>
        </motion.div>
        <motion.div 
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0 }}
        transition={{duration: 1, delay: 0.2}}
        className={`px-8 ${roboto.className}  text-[96px] font-semibold leading-12 `}>good <span className={`${sawarabi.className} text-[#D09D9D] drop-shadow-lg drop-shadow-amber-900 text-[80px]`}>{greetingData.greeting}</span></motion.div>
        <div className="mt-8 flex items-center justify-center w-full">
            <hr className="w-10/12"/>
        </div>
        <div className="text-center px-4 py-2 text-xl">
          <Typewriter text={greetingData.msg} speed={80}/>
          </div>

        <div className="bg-black absolute bottom-0 w-full ">
            <p className="text-white text-center md:text-2xl text-sm">This message was created specially for you {name} by Nuel</p>
        </div>
    </div>
  )
}

export default Page
