import React from 'react'
import { useEffect, useState } from 'react';
import '../../pages.css'
import PageHeader from '../../../components/admin/header/page-header';
import TableHeader from '../../../components/admin/table/table-header';
import SearchToolbar from '../../../components/admin/table/searchbar/searchbar';
import Table from '../../../components/admin/table/table';
import { getMerchant } from '../../../api/getMerchant';
import { BarLoader } from 'react-spinners';

export default function Merchants() {

    const [merchants, setMerchant] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {

        document.title = "Pisopay | Admin Merchant List"

        const fetchMerchant = async () => {

            try{

                const data = await getMerchant();
                setMerchant(data);

            }catch(error){

                console.error("Failed to fetch merchant", error);

            }finally{

                setLoading(false);
            }
        }

        fetchMerchant();
    }, []);

  return (
     <div className ='admin-container'>
            <PageHeader>
                <h1 className="page-title">
                    Merchants
                </h1>
                <p className='page-desc'>Review, validate documents and manage merchant onboarding status.</p>
            </PageHeader>
    
            <div className='page-gap'></div>
    
            <div className='table-container'>
    
                <TableHeader tabletitle={<h1>Current Merchants</h1>}/>
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
                    <th>ID</th>
                    <th>USER ID</th>
                    <th>FIRST NAME</th>
                    <th>MIDDLE NAME</th>
                    <th>LAST NAME</th>
                    <th>MOBILE NUMBER</th>
                    <th>BIRTH DATE</th>
                    <th>CREATED AT</th>
                  </tr>
              </thead>
              
              <tbody>
  {loading ? (
    <tr>
      <td colSpan="8" style={{ padding: "30px" }}>
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
  ) : merchants.length === 0 ? (
    <tr>
      <td
        colSpan="8"
        style={{
          textAlign: "center",
          padding: "30px",
        }}
      >
        No merchants found.
      </td>
    </tr>
  ) : (
    merchants.map((merchant) => (
      <tr key={merchant.id}>
        <td>{merchant.id}</td>
        <td>{merchant.user_id}</td>
        <td>{merchant.first_name}</td>
        <td>{merchant.middle_name}</td>
        <td>{merchant.last_name}</td>
        <td>{merchant.mobile_number}</td>
        <td>{merchant.birth_date?.split("T")[0] || ""}</td>
        <td>{merchant.created_at?.split("T")[0] || ""}</td>
      </tr>
    ))
  )}
</tbody>
                </table>
                      </>}
                      />
    
            </div>
    
        </div>
  )
}