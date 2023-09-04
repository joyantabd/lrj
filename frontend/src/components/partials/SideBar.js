import { FaAngleDown, FaHome, FaJediOrder } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { Link } from "react-router-dom";
import GlobalFunction from "../../GlobalFunction";

function SideBar() {
  return (

    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading"></div>
            <Link className="nav-link" to='/'>
              <div className="sb-nav-link-icon"><FaHome /></div>
              Dashboard
            </Link>

            <div className="sb-sidenav-menu-heading">Products</div>
            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#product" aria-expanded="false" aria-controls="collapseLayouts">
              <div className="sb-nav-link-icon"><BiCategory /> </div>
              Product
              <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
            </a>
            <div className="collapse" id="product" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to='product'>Product List</Link>
                {GlobalFunction.isAdmin() &&
                  <>
                    <Link className="nav-link" to='product/create'>Add Product</Link>
                    <Link className="nav-link" to='product/create'>Trash</Link>
                  </>
                }

              </nav>
            </div>

            {
              GlobalFunction.isAdmin() &&
              <>
                <div className="sb-sidenav-menu-heading">Shops</div>
                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#shop" aria-expanded="false" aria-controls="collapseLayouts">
                  <div className="sb-nav-link-icon"><BiCategory /> </div>
                  Shop
                  <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
                </a>
                <div className="collapse" id="shop" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to='shop'>Shop List</Link>
                    <Link className="nav-link" to='shop/create'>Add Shop</Link>
                  </nav>
                </div>

                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#sales" aria-expanded="false" aria-controls="collapseLayouts">
                  <div className="sb-nav-link-icon"><BiCategory /> </div>
                  Sales Manager
                  <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
                </a>
                <div className="collapse" id="sales" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to='sales-manager'>Sales Manager List</Link>
                    <Link className="nav-link" to='sales-manager/create'>Add Sales Manager</Link>
                  </nav>
                </div>


                <div className="sb-sidenav-menu-heading">Management</div>
                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                  <div className="sb-nav-link-icon"><BiCategory /> </div>
                  Category
                  <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
                </a>
                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to='category'>Category List</Link>
                    <Link className="nav-link" to='category/create'>Add Category</Link>
                  </nav>
                </div>

                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#subCategory" aria-expanded="false" aria-controls="collapseLayouts">
                  <div className="sb-nav-link-icon"><BiCategory /> </div>
                  Sub Category
                  <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
                </a>
                <div className="collapse" id="subCategory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to='sub_category'>Sub Category</Link>
                    <Link className="nav-link" to='sub_category/create'>Add Sub_Category</Link>
                  </nav>
                </div>

                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#brand" aria-expanded="false" aria-controls="collapseLayouts">
                  <div className="sb-nav-link-icon"><BiCategory /> </div>
                  Brand
                  <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
                </a>
                <div className="collapse" id="brand" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to='brand'>Brand List</Link>
                    <Link className="nav-link" to='brand/create'>Add Brand</Link>
                  </nav>
                </div>

                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#supplier" aria-expanded="false" aria-controls="collapseLayouts">
                  <div className="sb-nav-link-icon"><BiCategory /> </div>
                  Suppiler
                  <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
                </a>
                <div className="collapse" id="supplier" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to='supplier'>Suppiler List</Link>
                    <Link className="nav-link" to='supplier/create'>Add Suppiler</Link>
                  </nav>
                </div>




                <Link className="nav-link" to='product-attributes'>
                  <div className="sb-nav-link-icon"><i className="fas fa-table" /></div>
                  Product Attributes
                </Link>

              </>
            }

            <div className="sb-sidenav-menu-heading">Accesories</div>
            <Link className="nav-link" to='bar-code'>
              <div className="sb-nav-link-icon"><FaJediOrder /> </div>
              Generate Bar Code
              </Link>
             
             

            

            <div className="sb-sidenav-menu-heading">Orders</div>
            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#order" aria-expanded="false" aria-controls="collapseLayouts">
              <div className="sb-nav-link-icon"><FaJediOrder /> </div>
              Order
              <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
            </a>
            <div className="collapse" id="order" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to='order'>Order List</Link>
                <Link className="nav-link" to='order/create'>New Order</Link>
              </nav>
            </div>

            <div className="sb-sidenav-menu-heading">Reports</div>
            <Link className="nav-link" to='reports'>
              <div className="sb-nav-link-icon"><FaJediOrder /> </div>
              Report
              </Link>



          </div>
        </div>

      </nav>
    </div>

  );
}

export default SideBar;