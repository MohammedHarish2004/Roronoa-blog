import React from 'react'
import {Navbar, TextInput,Button, Dropdown, Avatar} from 'flowbite-react'
import { Link } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const path = useLocation().pathname
    const {currentUser} = useSelector(state=>state.user)
  return (
    <Navbar className='border-b-2'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-4 py-1 bg-gradient-to-br from-purple-600 to-cyan-500 hover:bg-gradient-to-bl "  rounded-lg text-white'>Zoro's</span>
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
                <FaMoon className=''/>
            </Button>
            {
                currentUser ? (
                    <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.avatar} rounded/>}>
                        <Dropdown.Header className='flex flex-col'>
                            <span className='block font-medium text-sm'>User : {currentUser.username}</span>
                            <span className='block font-medium text-sm truncate'>Email : {currentUser.email}</span>
                        </Dropdown.Header>
                            <Link to='/dashboard?tab=profile'>
                                <Dropdown.Item>
                                    Profile
                                </Dropdown.Item>
                            </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign Out</Dropdown.Item>
                    </Dropdown>
                )
                :
                    <Button gradientDuoTone='purpleToBlue' outline>
                        Sign In
                    </Button>
            }

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
