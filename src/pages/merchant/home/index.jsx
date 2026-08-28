import React, { useEffect, useState } from "react";

import PageHeader from "../../../components/merchant/header/page-header";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="merchant-container">
      <PageHeader>
        <div className="name-container">
          <h1 className="page-title">Hello,</h1>
          <h1 className="admin-name">Uriel</h1>
        </div>

        <p className="page-desc">
          Home
        </p>
      </PageHeader>

      <div className="table-container">
      </div>
    </div>
  ) 
}
