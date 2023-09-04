import BreadCrumb from "../partials/BreadCrumb";


function DashBoard() {
  return (
    <>


      <BreadCrumb title={`Dashboard`} />

      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card bg-primary text-white mb-4">
            <div className="card-body">Primary Card</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <div className="small text-white"><i className="fas fa-angle-right" /></div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-warning text-white mb-4">
            <div className="card-body">Warning Card</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <div className="small text-white"><i className="fas fa-angle-right" /></div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-success text-white mb-4">
            <div className="card-body">Success Card</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <div className="small text-white"><i className="fas fa-angle-right" /></div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-danger text-white mb-4">
            <div className="card-body">Danger Card</div>
            <div className="card-footer d-flex align-items-center justify-content-between">

              <div className="small text-white"><i className="fas fa-angle-right" /></div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default DashBoard;