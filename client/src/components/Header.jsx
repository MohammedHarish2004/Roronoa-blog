import React from 'react'
import {Navbar, TextInput,Button, Dropdown, Avatar} from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon,FaSun} from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Swal from 'sweetalert2'
import { signOutFailure, signOutStart, signOutSuccess } from '../redux/userSlice'
import { toggleTheme } from '../redux/themeSlice'

export default function Header() {
    const path = useLocation().pathname
    const {currentUser} = useSelector(state=>state.user)
    const {theme} = useSelector(state=>state.theme)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignOut = ()=>{
        Swal.fire({
            title:'Are you sure',
            icon:'warning',
            showCancelButton:true,
            cancelButtonColor:'#3085d6',
            confirmButtonColor:'#d33',
            confirmButtonText:'Yes! Sign Out'
        }).then(async(result)=>{
            if(result.isConfirmed){
                
               try {
                
                dispatch(signOutStart())

                const res = await fetch('/api/auth/signout')
                const data = await res.json()

                if(data.success === false){
                    dispatch(signOutFailure(data.message))
                }

                dispatch(signOutSuccess(data))
                iziToast.success({
                    message: '<b>Signed Out successfully!</b>',
                    position: 'topRight',
                    timeout:1500
                  });
                  navigate('/sign-in')


               } catch (error) {
                dispatch(signOutFailure(error.message))
               }
            }
        })
    }
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
            <Button className='w-14 p-1 h-10 hidden md:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
                {
                    theme === 'light' ? <FaMoon /> : <FaSun />
                }
            </Button>
           {
                currentUser ? (
                    <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.avatar} rounded/>}>
                        <Dropdown.Header className='flex flex-col'>
                            <span className='block font-medium text-sm'>User : {currentUser.username}</span>
                            <span className='block font-medium text-sm truncate'>Email : {currentUser.email}</span>
                        </Dropdown.Header>
                            <Link to={'/dashboard?tab=profile'}>
                                <Dropdown.Item>
                                    Profile
                                </Dropdown.Item>
                            </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                    </Dropdown>
                )
                :
           <Link to='/sign-in'>
                    <Button gradientDuoTone='purpleToBlue' outline>
                        Sign In
                    </Button>
           </Link>

            }
            <Navbar.Toggle />
        </div>

            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'} className={path === '/' ? 'bg-transparent font-medium ' : ''}>
                    <Link to='/' className={`text-base hover:text-cyan-500  dark:hover:text-purple-500 ${path === '/' ? 'text-purple-600 dark:text-cyan-500' : ''}`}>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'} className={path === '/about' ? 'bg-transparent font-medium' : ''}>
                    <Link to='/about' className={`text-base hover:text-cyan-500  dark:hover:text-purple-500 ${path === '/about' ? 'text-purple-600 dark:text-cyan-500' : ''}`}>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link as={'div'} onClick={()=>dispatch(toggleTheme())}>
                    <Button className=' md:hidden' pill color='gray'>
                        <div className='flex items-center gap-2'>
                            <span>Theme</span>
                            <span>
                            {
                                theme === 'light' ? <FaMoon className=''/> : <FaSun className='xl' />
                                }
                            </span>
                        </div>
                    </Button>
                </Navbar.Link>
            </Navbar.Collapse>

    </Navbar>
  )
}
