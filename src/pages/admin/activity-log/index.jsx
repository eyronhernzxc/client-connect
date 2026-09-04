import React from 'react'
import { useEffect } from 'react'
import '../../pages.css'
import PageHeader from '../../../components/admin/header/page-header';
import TableHeader from '../../../components/admin/table/table-header';
import SearchToolbar from '../../../components/admin/table/searchbar/searchbar';
import Table from '../../../components/admin/table/table';

export default function ActivityLog() {

    useEffect(() => {

        document.title = "Pisopay | Admin Activity Logs"
    });
  return (

    <div className ='admin-container'>
                <PageHeader>
                    <h1 className="page-title">
                        Activity Log
                    </h1>
                    <p className='page-desc'>Review, validate documents and manage merchant onboarding status.</p>
                </PageHeader>
        
                <div className='page-gap'></div>
        
                <div className='table-container'>
        
                    <TableHeader tabletitle={<h1>Log Overview</h1>}/>
                    <SearchToolbar 
        
                     searchtool={
                    <>
                      <input
                        type="text"
                        id="ob-search"
                        className="searchbar"
                        placeholder="Search name or Id"
                      />
        
                      <select id="category" className="dropdown">
                        <option selected disabled hidden value="">
                          Category
                        </option>
                        <option value="1">GOCC</option>
                        <option value="2">Public</option>
                        <option value="3">Government</option>
                        <option value="4">SOLE</option>
                        <option value="5">Private</option>
                      </select>
        
                      <select id="status" className="dropdown">
                        <option selected disabled value="">
                          Status
                        </option>
                        <option value="1">Under Review</option>
                        <option value="2">Reviewed</option>
                        <option value="3">Sent to Compliance</option>
                        <option value="4">Rejected</option>
                      </select>
        
                      <div className="result-container">
                        <p id="ob-result">5</p>
                        <p>results</p>
                      </div>
                    </>
                  }   
                    />
        
                    <Table 
                          
                          tablecontent={
                          <>
                          <table className='table-content'>
                  
                  <thead>
                      <tr className='tbl-header'>
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
                        <td>PSPY-123</td>
                        <td><span >Marvin ( Voltex Tech )</span></td>
                        <td><span className='category-span government'>Merchant</span></td>
                        <td><span className="gateway-span ol-banking">Application</span></td>
                        <td><span className='others-span'>8:45 AM</span></td>
                        <td><span className='total-span'>08-01-2026</span></td>
                  
                      </tr>
                  </tbody>
                    </table>
                          </>}
                          />
        
                </div>
        
            </div>

  );
}
