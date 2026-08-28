import React from 'react'
import './table.css'

export default function Table({tablecontent}) {
  return (
    <div className='table-content-container'>
        {tablecontent}
    </div>
  )
}