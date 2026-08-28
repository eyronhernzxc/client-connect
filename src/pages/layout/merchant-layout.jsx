import React from 'react'
import Sidebar from '../../components/merchant/sidebar/sidebar'
import { Outlet } from 'react-router-dom'
export default function MerchantLayout() {
  return (
<>
    <Sidebar />

    <Outlet />
</>
  )
}
