import { createBrowserRouter } from "react-router-dom";
import Master from "../components/layouts/Master";
import DashBoard from "../components/modules/DashBoard";
import Error500 from "../components/modules/Error500";
import Error404 from "../components/modules/Error404";
import AddCategory from "../components/modules/category/AddCategory";
import CategoryList from "../components/modules/category/CategoryList";
import EditCategory from "../components/modules/category/EditCategory";
import SubCategoryList from "../components/modules/subcategory/SubCategoryList";
import AddSubCategory from "../components/modules/subcategory/AddSubCategory";
import EditSubCategory from "../components/modules/subcategory/EditSubCategory";
import BrandList from "../components/modules/brand/BrandList";
import AddBrand from "../components/modules/brand/AddBrand";
import EditBrand from "../components/modules/brand/EditBrand";
import ShopList from "../components/modules/shop/ShopList";
import AddShop from "../components/modules/shop/AddShop";
import EditShop from "../components/modules/shop/EditShop";
import SuppilerList from "../components/modules/suppliers/SupplierList";
import AddSupplier from "../components/modules/suppliers/AddSupplier";
import EditSupplier from "../components/modules/suppliers/EditSupplier";
import ProductAttributes from "../components/modules/productAttribute/ProductAttributes";
import AddProduct from "../components/modules/product/AddProduct";
import AddProductPhoto from "../components/modules/product/AddProductPhoto";
import ProductList from "../components/modules/product/ProductList";
import SalesManagerList from "../components/modules/sales-manager/SalesManagerList";
import AddSalesManager from "../components/modules/sales-manager/AddSalesManager";
import EditSalesManager from "../components/modules/sales-manager/EditSalesManager";
import OrderList from "../components/modules/order/OrderList";
import NewOrder from "../components/modules/order/NewOrder";
import OrderDetails from "../components/modules/order/OrderDetails";
import BarCode from "../components/modules/barcode/BarCode";
import Report from "../components/modules/report/Report";


const MyRoute  = createBrowserRouter([
    {path:'/', element: <Master/>,
     children : [
        {path:'/', element: <Report/>},
        {path:'order', element: <OrderList/>},
        {path:'order/create', element: <NewOrder/>},
        {path:'order/:id', element: <OrderDetails/>},
        {path:'product', element: <ProductList/>},
        {path:'product/create', element: <AddProduct/>},
        {path:'product/photo/:id', element: <AddProductPhoto/>},
        {path:'category', element: <CategoryList/>},
        {path:'category/create', element: <AddCategory/>},
        {path:'category/edit/:id', element: <EditCategory/>},
        {path:'sub_category', element: <SubCategoryList/>},
        {path:'sub_category/create', element: <AddSubCategory/>},
        {path:'sub_category/edit/:id', element: <EditSubCategory/>},
        {path:'brand', element: <BrandList/>},
        {path:'brand/create', element: <AddBrand/>},
        {path:'brand/edit/:id', element: <EditBrand/>},
        {path:'supplier', element: <SuppilerList/>},
        {path:'supplier/create', element: <AddSupplier/>},
        {path:'supplier/edit/:id', element: <EditSupplier/>},
        {path:'shop', element: <ShopList/>},
        {path:'shop/create', element: <AddShop/>},
        {path:'shop/edit/:id', element: <EditShop/>},
        {path:'sales-manager', element: <SalesManagerList/>},
        {path:'sales-manager/create', element: <AddSalesManager/>},
        {path:'sales-manager/edit/:id', element: <EditSalesManager/>},
        {path:'product-attributes', element: <ProductAttributes/>},
        {path:'bar-code', element: <BarCode/>},
        {path:'error-500', element: <Error500/>},
        {path:'/error-404', element: <Error404/>},
        {path:'/reports', element: <Report/>},
     ]}

]); 

export default MyRoute;