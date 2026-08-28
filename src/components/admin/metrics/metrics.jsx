import React from 'react'
import './metrics.css'

export default function Metrics() {
  return (
    
    <div className='dashboard-stat'>

  <div className='dashboard-metrics'>
    <div className='metric-card'>
      <h4>Total Merchants</h4>
      <h1>5,000</h1>
    </div>
    <div className='metric-card'>
      <h4>Expired Applications</h4>
      <h1>1,000</h1>
    </div>
    <div className='metric-card'>
      <h4>Pending Applications</h4>
      <h1>2,450</h1>
    </div>
    <div className='metric-card'>
      <h4>Completed Applications</h4>
      <h1>2,506</h1>
    </div>

  </div>

  <div className='main-progress-container'>
    <div className='progress-container'>
      <div className='ring-progress'>

        <h1>Ring</h1>
      </div>
    </div>

    <div className='line-container'>

      <p>GOCC</p>
      <div className='line-wrapper'>
        <div className='complete-progress'></div> 
      </div>

      <p>PRIVATE/CORPORATION</p>
      <div className='line-wrapper'>
        <div className='pending-progress'></div> 
      </div>

      <p>GOVERNMENT</p>
      <div className='line-wrapper'>
        <div className='declined-progress'></div> 
      </div>
      
    </div>

  </div>

</div>
  )
}
