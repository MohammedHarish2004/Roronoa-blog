import {Sidebar} from 'flowbite-react'
import {HiArrowSmRight, HiLink, HiTrash, HiUser} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Swal from 'sweetalert2'
import { deleteUserFailure, deleteUserStart, signOutFailure, signOutStart, signOutSuccess } from '../redux/userSlice'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function DashSidebar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentUser} = useSelector(state=>state.user)
    const [tab,setTab] = useState('')
    const[error,setError] = useState(null)
    
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
    
    const handleDelete = ()=>{
        Swal.fire({
            title:'Are you sure',
            text:'You won\t be able to revert this', 
            icon:'warning',
            showCancelButton:true,
            cancelButtonColor:'#3085d6',
            confirmButtonColor:'#d33',
            confirmButtonText:'Yes! Delete'
        }).then(async(result)=>{
            if(result.isConfirmed){
                
               try {
                
                dispatch(deleteUserStart())

                const res = await fetch(`/api/user/delete/${currentUser._id}`,{
                    method:"DELETE"
                })
                const data = await res.json()

                if(data.success === false){
                    dispatch(deleteUserFailure(data.message))
                    iziToast.error({
                        message: `<b>${data.message}</b`,
                        position: 'topRight',
                        timeout:2000
                      });
                      return
                }

                dispatch(deleteUserFailure(data))
                iziToast.success({
                    message: '<b>User deleted successfully!</b>',
                    position: 'topRight',
                    timeout:1500
                  });
                  navigate('/sign-in')


               } catch (error) {
                dispatch(deleteUserFailure(error.message))
                iziToast.error({
                    message: `<b>${error.message}</b`,
                    position: 'topRight',
                    timeout:1500
                  });
               }
            }
        })
    }
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
               <Link to='/dashboard?tab=profile' >
                    <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor={'dark'} as={'div'}>
                        Profile
                    </Sidebar.Item>
               </Link>
               <Sidebar.Collapse icon={HiLink} label="Account">

                    <Sidebar.Item  icon={HiTrash} className='cursor-pointer' onClick={handleDelete}>
                        Delete Account
                    </Sidebar.Item>
                    <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.Collapse>
                    
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
