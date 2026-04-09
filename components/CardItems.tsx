
import {HERO_CARD_ITEMS} from "@/lib/constants";
import {ArrowRight} from "lucide-react"


const CardItems = () => {
    return (
        <div className='hero-card'>
            {HERO_CARD_ITEMS.map((item, idx) => {
                const Icon = item.icon
                return (
                    <div key={idx}
                         className=' rounded-lg p-6 flex flex-col items-start justify-center'
                    >
                        <Icon className='w-8 h-8 text-[#00f2ff] p-2 mb-4 bg-gray-600 rounded-md' />

                        <h3 className='card-title'>
                            {item.title}
                        </h3>

                        <p className='text-gray-400 text-lg mb-4'>{item.desc}</p>

                        <button className='text-[#00f2ff] cursor-pointer text-sm flex items-row gap-2'>
                            {item.sub} <ArrowRight className='h-4 w-4 transition-transform duration-300 ease-linear hover:translate-x-1'/>
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
export default CardItems
