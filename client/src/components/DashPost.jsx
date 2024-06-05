import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Swal from 'sweetalert2'

export default function DashPost() {

  const {currentUser} = useSelector(state=>state.user)
  const [userPosts,setUserPosts] = useState([])
  const [showmore,setShowmore] = useState(true)

  useEffect(()=>{
    const fetchPosts = async ()=>{
      try {
          const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
          const data = await res.json()
          if(data.length < 9){
            setShowmore(false)
          }
          if(res.ok){
            setUserPosts(data.posts)
          }

      } 
      catch (error) {
        console.log(error.message);
      }
    }
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  },[currentUser._id])

  const handleShowmore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowmore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async(postId,postName)=>{

    Swal.fire({
      title:'Are you sure want to delete ',
      text:`${postName}`, 
      icon:'warning',
      showCancelButton:true,
      cancelButtonColor:'#3085d6',
      confirmButtonColor:'#d33',
      confirmButtonText:'Yes! Delete'
  }).then(async(result)=>{
      if(result.isConfirmed){

        try {
        const res = await fetch(`/api/post/delete/${postId}/${currentUser._id}`,{
          method:"DELETE"
        })

        const data = await res.json()

        if(data.success === false){
          iziToast.error({
            message: `<b>${data.message}</b>`,
            position: 'topRight',
            timeout:2000
          });
          return
        }
        if(res.ok){
          console.log(data.message);
          iziToast.success({
            message: '<b>Post deleted successfully!</b>',
            position: 'topRight',
            timeout:1500
          });
          setUserPosts((prev)=>prev.filter((post)=>post._id !== postId))

        }
       
       
        } 
        catch (error) {
          console.log(error.message);
        }
      }
  })
}
  return( 
   <div className='table-auto overflow-x-scroll md:mx-auto p-6 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    {currentUser.isAdmin && userPosts.length > 0 ? (
      <>
      <Table hoverable className='shadow-md'>
        <Table.Head>
           <Table.HeadCell>Date updated</Table.HeadCell>
           <Table.HeadCell>Post image</Table.HeadCell>
           <Table.HeadCell>Post title</Table.HeadCell>
           <Table.HeadCell>Category</Table.HeadCell>
           <Table.HeadCell><span>Edit</span></Table.HeadCell>
           <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        {
          userPosts.map((post)=>(
            <Table.Body key={post._id} className='divide-y'>
              <Table.Row  className='dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{new Date(post.updatedAt).toLocaleString()}</Table.Cell>
                <Table.Cell>
                  <Link to={`/posts/${post.slug}`}>
                    <img 
                    src={post.image}
                    alt="" 
                    className='w-20 h-10 object-cover bg-gray-500'
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                <Link to={`/posts/${post.slug}`} className='font-medium dark:text-white'>
                  {post.title}
                </Link>  
                </Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 font-medium hover:underline cursor-pointer' to={`/update-post/${post._id}`}>
                    Edit
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <span onClick={()=>handleDeletePost(post._id,post.title)} className='text-red-600 font-medium hover:underline cursor-pointer'>
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))
        }
      </Table>
      {
        showmore && 
        <button onClick={handleShowmore} className='w-full text-teal-500 self-center text-sm py-7 font-medium hover:underline'>Show more</button>
      }
      </>
    ) : (
      <p>No posts Available</p>
    )}
   </div>
  )
}
