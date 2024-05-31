import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {FaCheckCircle} from 'react-icons/fa'
import OAuth from '../components/OAuth';

export default function SignUp() {

  const [formData,setFormData] = useState({})
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value.trim()
    })
  }



  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(!formData.username || !formData.email || !formData.password) return setError('Please fill out all fields')
    try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/auth/signup',{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        })

        const data = await res.json()

        if(data.success === false){
          setError(data.message)
          setLoading(false)
          return
        }
        iziToast.success({
          icon: <FaCheckCircle/>,
          message: '<b>Signed up successfully!</b>',
          position: 'topRight',
          timeout:1500
    
        });

          setLoading(false)
          setError(null)
          navigate('/sign-in')        
    } 
    catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen mt-10 sm:mt-24'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
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
          <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
              <div>
                  <Label value='Your username'/>
                  <TextInput 
                    type='text'
                    placeholder='Username'
                    id='username'
                    onChange={handleChange}
                  />
              </div>
              <div>
                  <Label value='Your email'/>
                  <TextInput 
                    type='email'
                    placeholder='Email'
                    id='email'
                    onChange={handleChange}

                  />
              </div>
              <div>
                  <Label value='Your Password'/>
                  <TextInput 
                    type='password'
                    placeholder='*********'
                    id='password'
                    autoComplete='false'
                    onChange={handleChange}

                  />
              </div>

              <Button 
                type='submit' 
                gradientDuoTone="purpleToBlue" 
                className='uppercase' 
                disabled={loading}>
               {
               loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
                ) 
               : ('Sign Up')
              }
              </Button>
              <OAuth />
          </form>
          <div className='mt-4 flex gap-4'>
            <span className='font-medium'>Have an account?</span>
            <Link to='/sign-in' className='text-blue-700 font-medium'>
              Sign In
            </Link>
          </div>
          <div className='mt-3' style={{ minHeight: '60px' }}>
            {error && 
              <Alert className='text-red-600 font-medium' color='red'>
                {error}
              </Alert>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
