import React from 'react'
import {Navbar, TextInput,Button} from 'flowbite-react'
import { Link } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

export default function Header() {
    const path = useLocation().pathname

  return (
    <Navbar className='border-b-2'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-br from-purple-600 to-cyan-500 hover:bg-gradient-to-bl "  rounded-lg text-white'>Roronoa's</span>
            Blog
        </Link>

        <form>
            <TextInput type="text" placeholder='Search...' className='hidden lg:inline' rightIcon={AiOutlineSearch}/>
        </form> 
        <Button className='w-12 h-10 lg:hidden flex items-center' color='gray' pill>
            <AiOutlineSearch />
        </Button>

        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden md:inline' color='gray' pill>
                <FaMoon />
            </Button>
            <Link to='/sign-in'>
                <Button gradientDuoTone='purpleToBlue'>
                    Sign In
                </Button>
            </Link>
            <Navbar.Toggle />

        </div>

            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'} className={path === '/' ? 'bg-transparent font-medium ' : ''}>
                    <Link to='/' className={`text-base hover:text-cyan-500  ${path === '/' ? 'text-purple-600' : ''}`}>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'} className={path === '/about' ? 'bg-transparent font-medium' : ''}>
                    <Link to='/about' className={`text-base hover:text-cyan-500 ${path === '/about' ? 'text-purple-600' : ''}`}>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link as={'div'}>
                    <span className='flex items-center gap-2 md:hidden'>
                        Dark Mode <FaMoon />
                    </span>
                </Navbar.Link>
            </Navbar.Collapse>

    </Navbar>
  )
}
