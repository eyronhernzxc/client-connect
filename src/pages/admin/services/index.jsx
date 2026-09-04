import React from 'react'
import { useEffect, useState } from 'react'
import '../../pages.css'
import PageHeader from '../../../components/admin/header/page-header';
import TableHeader from '../../../components/admin/table/table-header';
import SearchToolbar from '../../../components/admin/table/searchbar/searchbar';
import Table from '../../../components/admin/table/table';
import ServicesModal from '../../../components/admin/modals/services-application-modal/services-modal';
import { getServices } from '../../../api/getServices';
import { BarLoader } from 'react-spinners';

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);


  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

     useEffect(() => {
    

            document.title = "Pisopay | Admin Services"

            const fetchServices = async () => {

              try{

                const data = await getServices();
                setServices(data);

                console.log(data);
              }catch(error){

                console.error("Failed to fetch service applications", error);
              }finally{

                setLoading(false);
              }
            }

            fetchServices();
        }, []);

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
                    <option value="">
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
                    <th>SERVICE ID</th>
                    <th>COMPANY NAME</th>
                    <th>APPLICATION NUMBER</th>
                    <th>SERVICE NAME</th>
                    <th>STATUS</th>
                    <th>CREATED AT</th>
                  </tr>
              </thead>
              
              <tbody>
  {loading ? (
    <tr>
  <td colSpan="6" style={{ padding: "30px" }}>
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
  ) : services.length === 0 ? (
    <tr>
      <td colSpan="6" style={{ textAlign: "center", padding: "30px" }}>
        No service applications found.
      </td>
    </tr>
  ) : (
    services.map((service) => (
      <tr
        key={service.id}
        onClick={() => handleRowClick(service)}
        style={{ cursor: "pointer" }}
      >
        <td>{service.id}</td>
        <td>{service.company?.name}</td>
        <td>{service.application_number}</td>
        <td>{service.name}</td>
        <td>{service.status}</td>
        <td>{service.created_at?.split("T")[0] || ""}</td>
      </tr>
    ))
  )}
</tbody>
                </table>
                      </>}
                      />
            </div>
            {/* modal */}
            {isModalOpen && (
              <ServicesModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={selectedItem}
              />
            )}
          </div>
  );
}
