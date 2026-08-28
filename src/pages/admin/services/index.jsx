import React from 'react'
import { useEffect } from 'react'
import '../../pages.css'
import PageHeader from '../../../components/admin/header/page-header';
import TableHeader from '../../../components/admin/table/table-header';
import SearchToolbar from '../../../components/admin/table/searchbar/searchbar';
import Table from '../../../components/admin/table/table';

export default function Services() {

     useEffect(() => {
    
            document.title = "Pisopay | Admin Services"
        });

  return (
     <div className ='admin-container'>
            <PageHeader>
                <h1 className="page-title">
                    Services
                </h1>
                <p className='page-desc'>Review, validate documents and manage merchant onboarding status.</p>
            </PageHeader>
    
            <div className='page-gap'></div>
    
            <div className='table-container'>
    
                <TableHeader tabletitle={<h1>Service Applications</h1>}/>
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
                    <th>COMPANY NAME</th>
                    <th>CATEGORY</th>
                    <th>DOCUMENTS</th>
                    <th>SYSTEM</th>
                    <th>PAYMENT GATEWAY</th>
                    <th>OTHER SERVICES</th>
                    <th>TOTAL</th>
                  </tr>
              </thead>
              
              <tbody>
                  <tr>
                    <td>VOLTEZ V</td>
                    <td><span className='category-span government'>Government</span></td>
                    <td><span className='system-span backend'>Backend</span></td>
                    <td><span className="gateway-span ol-banking">Online Banking</span></td>
                    <td><span className='others-span'>payment_link</span></td>
                    <td><span className='total-span'>2</span></td>
              
                  </tr>
              </tbody>
                </table>
                      </>}
                      />
    
            </div>
    
        </div>
  );
}
