import React, { Suspense } from 'react';
import './loader.css';
import { HashLoader } from 'react-spinners';

 const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<div className='loading-page'>

      
      <HashLoader
  color="#0090FF"
  size={40}
/>

    </div>}>
      <Component {...props} />
    </Suspense>
  );

  export default Loadable