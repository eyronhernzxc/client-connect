import React from 'react'
import { Outlet } from 'react-router-dom'

export default function FormLayout() {
  return (
    <div className='form-container'>

        <Outlet/>


    </div>
  )
}