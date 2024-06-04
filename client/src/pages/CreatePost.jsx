import { Alert, Button, FileInput, Select, Spinner, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
export default function CreatePost() {

  const fileRef = useRef()
  const[file,setFile] = useState(undefined)
  const[loading,setLoading] = useState(false)
  const[progress,setProgress] = useState(0)
  const[error,setError] = useState(false)
  const [formData,setFormData] = useState({})

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
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create Post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1'/>
          <Select className='flex-1'>
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
        <ReactQuill theme='snow' className='h-72 mb-12 '/>
        <Button type='submit' gradientDuoTone='purpleToBlue' className='uppercase mb-8'>Publish</Button>
      </form>
    </div>
  )
}
