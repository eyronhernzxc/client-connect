import React from 'react'
import Header from "./components/header"
import Steps from './components/steps'
import Body from './components/body'


export default function CompanyDetails() {
  return (
    <div className='drawer-container'>

    <Header/>
    <Steps 
    step ={
    <>
    <div className='steps disable active'>
        <div className='circle'>1</div>
        <p>Company Details</p>
    </div>
    <div className='steps disable'>
        <div className='circle'>2</div>
        <p>E-Merchant Form</p>
    </div>
    <div className='steps disable'>
        <div className='circle'>3</div>
        <p>Categorize</p>
    </div>
    <div className='steps disable'>
        <div className='circle'>4</div>
        <p>Required Documents</p>
    </div>
    </>
    }/>

    <Body 
    bodycontent={
        <>
        
        </>
    }
    />
    </div>
  )
}
