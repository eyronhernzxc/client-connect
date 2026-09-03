import React, { useEffect, useState } from 'react'
import { Bell, BellDot} from 'lucide-react'
import './header.css'
import { getCurrentUser } from '../../../api/auth';

export default function PageHeader({children}) {

    const [user, setUser] = useState(null);
  
  useEffect(() => {
      const fetchUser = async () => {
          try {
              const data = await getCurrentUser();
              setUser(data);
          } catch (error) {
              console.error(error);
          }
      };
  
      fetchUser();
  }, []);

  return(
    <div className='page-header'>
    
    <div className='title-container'>

    {children}
    </div>

    <div className='p-icon-container'>
    
     <button className='bell' title='Notifications'>
          <BellDot />
          </button>
        <button className='profile-btn' title='Profile'>
          <h2>  
            {user?.data?.userdetail?.first_name?.charAt(0)}
            {user?.data?.userdetail?.last_name?.charAt(0)}
          </h2>
        </button>
        
    </div>

    </div>

  )
}
