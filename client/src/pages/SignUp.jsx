import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-4 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* leftside */}
        <div className="flex-1">
          <Link to='/' className='text-3xl font-bold dark:text-white'>
              <span className='px-4 py-1 bg-gradient-to-br from-purple-600 to-cyan-500 hover:bg-gradient-to-bl "  rounded-lg text-white'>Zoro's</span>
              Blog
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign up with your username and password or with Google. 
          </p>
        </div>
        {/* rightside  */}
        <div className="flex-1">
          <form className='flex flex-col gap-4 '>
              <div>
                  <Label value='Your username'/>
                  <TextInput 
                    type='text'
                    placeholder='Username'
                    id='username'
                  />
              </div>
              <div>
                  <Label value='Your email'/>
                  <TextInput 
                    type='email'
                    placeholder='Email'
                    id='email'
                  />
              </div>
              <div>
                  <Label value='Your Password'/>
                  <TextInput 
                    type='password'
                    placeholder='*********'
                    id='password'
                    autoComplete='false'
                  />
              </div>

              <Button type='submit' gradientDuoTone="purpleToBlue" className='uppercase'>Sign Up</Button>
          </form>
          <div className='mt-4 flex gap-4'>
            <span className='font-medium'>Have an account?</span>
            <Link to='/sign-in' className='text-blue-700 font-medium'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
