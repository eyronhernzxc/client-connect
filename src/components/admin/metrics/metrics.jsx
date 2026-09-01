import React from "react";
import "./metrics.css";

import {
  Users,
  Clock3,
  FileCheck2,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export default function Metrics() {
  const metrics = [
    {
      title: "Total Merchants",
      value: "5,000",
      change: "+12.5%",
      icon: Users,
      type: "positive",
    },
    {
      title: "Expired Applications",
      value: "1,000",
      change: "-4.2%",
      icon: Clock3,
      type: "negative",
    },
    {
      title: "Pending Applications",
      value: "2,450",
      change: "+8.4%",
      icon: FileCheck2,
      type: "warning",
    },
    {
      title: "Completed Applications",
      value: "2,506",
      change: "+15.8%",
      icon: CheckCircle2,
      type: "positive",
    },
  ];

  const ringData = [
    {
      label: "GOCC",
      percentage: 30,
      color: "#34AA59",
    },
    {
      label: "PRIVATE/CORPORATION",
      percentage: 20,
      color: "#E98F45",
    },
    {
      label: "GOVERNMENT",
      percentage: 30,
      color: "#E63946",
    },
    {
      label: "COOPERATIVE",
      percentage: 15,
      color: "#457B9D",
    },
    {
      label: "OTHERS",
      percentage: 5,
      color: "#F1D302",
    },
  ];

  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  const segments = ringData.map((item) => {
    const strokeDasharray = (item.percentage / 100) * circumference;

    const segment = {
      ...item,
      strokeDasharray,
      strokeDashoffset: -currentOffset,
    };

    currentOffset += strokeDasharray;

    return segment;
  });

  return (
    <div className="dashboard-stat">
      {/* ================= MAIN DASHBOARD ================= */}
      <div className="dashboard-grid">
        {/* ================= APPLICATION DISTRIBUTION ================= */}
        <div className="application-card">
          <div className="application-header">
            <div>
              <h2>Application Distribution</h2>
            </div>

            <button className="view-details">View Details</button>
          </div>

          <div className="main-progress-container">
            {/* ================= RING ================= */}
            <div className="progress-container">
              <div className="ring-progress">
                <svg viewBox="0 0 120 120" className="ring-svg">
                  {/* Background */}
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="#EEF0F2"
                    strokeWidth="12"
                  />

                  {/* Segments */}
                  {segments.map((segment, index) => (
                    <circle
                      key={index}
                      cx="60"
                      cy="60"
                      r={radius}
                      fill="none"
                      stroke={segment.color}
                      strokeWidth="12"
                      strokeDasharray={`${segment.strokeDasharray} ${
                        circumference - segment.strokeDasharray
                      }`}
                      strokeDashoffset={segment.strokeDashoffset}
                      strokeLinecap="round"
                      className="ring-segment"
                    />
                  ))}
                </svg>

                <div className="ring-content">
                  <h1>30%</h1>
                  <p>Completed</p>
                </div>
              </div>
            </div>

            <div className="line-container">
              {ringData.map((item, index) => (
                <div key={index} className="category-row">
                  <div className="category-info">
                    <div
                      className="category-dot"
                      style={{
                        backgroundColor: item.color,
                      }}
                    />

                    <p>{item.label}</p>

                    <span>{item.percentage}%</span>
                  </div>

                  <div className="line-wrapper">
                    <div
                      className="category-progress"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= DASHBOARD OVERVIEW ================= */}
        <div className="dashboard-overview">
          <div className="overview-header">
            <h2>Dashboard Overview</h2>
          </div>

          <div className="overview-metrics">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;

              return (
                <div className="metric-card" key={index}>
                  <div className="metric-card-top">
                    <div className={`metric-icon ${metric.type}`}>
                      <Icon size={21} strokeWidth={2} />
                    </div>

                  <div className="metric-info">
                    <p>{metric.title}</p>
                    <h1>{metric.value}</h1>
                  </div>

                    <span className={`metric-change ${metric.type}`}>
                      <TrendingUp size={13} />
                      {metric.change}
                    </span>
                  </div>


                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// import "./metrics.css";

// import {
//   Users,
//   Clock3,
//   FileCheck2,
//   CheckCircle2,
//   TrendingUp,
// } from "lucide-react";

// export default function Metrics() {
//   const metrics = [
//     {
//       title: "Total Merchants",
//       value: "5,000",
//       change: "+12.5%",
//       icon: Users,
//       type: "positive",
//     },
//     {
//       title: "Expired Applications",
//       value: "1,000",
//       change: "-4.2%",
//       icon: Clock3,
//       type: "negative",
//     },
//     {
//       title: "Pending Applications",
//       value: "2,450",
//       change: "+8.4%",
//       icon: FileCheck2,
//       type: "warning",
//     },
//     {
//       title: "Completed Applications",
//       value: "2,506",
//       change: "+15.8%",
//       icon: CheckCircle2,
//       type: "positive",
//     },
//   ];

//   const ringData = [
//     {
//       label: "GOCC",
//       percentage: 30,
//       color: "#34AA59",
//     },
//     {
//       label: "PRIVATE/CORPORATION",
//       percentage: 20,
//       color: "#E98F45",
//     },
//     {
//       label: "GOVERNMENT",
//       percentage: 30,
//       color: "#E63946",
//     },
//     {
//       label: "COOPERATIVE",
//       percentage: 15,
//       color: "#457B9D",
//     },
//     {
//       label: "OTHERS",
//       percentage: 5,
//       color: "#F1D302",
//     },
//   ];

//   const radius = 50;
//   const circumference = 2 * Math.PI * radius;

//   let currentOffset = 0;

//   const segments = ringData.map((item) => {
//     const strokeDasharray = (item.percentage / 100) * circumference;

//     const segment = {
//       ...item,
//       strokeDasharray,
//       strokeDashoffset: -currentOffset,
//     };

//     currentOffset += strokeDasharray;

//     return segment;
//   });

//   return (
//     <div className="dashboard-stat">
//       {/* ================= METRICS ================= */}
//       <div className="dashboard-metrics">
//         {metrics.map((metric, index) => {
//           const Icon = metric.icon;

//           return (
//             <div className="metric-card" key={index}>
//               <div className="metric-card-top">
//                 <div className={`metric-icon ${metric.type}`}>
//                   <Icon size={21} strokeWidth={2} />
//                 </div>

//                 <span className={`metric-change ${metric.type}`}>
//                   <TrendingUp size={13} />
//                   {metric.change}
//                 </span>
//               </div>

//               <div className="metric-info">
//                 <p>{metric.title}</p>
//                 <h1>{metric.value}</h1>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* ================= APPLICATION DISTRIBUTION ================= */}
//       <div className="application-card">
//         <div className="application-header">
//           <div>
//             <h2>Application Distribution</h2>
//             <p>Merchant applications by organization type</p>
//           </div>

//           <button className="view-details">View Details</button>
//         </div>

//         <div className="main-progress-container">
//           {/* ================= RING ================= */}
//           <div className="progress-container">
//             <div className="ring-progress">
//               <svg viewBox="0 0 120 120" className="ring-svg">
//                 {/* Background */}
//                 <circle
//                   cx="60"
//                   cy="60"
//                   r={radius}
//                   fill="none"
//                   stroke="#EEF0F2"
//                   strokeWidth="12"
//                 />

//                 {/* Segments */}
//                 {segments.map((segment, index) => (
//                   <circle
//                     key={index}
//                     cx="60"
//                     cy="60"
//                     r={radius}
//                     fill="none"
//                     stroke={segment.color}
//                     strokeWidth="12"
//                     strokeDasharray={`${segment.strokeDasharray} ${
//                       circumference - segment.strokeDasharray
//                     }`}
//                     strokeDashoffset={segment.strokeDashoffset}
//                     strokeLinecap="round"
//                     className="ring-segment"
//                   />
//                 ))}
//               </svg>

//               <div className="ring-content">
//                 <h1>30%</h1>
//                 <p>Completed</p>
//               </div>
//             </div>
//           </div>

//           {/* ================= LEGEND ================= */}
//           <div className="line-container">
//             {ringData.map((item, index) => (
//               <div key={index} className="category-row">
//                 <div className="category-info">
//                   <div
//                     className="category-dot"
//                     style={{
//                       backgroundColor: item.color,
//                     }}
//                   />

//                   <p>{item.label}</p>

//                   <span>{item.percentage}%</span>
//                 </div>

//                 <div className="line-wrapper">
//                   <div
//                     className="category-progress"
//                     style={{
//                       width: `${item.percentage}%`,
//                       backgroundColor: item.color,
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from 'react'
// import './metrics.css'

// export default function Metrics() {
//   // Ring chart data matching the screenshot
//   const ringData = [
//     { label: 'GOCC', percentage: 30, color: '#34AA59' },
//     { label: 'PRIVATE/CORPORATION', percentage: 20, color: '#E98F45' },
//     { label: 'GOVERNMENT', percentage: 30, color: '#E63946' },
//     { label: 'COOPERATIVE', percentage: 15, color: '#457B9D' },
//     { label: 'OTHERS', percentage: 5, color: '#F1D302' },
//   ];

//   const radius = 50;
//   const circumference = 2 * Math.PI * radius;

//   let currentOffset = 0;
//   const segments = ringData.map((item) => {
//     const ratio = item.percentage / 100;
//     const strokeDasharray = ratio * circumference;
//     const offset = currentOffset;
//     currentOffset += strokeDasharray;

//     return {
//       ...item,
//       strokeDasharray,
//       strokeDashoffset: -offset,
//     };
//   });

//   return (

//     <div className='dashboard-stat'>

//       <div className='dashboard-metrics'>
//         <div className='metric-card'>
//           <h4>Total Merchants</h4>
//           <h1>5,000</h1>
//         </div>
//         <div className='metric-card'>
//           <h4>Expired Applications</h4>
//           <h1>1,000</h1>
//         </div>
//         <div className='metric-card'>
//           <h4>Pending Applications</h4>
//           <h1>2,450</h1>
//         </div>
//         <div className='metric-card'>
//           <h4>Completed Applications</h4>
//           <h1>2,506</h1>
//         </div>

//       </div>

//       <div className='main-progress-container'>
//         <div className='progress-container'>
//           <div className='ring-progress'>
//             <svg viewBox="0 0 120 120" className="ring-svg">
//               {/* Background circle */}
//               <circle
//                 cx="60"
//                 cy="60"
//                 r={radius}
//                 fill="none"
//                 stroke="#E5E7EB"
//                 strokeWidth="14"
//               />

//               {/* Colored segments */}
//               {segments.map((segment, index) => (
//                 <circle
//                   key={index}
//                   cx="60"
//                   cy="60"
//                   r={radius}
//                   fill="none"
//                   stroke={segment.color}
//                   strokeWidth="14"
//                   strokeDasharray={segment.strokeDasharray}
//                   strokeDashoffset={segment.strokeDashoffset}
//                   strokeLinecap="round"
//                   className="ring-segment"
//                 />
//               ))}
//             </svg>

//             <div className='ring-content'>
//               <h1>30%</h1>
//               <p>Completed</p>
//             </div>
//           </div>
//         </div>

//         <div className='line-container'>
//           {ringData.map((item, index) => (
//             <div key={index} className="category-row">
//               <p style={{ color: item.color }}>{item.label}</p>
//               <div className='line-wrapper'>
//                 <div
//                   className='category-progress'
//                   style={{
//                     width: `${item.percentage}%`,
//                     backgroundColor: item.color
//                   }}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>

//     </div>
//   )
// }
