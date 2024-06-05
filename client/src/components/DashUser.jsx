import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {  FaCheck, FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Swal from 'sweetalert2'

export default function DashUser() {

    const[users,setUsers] = useState([])
    const {currentUser} = useSelector(state=>state.user)
    console.log(users);

    useEffect(()=>{

        const fetchUsers = async()=>{
            const res = await fetch('/api/user/getusers')
            const data = await res.json()
            setUsers(data.users) 
        }
        if(currentUser.isAdmin){
            fetchUsers()
        }
    },[currentUser._id])

    const handleDeleteUser = async (userId, userName) => {
      Swal.fire({
          title: 'Are you sure you want to delete?',
          text: `${userName}`,
          icon: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#3085d6',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Yes! Delete'
      }).then(async (result) => {
          if (result.isConfirmed) {
              Swal.fire({
                  title: 'Are you absolutely sure?',
                  text: `This action cannot be undone. Deleting ${userName}.`,
                  icon: 'warning',
                  showCancelButton: true,
                  cancelButtonColor: '#3085d6',
                  confirmButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
              }).then(async (finalResult) => {
                  if (finalResult.isConfirmed) {
                      try {
                          const res = await fetch(`/api/user/delete/${userId}`, {
                              method: "DELETE"
                          })
                          const data = await res.json()

                          if (data.success === false) {
                              iziToast.error({
                                  message: `<b>${data.message}</b>`,
                                  position: 'topRight',
                                  timeout: 2000
                              });
                              return
                          }
                          iziToast.success({
                              message: '<b>User deleted successfully!</b>',
                              position: 'topRight',
                              timeout: 1500
                          });
                          setUsers((prev)=>prev.filter((user)=>user._id !== userId))
                      } catch (error) {
                          console.log(error.message);
                      }
                  }
              });
          }
      });
  }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-6 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    {currentUser.isAdmin &&  users.length > 0 ? (
      <>
      <Table hoverable className='shadow-md'>
        <Table.Head>
           <Table.HeadCell>Date created</Table.HeadCell>
           <Table.HeadCell>User Image</Table.HeadCell>
           <Table.HeadCell>User Name</Table.HeadCell>
           <Table.HeadCell>User Email</Table.HeadCell>
           <Table.HeadCell>Admin</Table.HeadCell>
           <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        {
          users.map((user)=>(
            <Table.Body key={user._id} className='divide-y'>
              <Table.Row  className='dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell align='center'>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell align='center'>
                    <img 
                    src={user.avatar}
                    alt="profile" 
                    className='w-10 h-10 rounded-full object-cover bg-gray-500'
                    />
                </Table.Cell>
                <Table.Cell>
                  {user.username}
                </Table.Cell>
                <Table.Cell>
                  {user.email}
                </Table.Cell>
                <Table.Cell align='center'>
                  {user.isAdmin ? (<FaCheck className='text-green-500'/>) : (<FaTimes className='text-red-500'/>)}
                </Table.Cell>
                <Table.Cell>
                  {
                    currentUser.isAdmin && !user.isAdmin && currentUser._id !== user._id ?
                    <span onClick={()=>handleDeleteUser(user._id,user.username)} className='text-red-600 font-medium hover:underline cursor-pointer'>
                    Delete
                    </span>
                    :
                    <span className='text-cyan-500 font-medium'>Can't delete </span>
                  }
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))
        }
      </Table>
      </>
    ) : (
      <p>No users Available</p>
    )}
   </div>
  )
}
