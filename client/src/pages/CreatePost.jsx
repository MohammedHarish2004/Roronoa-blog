import { Alert, Button, FileInput, Select, Spinner, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function CreatePost() {

  const {currentUser} = useSelector(state=>state.user)
  const fileRef = useRef()
  const[file,setFile] = useState(undefined)
  const[loading,setLoading] = useState(false)
  const[progress,setProgress] = useState(0)
  const[error,setError] = useState(false)
  const [formData,setFormData] = useState({})
  const[publishError,setPublishError] = useState(null)
  const navigate = useNavigate()

  console.log(formData);
  useEffect(()=>{
    if(file){
      handleImageUpload(file)
    }
  },[file])

  const handleImageUpload = (file)=>{

    try {

      setLoading(true)
      setError(null)
      const storage = getStorage(app)
      const newFile = new Date().getTime() + file.name
      const storageRef = ref(storage,newFile)
      const uploadTask = uploadBytesResumable(storageRef,file)
  
      uploadTask.on('state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(Math.round(progress))
      },
      (error)=>{
        setError('Error while uploading (Image must be less than 2mb)')
        setLoading(null)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setFormData({
            ...formData,
            image:downloadURL
          })
          setLoading(false)
          setError(null)
          setProgress(null)
        })
      }
      )
    } 
    
    catch (error) {
    setError(error)  
    setProgress(null)
    setLoading(false)
    }
    
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(!file) return setPublishError('Must upload image')

    try {
      
      setPublishError(null)

      const res = await fetch('/api/post/create',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData,{userId:currentUser._id})
      })

      const data = await res.json()

      if(data.success === false){
        setPublishError(data.message)
        return
      }
      setPublishError(null)
      iziToast.success({
        message: '<b>Post created successfully!</b>',
        position: 'topRight',
        timeout:1500
      });
      navigate(`/post/${data.slug}`,{replace:true})
    }  
    catch (error) {
      setPublishError('Something went wrong')
    }
  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required className='flex-1' onChange={(e)=>setFormData({...formData,title:e.target.value})}/>
          <Select className='flex-1' onChange={(e)=>setFormData({...formData,category:e.target.value})}>
            <option value="unCategorized">Select a Category</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="thriller">Thriller</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*' ref={fileRef} className='flex-1' onChange={(e)=>setFile(e.target.files[0])}/>
          <Button disabled={loading} onClick={()=>fileRef.current.click()} className='uppercase ' gradientDuoTone='purpleToBlue' size='sm' outline>
            {loading ?
            <div className='flex items-center'>
              <Spinner size='sm' color='gray'/>
              <span className='mt-1 ms-2'>Uploading...</span> 
            </div>
            :
            error ? 
                <span>Error Uploading</span>
              : 
            <span>Choose</span>
             }
          </Button>
        </div>
        {
          formData.image &&
          <img src={formData.image} alt="post image" className='w-full h-72 object-cover' />
        }
        {
          error &&
          <Alert color='failure'>
            {error}
          </Alert>
        }
        {
          publishError &&
          <Alert color='failure'>
            {publishError}
          </Alert>
        }
        <ReactQuill theme='snow' className='h-72 mb-12' id='content' onChange={(value)=>setFormData({...formData,content:value})}/>
        <Button type='submit' gradientDuoTone='purpleToBlue' className='uppercase mb-8'>Publish</Button>
      </form>
    </div>
  )
}
