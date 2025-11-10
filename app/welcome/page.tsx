'use client'

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"



const Page = () => {
const [name, setName] = useState("")

const router = useRouter()


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(name.trim()){
      router.push(`/message?name=${encodeURIComponent(name)}`)
    }
}
  return (
    <div className="w--full h-screen flex justify-center relative flex-col items-center gap-3 bg-[#B5B1B1]">
      <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
        <motion.h1
        initial={{opacity: 0, y: -50}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="text-xl font-bold mb-6"
        >Please Enter Your Name</motion.h1>
        <motion.input
        initial={{opacity: 0, y: 50}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: 0.2}}
        placeholder="Name"
        className="w-[300px] h-[46px] outline rounded-lg px-3 text-lg bg-[#D9D9D9]"
        id="input"
        name="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        >
            
        </motion.input>
        <motion.button 
          initial={{opacity: 0, x:-50}}
          animate={{opacity: 1, x:0}}
          transition={{duration: 0.5, delay: 0.4}}
          whileHover={{}}
        className="flex items-center mt-2 w-[40%] justify-center h-8 bg-gradient-to-b from-[#DB4242] to-[#580808] rounded-xl text-white cursor-pointer" type="submit">Play</motion.button>
        </form>
    </div>
  )
}

export default Page