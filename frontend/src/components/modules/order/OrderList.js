import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import CardHeader from '../../partials/minipartials/CardHeader';
import { BsPlusCircleFill } from 'react-icons/bs';
import axios from 'axios';
import Constants from '../../../Constants';
import CategoryPhoto from '../../partials/modals/CategoryPhoto';
import Pagination from "react-js-pagination";
import { FaEdit, FaEye, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CategoryView from '../../partials/modals/CategoryView';
import Loader from '../../partials/minipartials/Loader';
import NoDataFound from '../../partials/minipartials/NoDataFound';
import GlobalFunction from '../../../GlobalFunction'

const OrderList = () => {

    const [input, SetInput] = useState({search:'',order_by:'id',per_page:'10',direction:'desc'})

    const [isloading, setIsLoading] = useState(false)

    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [modalPhotoShow, setModalPhotoShow] = useState(false)
    const [modalPhoto, setModalPhoto] = useState([])


    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startForm, setStartForm] = useState(1)
    const [activePage, setActivePage] = useState(1)
    const [productColumn,setProductColumn] = useState([])

    const getColumns = () =>{
        
    }


    const handleInput = (e) => {
        SetInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const getOrders = (pageNumber) => {
        setIsLoading(true)
        axios.get(`${Constants.BASE_URL}/order?page=${pageNumber}&order_by=${input.order_by}&search=${input.search}&per_page=${input.per_page}&dirrection=${input.direction}`).then(res => {
            setOrders(res.data.data);
            setItemsCountPerPage(res.data.meta.per_page)
            setTotalItemsCount(res.data.meta.total)
            setStartForm(res.data.meta.from)
            setActivePage(res.data.meta.current_page)
            setIsLoading(false)
        })

    }

    const handleModal = (photo) => {
        setModalPhotoShow(true)
        setModalPhoto(photo)
    }

    const handleView = (category) =>{
        setModalShow(true)
        setOrder(category)
    }



    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div>
            <BreadCrumb title={`Order List`} />

            <div className="row">
                <div className='col-md-12'>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <CardHeader title={'Order List'} button_text={'Add New'} icon={<BsPlusCircleFill />} link={'/order/create'} />
                        </div>
                        <div className='card-body'>
                            <div className='search-area mb-4'>
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <label>Search</label>
                                        <input className='form-control form-control-sm' name='search' value={input.search} placeholder='Search...' onChange={handleInput} />
                                    </div>
                                    <div className='col-md-3'>
                                        <label>Order By</label>
                                        <select className='form-select form-select-sm' name='order_by' value={input.order_by} onChange={handleInput}>
                                            <option value='name'>Name</option>
                                            <option value='serial'>Serial</option>
                                            <option value='status'>Status</option>
                                            <option value='created_at'>Created_at</option>
                                            <option value='updated_at'>Updated_at</option>
                                        </select>
                                    </div>
                                    <div className='col-md-2'>
                                        <label>Order Direction</label>
                                        <select className='form-select form-select-sm' name='direction' value={input.direction} onChange={handleInput}>
                                            <option value='asc'>ASC</option>
                                            <option value='desc'>DESC</option>
                                        </select>
                                    </div>
                                    <div className='col-md-2'>
                                        <label>Per Page</label>
                                        <select className='form-select form-select-sm' name='per_page' value={input.per_page} onChange={handleInput}>
                                            <option value='5'>5</option>
                                            <option value='10'>10</option>
                                            <option value='15'>15</option>
                                            <option value='25'>25</option>
                                            <option value='50'>50</option>
                                            <option value='100'>100</option>
                                        </select>
                                    </div>

                                    <div className='col-md-2'>
                                    <div className='d-grid mt-3'>
                                    <button onClick={()=>getOrders(1)} className='btn btn-sm btn-primary'><FaSearch/> Search </button>
                                    </div>
                                    </div>
                                </div>

                            </div>

                            {isloading  ? <Loader/> :
                            <div className='table-responsive'>
                            <table className='my-table table table-hover table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Order</th>
                                        <th>Shop Details</th>
                                        <th>Customer</th>
                                        <th>Amount</th>
                                        <th>Sales & Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(orders).length>0 ? orders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{startForm + index}</td>
                                            <td>
                                                <p className='fw-bold'>Order No:{order.order_number}</p>
                                                <p className='text-info'>Order Status:{order.order_status_text}</p>
                                                <p>Payment Status:{order.payment_status}</p>
                                                </td>
                                            <td>
                                                <p className='text-info'><strong>{order.shop}</strong></p>
                                                <p className='text-info'>{order.sales_manager}</p>
                                            </td>
                                            <td>
                                                <p className='text-info'>{order.customer_name}</p>
                                                <p className='text-warning'>{order.customer_phone}</p>
                                            </td>
                                            <td>
                                                <p>Quantity: {order.quantity}</p>
                                                <p className='text-warning'>Sub Total:{GlobalFunction.formatPrice(order.sub_total)}</p>
                                                <p>Discount:{GlobalFunction.formatPrice(order.discount)}</p>
                                                <p className='text-warning'>Total:{GlobalFunction.formatPrice(order.total)}</p>
                                                <p>Due:{GlobalFunction.formatPrice(order.due_amount)}</p>
                                                <p className='text-warning'>Paid:{GlobalFunction.formatPrice(order.paid_amount)}</p>
                                            </td>
                                            <td>
                                                <p className='text-black'>Order Created : {order.created_at}</p>
                                                <p className='text-black'>Order Updated : {order.updated_at}</p>
                                            </td>
                                            
                                            <td>
                                                <Link to={`/order/${order.id}`} className='btn btn-sm btn-info my-1'><FaEye/></Link>
                                                {/* <Link to={`edit/${order.id}`}><button className='btn btn-sm btn-warning mx-1 my-1'><FaEdit/></button></Link> */}
                                                
                                            </td>
                                        </tr>
                                    )) : <NoDataFound/>}

                                </tbody>
                            </table>
                            <CategoryPhoto show={modalPhotoShow} size='' photo={modalPhoto} title='Category Photo' onHide={() => setModalPhotoShow(false)} />
                            <CategoryView show={modalShow} size='' category={order}  title='Category Details' onHide={() => setModalShow(false)} />
                        </div>
                            }
                            
                        </div>
                        <div className='card-footer'>
                            <nav className='pagination-sm'>
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed='5'
                                    onChange={getOrders}
                                    nextPageText='Next'
                                    prevPageText='Previous'
                                    firstPageText='First'
                                    lastPageText='Last'
                                    itemClass='page-item'
                                    linkClass='page-link'
                                />
                            </nav>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderList;