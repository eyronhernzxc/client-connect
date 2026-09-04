import React from 'react'
import { useEffect, useState } from 'react'
import '../../pages.css'
import PageHeader from '../../../components/admin/header/page-header';
import TableHeader from '../../../components/admin/table/table-header';
import SearchToolbar from '../../../components/admin/table/searchbar/searchbar';
import Table from '../../../components/admin/table/table';
import ApplicationReviewModal from '../../../components/admin/modals/application-review-modal/application-review-modal';
import { getCompany } from '../../../api/getCompany';
import { BarLoader } from 'react-spinners';


export default function Applications() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Pisopay | Admin Applications"

        const fetchCompany = async () => {

          try{

            const data = await getCompany();
            setCompanies(data);
          }catch(error){

            console.error("Failed to fetch company", error);
          } finally{

            setLoading(false);
          }
        }

        fetchCompany();
    },[]);

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
                <option  value="">
                  Category
                </option>
                <option value="1">GOCC</option>
                <option value="2">Public</option>
                <option value="3">Government</option>
                <option value="4">SOLE</option>
                <option value="5">Private</option>
              </select>

              <select id="status" className="dropdown">
                <option value="">
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
                <th>COMPANY ID</th>
                <th>USER ID</th>
                <th>COMPANY TYPE</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>WEBSITE URL</th>
                <th>Status</th>
                {/* <th>PHONE</th>
                <th>ADDRESS</th>
                <th>ZIP CODE</th>
                <th>DTI REG NUMBER</th>
                <th>COMPANY TIN</th>
                <th>TAX TYPE</th> */}
              </tr>
          </thead>
          
         <tbody>
  {loading ? (
    <tr>
      <td colSpan="7" style={{ padding: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BarLoader color="#0090FF" />
        </div>
      </td>
    </tr>
  ) : companies.length === 0 ? (
    <tr>
      <td
        colSpan="7"
        style={{
          textAlign: "center",
          padding: "30px",
        }}
      >
        No companies found.
      </td>
    </tr>
  ) : (
    companies.map((company) => (
      <tr
        key={company.id}
        onClick={() => handleRowClick(company)}
        style={{ cursor: "pointer" }}
      >
        <td>{company.id}</td>
        <td>{company.user_id}</td>
        <td>{company.company_type?.name}</td>
        <td>{company.name}</td>
        <td>{company.email}</td>
        <td>{company.website_url}</td>
        <td>{company.status}</td>
      </tr>
    ))
  )}
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
