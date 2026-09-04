import React, { useEffect, useState } from "react";
import SelectServiceRedesign from "../../../components/merchant/servicestab/servicetab";
import ServiceTab from "../../../components/merchant/servicestab/servicetab";
import PageHeader from "../../../components/merchant/header/page-header";

export default function Services() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <div className="merchant-container">
        <PageHeader>
        <div className="name-container">
          <h1 className="page-title">Forms</h1>
        </div>

        <p className="page-desc">
          Select a service to view the forms available for submission.
        </p>
        </PageHeader>
      </div>

      <div className="ServiceTab">
        <ServiceTab />

      </div>
    </>
  )
}
