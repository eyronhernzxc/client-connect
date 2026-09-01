import React from 'react'
import { useEffect, useState } from 'react'
import '../../pages.css'
import PageHeader from '../../../components/admin/header/page-header';
import TableHeader from '../../../components/admin/table/table-header';
import SearchToolbar from '../../../components/admin/table/searchbar/searchbar';
import Table from '../../../components/admin/table/table';
import ApplicationReviewModal from '../../../components/admin/modals/application-review-modal/application-review-modal';


export default function Applications() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        document.title = "Pisopay | Admin Applications"
    });

    const handleRowClick = (applicationData) => {
      setSelectedApplication(applicationData);
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedApplication(null);
    };

  return (

    <div className ='admin-container'>
        <PageHeader>
            <h1 className="page-title">
                Applications
            </h1>
            <p className='page-desc'>Review, validate documents and manage merchant onboarding status.</p>
        </PageHeader>

        <div className='page-gap'></div>

        <div className='table-container'>

            <TableHeader tabletitle={<h1>Review Applications</h1>}/>
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
                <th>COMPANY NAME</th>
                <th>CATEGORY</th>
                <th>DOCUMENTS</th>
                <th>STATUS</th>
                <th>DATE</th>
              </tr>
          </thead>
          
          <tbody>
              <tr onClick={() => handleRowClick({
                referenceId: 'LOG-20240808',
                companyName: 'Voltex Tech',
                category: 'Government',
                documents: '13/21',
                status: 'Under Review',
                statusClass: 'review',
                date: '08-12-2026'
              })} style={{ cursor: 'pointer' }}>
                <td>LOG-20240808</td>
                <td>Voltex Tech</td>
                <td><span className='category-span'>Government</span></td>
                <td>13/21</td>
                <td><span className="status-span review">
                Under Review</span></td>
                <td>08-12-2026</td>
          
              </tr>
          </tbody>
            </table>
                  </>}
                  />

        </div>

        <ApplicationReviewModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          applicationData={selectedApplication}
        />

    </div>

  );
}
