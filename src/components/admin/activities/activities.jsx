import React from 'react'
import './activities.css'

export default function Activities() {
  return (
    
    <div className='activities-container'>

  <div className='activities-header'>
    <h1>Recent Activities</h1>
  </div>

  <div className='search-toolbar'>
    <input
    type='text'
    id='search'
    className='searchbar'
    placeholder='Search name or Id'/>

  <select id='role' className='role'>
    <option selected disabled hidden value=''>Role</option>
    <option value='1'>Merchant</option>
    <option value='2'>Compliance</option>
    <option value='3'>Business Dept</option>
  </select>

  <div className='result-container'>
    <p id='result'>5</p><p>results</p>
  </div>
  </div>

  <table className='activity-table'>

<thead>
    <tr className='table-header'>
      <th>REFERENCE ID</th>
      <th>PERFORMED BY</th>
      <th>ROLE</th>
      <th>ACTIVITY</th>
      <th>TIME</th>
      <th>DATE</th>
    </tr>
</thead>

<tbody>
    <tr>
      <td>LOG-20240808</td>
      <td><div className='tbl-name-container'><div className='tbl-name'><h4>JL</h4></div>Jamaica Laigo</div></td>
      <td><span className='role-span compliance'>Compliance</span></td>
      <td>User Login</td>
      <td>04:30 PM</td>
      <td>Aug 08, 2026</td>

    </tr>

   <tr>
      <td>LOG-20240808</td>
      <td><div className='tbl-name-container'><div className='tbl-name'><h4>JL</h4></div>Jamaica Laigo</div></td>
      <td><span className='role-span bd'>Business Dept</span></td>
      <td>Approved : REF4212</td>
      <td>04:30 PM</td>
      <td>Aug 08, 2026</td>

    </tr>

       <tr>
      <td>LOG-20240808</td>
      <td><div className='tbl-name-container'><div className='tbl-name'><h4>JL</h4></div>Jamaica Laigo</div></td>
      <td><span className='role-span merchant'>Merchant</span></td>
      <td>Added 1 document</td>
      <td>04:30 PM</td>
      <td>Aug 08, 2026</td>

    </tr>

     <tr>
      <td>LOG-20240808</td>
      <td><div className='tbl-name-container'><div className='tbl-name'><h4>JL</h4></div>Jamaica Laigo</div></td>
      <td><span className='role-span compliance'>Compliance</span></td>
      <td>User Login</td>
      <td>04:30 PM</td>
      <td>Aug 08, 2026</td>

    </tr>
</tbody>
  </table>
</div>

  )
}
