import React from 'react';
import BreadCrumb from "../partials/BreadCrumb";

const Error500 = () => {
    return (
      <>
      <BreadCrumb title={`Error 500`}/>

<div id="layoutError">
  <div id="layoutError_content">
    <main>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="text-center mt-4">
              <h1 className="display-1">500</h1>
              <p className="lead">Internal Server Error</p>
              <a href="index.html">
                <i className="fas fa-arrow-left me-1" />
                Return to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <div id="layoutError_footer">
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-muted">Copyright © Your Website 2023</div>
          <div>
            <a href="#">Privacy Policy</a>
            ·
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</div>
</>

    );
};

export default Error500;