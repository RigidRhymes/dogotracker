import { TESTIMONIALS } from "@/lib/constants"
import { once } from "events"
import { motion, useAnimation, useInView } from "framer-motion"
import { Repeat } from "lucide-react"
import { useEffect, useRef } from "react"


  

const Testimonial = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, {amount: once})

  useEffect(() => {
    if(inView){
      controls.start('visible')
    }
  }, [controls, inView])

  const typingVairants = {
    hidden: {width: 0},
    visible: {
      width: '430px',
      transition: {
        duration: 4,
        ease: 'linear',
        repeatType: 'loop',
        times: [0, 0.5, 1],
        Repeat: inView
      }
    }
  }
  return (
    <div className="h-auto w-full relative flex justify-center">
      <div className="h-120 bg-linear-to-b from-gray-100 to-gray-300 px-4 flex flex-col justify-center  items-center pt-4 font-semibold md:text-5xl text-xl">
        <motion.p
        ref={ref}
        initial='hidden'
        animate={controls}
        variants={typingVairants}
        className=" blink overflow-hidden whitespace-nowrap border-r-2 border-black text-5xl font-mono"
        >What People Say</motion.p>
        <hr className="border-gray-300 mt-4 w-full"/>
       <div className="flex  gap-4 font-normal text-center pt-8">
         {TESTIMONIALS.map((item, index) => (
            <div key={index}
            className={`md:text-lg text-gray-600 flex line-clamp-2 flex-col items-center min-h-32 grid-cols-3 text-sm ${index > 1 ? 'hidden md:block' : ''}`}
            >
                {item.desc}
                <div className="w-12 h-12 bg-black mt-2 rounded-full justify-center ">

                </div>
                <div className="font-bold text-black text-[14px] italic mt-6 text-center">
                    {item.name}
                </div>
            </div>
            
        ))}
       </div>
      </div>
    </div>
  )
}

export default Testimonial
