'use client'

import { NAV_ITEMS } from "@/lib/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"


const NavItems = () => {
    const pathname = usePathname()

    const isActive = (path:string) => {
        if(path === '/') return pathname === '/'

        return pathname.startsWith(path)
    }
  return (
    <ul className="flex flex-col sm:flex-row p-2 text-gray-300 sm:gap-6 gap-3 font-medium">
        {NAV_ITEMS.map(({href, label}) => (
            <li key={href}>
                <Link href={href} className={`hover:text-blue-200  transition-colors duration-300  ${isActive(href) ? 'text-[#00F2FF]' : ''
                }`}>
                    {label}
                </Link>
            </li>
        ))}
    </ul>
  )
}

export default NavItems