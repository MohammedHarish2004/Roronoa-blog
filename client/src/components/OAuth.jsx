import React from 'react'
import { Alert, Button, Spinner } from 'flowbite-react'
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {FaGoogle,FaCheckCircle} from 'react-icons/fa'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/userSlice.js';



export default function OAuth() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

const handleChange = async ()=>{
    try {
        dispatch(signInStart())

        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account'})
        
        const auth = getAuth(app)
        const result = await signInWithPopup(auth,provider)
        const res = await fetch('/api/auth/google',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:result.user.displayName,
                email:result.user.email,
                avatar:result.user.photoURL
            })
        })


        const data = await res.json()

        dispatch(signInSuccess(data))

        iziToast.success({
            icon: <FaCheckCircle />,
            message: '<b>Signed in successfully!</b>',
            position: 'topRight',
            timeout:1500
          });
        navigate('/')
    } 
    catch (error) {
    console.log('Unable to sign in with google',error);    
    }
}

  return (
    <Button type='button' gradientDuoTone='purpleToBlue' outline onClick={handleChange}>
        <div className='flex gap-1 items-center'>
            <span>Continue with Google </span>
            <span><FaGoogle /></span>
        </div>
    </Button> 
  )
}
