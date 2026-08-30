import React from 'react'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

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