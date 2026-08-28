import React from 'react'
import { useEffect } from 'react'
import '../../pages.css'
import PageHeader from '../../../components/admin/header/page-header'


export default function Settings() {

  useEffect(() =>{

    document.title = "Pisopay | Admin Settings"
  });


  return (
    <div className ='admin-container'>
            <PageHeader>
                <h1 className="page-title">
                    Settings
                </h1>
                <p className='page-desc'>Review, validate documents and manage merchant onboarding status.</p>
            </PageHeader>
    
            <div className='page-gap'></div>

            </div>
  )
}
