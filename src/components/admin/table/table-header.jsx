import React from 'react'
import './table.css'

export default function TableHeader({tabletitle}) {
  return (
        <div className='table-header'>
            {tabletitle}
        </div>
  )
}