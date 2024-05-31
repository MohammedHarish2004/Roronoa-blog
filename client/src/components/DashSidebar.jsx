import {Sidebar} from 'flowbite-react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Swal from 'sweetalert2'
import { signOutFailure, signOutStart, signOutSuccess } from '../redux/userSlice'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function DashSidebar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [tab,setTab] = useState('')

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        setTab(tabFromUrl)
    },[location.search])

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
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
               <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor={'dark'}>
                        Profile
                    </Sidebar.Item>
               </Link>
                    <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                        Sign Out
                    </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
