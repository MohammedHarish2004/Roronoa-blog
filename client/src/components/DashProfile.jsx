import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'

export default function DashProfile() {
  const {currentUser} = useSelector(state=>state.user)

    return (
    <div className='p-3'>
        <h1 className='text-3xl text-center font-semibold py-7'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <div className='w-28 h-28 self-center shadow-md overflow-hidden rounded-full'>
                <img src={currentUser.avatar} alt="profile" className='w-full h-full border-4 border-cyan-500 rounded-full object-cover cursor-pointer'/>
            </div>
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
            <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
            <TextInput type='password' id='password' placeholder='password' autoComplete='false'/>
            <Button type='submit' gradientDuoTone='purpleToBlue' className='uppercase'>Update</Button>
        </form>
    </div>
  )
}
