import React from 'react'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Sidebar from '../../components/merchant/form/sidebar';

export default function FormLayout() {

  useEffect (() => {

    document.title = "Pisopay | Forms"
  });
  
  return (
    <div className='form-container'>

        <Outlet/>


    </div>
  )
}