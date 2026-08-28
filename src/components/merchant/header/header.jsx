import React from 'react'
import './header.css'
import { BellDot } from 'lucide-react'

export default function Header() {
  return (

 <div className='dashboard-header'>

    <div className='icon-container'>
      <button className='bell' title='Notifications'>
      <BellDot />
      </button>
    <button className='profile-btn' title='Profile'>
      <h2>JM</h2>
    </button>
    </div>
    <div className='header-greeting'>
      <div className='name-container'>
      <h1>Hello, </h1> <h1 className='admin-name'>Jamaica</h1>
      </div>
      <p>Tracking current status and pending applications</p>
    </div>

  </div>
  
  )
}
