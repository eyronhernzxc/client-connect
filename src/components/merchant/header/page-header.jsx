import React from 'react'
import { Bell, BellDot} from 'lucide-react'
import './header.css'

export default function PageHeader({children}) {
  return(
    <div className='page-header'>
    
    <div className='title-container'>

    {children}
    </div>

    <div className='p-icon-container'>
    
     <button className='bell' title='Notifications'>
          <BellDot />
          </button>
        <button className='profile-btn' title='Profile'>
          <h2>Uriel</h2>
        </button>
        
    </div>

    </div>

  )
}
