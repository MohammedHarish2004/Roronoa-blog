import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
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
          <FileInput type='file' accept='image/*' className='flex-1'/>
          <Button type='button' className='uppercase' gradientDuoTone='purpleToBlue' size='sm' outline>Upload image</Button>
        </div>
        <ReactQuill theme='snow' className='h-72 mb-12 '/>
        <Button type='submit' gradientDuoTone='purpleToBlue' className='uppercase mb-8'>Publish</Button>
      </form>
    </div>
  )
}
