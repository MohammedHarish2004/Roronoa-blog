import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col md:flex-row p-3 m-3 border border-cyan-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex flex-1  flex-col justify-center p-3'>
           <h2 className='text-2xl'>
            Want to watch more marvel movies 
           </h2>
           <p className='text-gray-500 my-2'>
            Checkout these websites to watch freely
           </p>
           <Button className='rounded-tl-xl rounded-bl-none w-full' gradientDuoTone='purpleToBlue'>
                <a href="https://www.hotstar.com/in/channels/marvel" target='_blank' rel='noopener noreferrer'>Watch Now</a>
           </Button>
        </div>
        <div className='flex-1 p-7'>
            <img src="https://cdn.marvel.com/content/1x/movies_category_bar-960x540.jpg" alt="" />
        </div>
    </div>
  )
}
