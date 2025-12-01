'use client'

import { NAV_ITEMS } from "@/lib/constants"
import { Orbitron } from "next/font/google"
import Link from "next/link"
import { usePathname } from "next/navigation"



const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['400', '700']
})
const NavItems = () => {
    const pathname = usePathname()

    const isActive = (path:string) => {
        if(path === '/') return pathname === '/'

        return pathname.startsWith(path)
    }
  return (
    <ul className="flex flex-col sm:flex-row p-2 sm:gap-6 gap-3 font-medium">
        {NAV_ITEMS.map(({href, label}) => (
            <li key={href}>
                <Link href={href} className={`hover:text-blue-200 f transition-colors ${
                    isActive(href) ? 'text-gray-100' : ''
                }`}>
                    {label}
                </Link>
            </li>
        ))}
    </ul>
  )
}

export default NavItems