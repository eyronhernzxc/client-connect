import React, { Suspense } from 'react';
import './loader.css';

 const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<div className='LoadingPage'>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

  export default Loadable