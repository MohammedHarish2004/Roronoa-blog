import { Alert, Button, Spinner, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/userSlice';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {Link} from 'react-router-dom'

export default function DashProfile() {
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state=>state.user)
  const fileRef = useRef()
  const [file,setFile] = useState(undefined)
  const[imageError,setImageError] = useState(false)
  const[filePerc,setFilePerc] = useState(0)
  const[formData,setFormData] = useState({})
  const[loading,setLoading] = useState(false)
  const[error,setError] = useState(false)

  useEffect(()=>{
    if(file){
      handleImageUpload(file)
    }
  },[file])

  const handleImageUpload = (file)=>{

        setLoading(true)
        setImageError(null)
        const storage = getStorage(app)
        const newFile = new Date().getTime() + file.name
        const storageRef = ref(storage,newFile)
        const uploadTask = uploadBytesResumable(storageRef,file)
        

        uploadTask.on('state_changed',
          (snapshot)=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setFilePerc(Math.round(progress));
            console.log(Math.round(progress));
          },
          (error)=>{
            setImageError('Error while uploading (Image must be less than 2mb)')
            setFilePerc(null)
            setLoading(false)
          },
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
             setFormData({
              ...formData,
              avatar:downloadURL
             })
             setLoading(false)
            })
          }
        )
  }

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try {
      
      setLoading(true)
      setError(null)
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })

      const data = await res.json()
      if(data.success === false){
        dispatch(updateUserFailure(data.message))
        setError(data.message)
        setLoading(false)
        return
      }

      setLoading(false)
      setError(null)
      dispatch(updateUserSuccess(data))
      iziToast.success({
        message: '<b>User updated successfully!</b>',
        position: 'topRight',
        timeout:1500
  
      });
    } 
    catch (error) {
      dispatch(updateUserFailure(error.message))
      setLoading(false)
      setError(error.message)
    }
  }
    return (
    <div className='w-full max-w-lg mx-auto p-3'>
        <h1 className='text-3xl text-center font-semibold py-7'>Profile</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input type="file" accept='image/*' ref={fileRef} hidden onChange={(e)=>setFile(e.target.files[0])}/>
            <div onClick={()=>fileRef.current.click()} className='w-28 h-28 relative self-center shadow-md overflow-hidden rounded-full'>
               
                <img  src={formData.avatar || currentUser.avatar} alt="profile" className={`w-full h-full border-4 border-cyan-500 rounded-full object-cover cursor-pointer ${filePerc && filePerc < 100 && 'opacity-60'} hover:opacity-80`}/>
                {filePerc && (
                  <CircularProgressbar value={filePerc || 0} strokeWidth={5} styles={{
                    root:{
                      width:'100%',
                      height:'100%',
                      position:'absolute',
                      top:0,
                      left:0,
                      color:'green'
                    },
                    path:{
                      stroke:`rgba(0, 235, 0,${filePerc / 100})`
                    }
                  }}
                  ></CircularProgressbar>
                )}
            </div>
            <p className='text-blue-600 text-center'>{filePerc === 100 ? 'Uploaded successfully! Click update' : ""}</p>

            {imageError && 
            <Alert color='failure' className='font-medium'>
              {imageError}
            </Alert>
            }
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}/>
            <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange}/>
            <TextInput type='password' id='password' placeholder='password' autoComplete='false' onChange={handleChange}/>
            <Button type='submit' gradientDuoTone='purpleToBlue' className='uppercase disabled:opacity-90' disabled={loading} >
              {loading ?  <>
                  <Spinner size='sm' color='gray'/>
                  <span className='pl-3'>Loading...</span>
                </> : 'Update'}
            </Button>
            {
              currentUser.isAdmin &&
             <Link to={'/create-post'}>
                <Button type="button" className="uppercase w-full" gradientDuoTone='purpleToBlue' outline>Create a Post</Button>
             </Link>
            }
            {error &&  
            <Alert color='failure' className='font-medium'>
              {error}
            </Alert>}
        </form>
    </div>
  )
}
