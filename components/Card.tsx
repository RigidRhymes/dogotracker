import { motion } from "framer-motion"

const Card = () => {
  return (
    <div className="relative h-auto w-full mt-16">
        {/* <Image src='/bg-security.jpg' alt="security-bg" fill className="object-cover absolute inset-0 h-full w-full"/> */}
      <div className="relative z-10 flex items-center justify-center h-full w-full">
      <div className="h-90 w-70 mt-6 bg-white/10 backdrop-blur-3xl flex items-center justify-center rounded-2xl mb-6">
        <motion.div
        initial={{opacity: 1, y: 0}}
        animate={{}}
        className="h-auto w-full bg-green-200 text-white drop-shadow-2xl m-4 rounded-2xl backdrop-brightness-50">
          
        </motion.div>
      </div>
      <div></div>
      </div>
    </div>
  )
}

export default Card