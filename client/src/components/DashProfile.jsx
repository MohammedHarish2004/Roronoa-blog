import { Alert, Button, Spinner, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const {currentUser} = useSelector(state=>state.user)
  const fileRef = useRef()
  const [file,setFile] = useState(undefined)
  const[imageError,setImageError] = useState(false)
  const[filePerc,setFilePerc] = useState(0)
  const[formData,setFormData] = useState({})
  const[loading,setLoading] = useState(false)
  console.log(formData);

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
    return (
    <div className='p-3'>
        <h1 className='text-3xl text-center font-semibold py-7'>Profile</h1>
        <form className='flex flex-col gap-4'>
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
            <Alert color='failure'>
              {imageError}
            </Alert>
            }
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
            <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
            <TextInput type='password' id='password' placeholder='password' autoComplete='false'/>
            <Button type='submit' gradientDuoTone='purpleToBlue' className='uppercase' disabled={loading}>
              {loading ?  <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </> : 'Update'}
            </Button>
        </form>
    </div>
  )
}
