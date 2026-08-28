import React from 'react'
import Sidebar from '../../components/admin/sidebar/side-bar.jsx'
import { Outlet } from 'react-router-dom'
export default function MainLayout() {
  return (
<>
    <Sidebar />
    
    <Outlet />

</>
  )
}


