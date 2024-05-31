import { useEffect, useState } from 'react'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'

export default function Dashboard() {

  const [tab,setTab] = useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    setTab(tabFromUrl)
  },[location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row mb-3 md:mb-0'>
      {/* Sidebar */}
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      {/* Profile */}
      <div className='mx-auto max-w-lg p-3 w-full'>
      {tab === 'profile' && <DashProfile />}
      </div>
    </div>
  )
}
