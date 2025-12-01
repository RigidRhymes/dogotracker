import Image from "next/image"

const CardLong = () => {
  return (
    <div className="flex items-center justify-center relative w-full h-full mb-6 mt-6 bg-gray-400">
        <Image src='/bg-image.jpg' alt="bg-image" fill className="object-fit " />
        <div className="w-[95%] h-20 bg-white rounded-lg">
            
        </div>
    </div>
  )
}

export default CardLong