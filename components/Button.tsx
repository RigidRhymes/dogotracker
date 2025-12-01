import { Orbitron, Raleway } from "next/font/google";

interface ButtonProps{
    label: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    className?: string;
}

const orbitron = Orbitron({
    subsets:['latin'],
    weight: ['400', '700']
})
const raleway = Raleway({
    subsets: ['latin'],
    weight: ['100','400', '700']
})
const Button = ({label, onClick,  type, className='', variant='primary', disabled=false  }:ButtonProps) => {
   const baseStyle = 'px-4 py-2 rounded font-semibold transition duration-200 md:flex flex items-center justify-center md:mt-6  mt-3'
   const variants ={
    primary: 'bg-linear-to-r from-orange-400 to-orange-700 z-50 hover:transform hover:transition',
    secondary: 'bg-transparent border-1 border-white',
    danger: 'bg-red-600 text-white hover:bg-red-700'
   }
  return (
    <button 
    type={type}
    onClick={onClick}
   className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className} cursor-pointer hover:bg-blue-900 hover:text-white`}
    >
        <p className={`text-white shadow-2xl shadow-black ${orbitron.className} text-xs`}>{label}</p>
    </button>
  )
}

export default Button