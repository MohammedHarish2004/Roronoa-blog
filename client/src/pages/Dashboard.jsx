import { useEffect, useState } from 'react'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPost from '../components/DashPost'
import { useLocation } from 'react-router-dom'

export default function Dashboard() {

  const [tab,setTab] = useState('')
  const location = useLocation()

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])
  
  return (
    <div className='min-h-screen flex flex-col md:flex-row mb-3 md:mb-0'>
      {/* Sidebar */}
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      {/* Profile */}
      {tab === 'profile' && <DashProfile />}
      {tab === 'posts' && <DashPost />}
    </div>
  )
}
