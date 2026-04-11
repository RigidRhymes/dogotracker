import Image from 'next/image'
import Link from 'next/link'
import NavItems from './NavItems'
import UserDropdown from './UserDropdown'



const Header = ({user} : {user: User}) => {
  return (
    <header className='sticky top-0 header z-50 mt-2 '>
        <div className=' header-wrapper gap-2'>
            <Link href='/' className='md:w-[140px] w-[100px] flex gap-1 items-center justify-center'>
            <Image src='/DogoTracker.svg' alt='logo' width={140} height={32} className='h-8 w-auto cursor-pointer' />
                <p className='text-white'>DogoTracker</p>
            </Link>
            <nav className='hidden sm:block'>
                <NavItems/>
            </nav>
        <UserDropdown user={user}/>
        </div>
    </header>
  )
}

export default Header