import React from "react";

function DocumentStats() {
    return (
        <>
        <div className="outer-main-box">
        <h1 className="box-header">DOCUMENTS</h1>    
        <div className="document-info">
            <div className="document-file">
                <div className="docs-upload">
                    
                </div>
            </div>
            <div className="document-name">
                <h1>Government Issued-ID</h1>
                <p>Not yet uploaded.</p>
            </div>
            <div className="document-stats">
                <p>Verified</p>
            </div>
        
        </div>
            <div className="document-info">
            <div className="document-file">
                <div className="docs-upload">
                    
                </div>
            </div>
            <div className="document-name">
                <h1>Business Permit</h1>
                <p>Not yet uploaded.</p>
            </div>
            <div className="document-stats">
                <p>Verified</p>
            </div>
            
            </div>
        </div>
        </>
    );
}

export default DocumentStats;