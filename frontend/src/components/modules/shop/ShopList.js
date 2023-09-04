import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import CardHeader from '../../partials/minipartials/CardHeader';
import { BsPlusCircleFill } from 'react-icons/bs';
import axios from 'axios';
import Swal from 'sweetalert2'
import Constants from '../../../Constants';
import CategoryPhoto from '../../partials/modals/CategoryPhoto';
import Pagination from "react-js-pagination";
import { FaEdit, FaEye, FaSearch, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SupplierView from '../../partials/modals/SupplierView';
import Loader from '../../partials/minipartials/Loader';
import NoDataFound from '../../partials/minipartials/NoDataFound';
import PhotoPreview from '../../partials/modals/PhotoPreview';

const ShopList = () => {

    const [input, SetInput] = useState({search:'',order_by:'id',per_page:'10',direction:'asc'})

    const [isloading, setIsLoading] = useState(false)

    const [datas, setdatas] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [modalPhotoShow, setModalPhotoShow] = useState(false)
    const [modalPhoto, setModalPhoto] = useState([])
    const [shop, setShop] = useState([])

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startForm, setStartForm] = useState(1)
    const [activePage, setActivePage] = useState(1)

    const handleInput = (e) => {
        SetInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const getShops = (pageNumber) => {
        setIsLoading(true)
        axios.get(`${Constants.BASE_URL}/shop?page=${pageNumber}&order_by=${input.order_by}&search=${input.search}&per_page=${input.per_page}&dirrection=${input.direction}`).then(res => {
            setdatas(res.data.data);
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

    const handleView = (data) =>{
        setModalShow(true)
        setShop(data)
    }

    const handleDelete = (id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Data will be Deleted !!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Constants.BASE_URL}/shop/${id}`).then(res=>{
                    Swal.fire({
                        position: 'top-end',
                        icon: res.data.cls,
                        title: res.data.msg,
                        showConfirmButton: false,
                        toast: true,
                        timer: 1500
                    })
                    getShops()

                })
            }

          })
       
    }


    useEffect(() => {
        getShops()
    }, [])


    return (
        <div>
            <BreadCrumb title={`Shop List`} />

            <div className="row">
                <div className='col-md-12'>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <CardHeader title={'Shop List'} button_text={'Add New'} icon={<BsPlusCircleFill />} link={'/shop/create'} />
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
                                    <button onClick={()=>getShops(1)} className='btn btn-sm btn-primary'><FaSearch/> Search </button>
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
                                        <th>Shop Name</th>
                                        <th>Email / Phone</th>
                                        <th>Status</th>
                                        <th>Photo</th>
                                        <th>Created By</th>
                                        <th>Date Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(datas).length>0 ? datas.map((data, index) => (
                                        <tr key={index}>
                                            <td>{startForm + index}</td>
                                            <td>{data.name}</td>
                                            <td>
                                                <p className='text-warning'>Email: {data.email}</p>
                                                <p className='text-success'>Phone: {data.phone}</p>
                                                </td>
                                            <td><p className='text-danger'>{data.status}</p></td>
                                            <td><img onClick={() => handleModal(data.photo_full)} src={data.photo} className='img-thumbnail table-image' alt={data.name} /></td>
                                            <td>{data.created_by}</td>
                                            <td>
                                                <p>Created: {data.created_at}</p>
                                                <p>Updated: {data.updated_at}</p>
                                            </td>
                                            <td>
                                                <button onClick={() => handleView(data)} className='btn btn-sm btn-info my-1'><FaEye/></button>
                                                <Link to={`edit/${data.id}`}><button className='btn btn-sm btn-warning mx-1 my-1'><FaEdit/></button></Link>
                                                <button onClick={()=>handleDelete(data.id)} className='btn btn-sm btn-danger my-1'><FaTrash/></button>
                                            </td>
                                        </tr>
                                    )) : <NoDataFound/>}

                                </tbody>
                            </table>
                            <PhotoPreview show={modalPhotoShow} size='' photo={modalPhoto} title='Shop Photo' onHide={() => setModalPhotoShow(false)} />
                            <SupplierView show={modalShow} size='' data={shop}  title='Shop Details' onHide={() => setModalShow(false)} />
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
                                    onChange={getShops}
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

export default ShopList;