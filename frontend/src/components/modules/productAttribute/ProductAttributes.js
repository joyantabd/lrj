import React, { useEffect, useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import BreadCrumb from '../../partials/BreadCrumb';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import Constants from '../../../Constants';
import Loader from '../../partials/minipartials/Loader';
import NoDataFound from '../../partials/minipartials/NoDataFound';
import Pagination from 'react-js-pagination';

const ProductAttributes = () => {

    const [modalShow, setModalShow] = useState(false)
    const [input, SetInput] = useState({ status: 1 })
    const [errors, setErrors] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [attributes, setAttributes] = useState([])

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startForm, setStartForm] = useState(1)
    const [activePage, setActivePage] = useState(1)

    const [modaltitle, setModalTitle] = useState('Add')
    const [valuemodaltitle, setValueModalTitle] = useState('Add')
    const [valuemodalShow, setValueModalShow] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const [modalvalue, setModalValue] = useState([])
    const [modalvalueshow, setModalValueShow] = useState(false)

    const handleChange = (e) => SetInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))

    const handleSubmit = (e) => {
        setIsLoading(true)
        axios.post(`${Constants.BASE_URL}/attribute`, input).then(res => {
            setIsLoading(false)
            Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
            })

            setModalShow(false)
            setErrors([])
            SetInput({ status: 1 })
            getAttributes()
            setIsLoading(false)
        }).catch(errors => {
            if (errors.response.status === 422) {
                setErrors(errors.response.data.errors)
                setIsLoading(false)
            }
        })

    }

    const handleEdit = (id) => {
        setIsLoading(true)
        axios.put(`${Constants.BASE_URL}/attribute/${id}`, input).then(res => {
            setIsLoading(false)
            Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
            })

            setModalShow(false)
            setErrors([])
            SetInput({ status: 1 })
            getAttributes()
            setIsLoading(false)
        }).catch(errors => {
            if (errors.response.status === 422) {
                setErrors(errors.response.data.errors)
                setIsLoading(false)
            }
        })

    }

    const handleModal = (data = undefined) => {
        SetInput({ status: 1 })
        if (data != undefined) {
            setModalTitle('Update')
            setIsEdit(true)
            SetInput({ status: data.original_status, name: data.name, id: data.id })
        } else {
            setIsEdit(false)
            setModalTitle('Add')
        }
        setModalShow(true)
        setErrors([])
    }

    const handleValue = (id) => {
        setValueModalShow(true)
        setValueModalTitle('Add')
        SetInput({ status: 1, attribute_id: id })
    }


    const getAttributes = () => {
        setIsLoading(true)
        axios.get(`${Constants.BASE_URL}/attribute`).then(res => {
            setAttributes(res.data.data);
            setIsLoading(false)
            setItemsCountPerPage(res.data.meta.per_page)
            setTotalItemsCount(res.data.meta.total)
            setStartForm(res.data.meta.from)
            setActivePage(res.data.meta.current_page)
        })

    }

    const handleDelete = (id) => {
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
                axios.delete(`${Constants.BASE_URL}/attribute/${id}`).then(res => {
                    Swal.fire({
                        position: 'top-end',
                        icon: res.data.cls,
                        title: res.data.msg,
                        showConfirmButton: false,
                        toast: true,
                        timer: 1500
                    })
                    getAttributes()

                })
            }

        })

    }

    const handleValueDetails = (value) => {
        setModalValue(value)
        setModalValueShow(true)
    }

    const handleValueDelete = (id) => {
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
                axios.delete(`${Constants.BASE_URL}/value/${id}`).then(res => {
                    Swal.fire({
                        position: 'top-end',
                        icon: res.data.cls,
                        title: res.data.msg,
                        showConfirmButton: false,
                        toast: true,
                        timer: 1500
                    })
                    getAttributes()

                })
            }

        })

    }

    const handleValueSubmit = () => {
        setIsLoading(true)
        axios.post(`${Constants.BASE_URL}/value`, input).then(res => {
            setIsLoading(false)
            Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
            })

            setValueModalShow(false)
            setErrors([])
            SetInput({ status: 1 })
            getAttributes()
            setIsLoading(false)
        }).catch(errors => {
            if (errors.response.status === 422) {
                setErrors(errors.response.data.errors)
                setIsLoading(false)
            }
        })
    }


    const handleValueModal = (value) => {
        setIsEdit(true)
        setValueModalShow(true)
        setValueModalTitle('Update')
        SetInput({ status: value.original_status, name: value.name, id: value.id })
    }

    const handleValueEdit = () => {

        setIsLoading(true)
        axios.put(`${Constants.BASE_URL}/value/${input.id}`, input).then(res => {
            setIsLoading(false)
            Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
            })

            setValueModalShow(false)
            setErrors([])
            SetInput({ status: 1 })
            getAttributes()
            setIsLoading(false)
        }).catch(errors => {
            if (errors.response.status === 422) {
                setErrors(errors.response.data.errors)
                setIsLoading(false)
            }
        })
    }

    useEffect(() => {
        getAttributes()
    }, [])


    return (
        <div>
            <BreadCrumb title={`Product Attributes`} />

            <div className="row">
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h4> Product Attributes</h4>
                                <button className='btn btn-success' onClick={() => handleModal()}>Add <BsPlusCircleFill /></button>
                            </div>
                        </div>
                        <div className='card-body'>
                            {isloading ? <Loader /> :
                                <div className='table-responsive'>
                                    <table className='my-table table table-hover table-striped table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>SL</th>
                                                <th>Name</th>
                                                <th>Value</th>
                                                <th>Status</th>
                                                <th>Created By</th>
                                                <th>Date Time</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(attributes).length > 0 ? attributes.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{startForm + index}</td>
                                                    <td>{data.name}</td>
                                                    <td className='text-center'>
                                                        <div className='value-container-parent'>
                                                            {data.value != undefined ? data.value.map((value, valIndex) => (
                                                                <div className='value-container'>
                                                                    <div className='value'>
                                                                    {value.name}
                                                                    </div>
                                                                    <div className='value-button'>
                                                                        <button onClick={() => handleValueDetails(value)} className='btn btn-info' ><FaEye /></button>
                                                                        <button onClick={() => handleValueModal(value)} className='btn btn-warning'><FaEdit /></button>
                                                                        <button onClick={() => handleValueDelete(value.id)} className='btn btn-danger'><FaTrash /></button>
                                                                    </div>
                                                                </div>
                                                            )) : null}
                                                        </div>
                                                        <button onClick={() => handleValue(data.id)} className='small-button'><FaPlus /></button>
                                                    </td>
                                                    <td>{data.status}</td>
                                                    <td>{data.created_by}</td>
                                                    <td>
                                                        <p className='text-warning'>Created: {data.created_at}</p>
                                                        <p className='text-danger'>Updated: {data.updated_at}</p>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => handleModal(data)} className='btn btn-sm btn-warning mx-1 my-1'><FaEdit /></button>
                                                        <button onClick={() => handleDelete(data.id)} className='btn btn-sm btn-danger my-1'><FaTrash /></button>
                                                    </td>

                                                </tr>
                                            )) : <NoDataFound />}

                                        </tbody>
                                    </table>
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
                                    onChange={getAttributes}
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

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                aria-labelledby="category_details_modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="category_details_modal">
                        {modaltitle}  Product Attribute
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className='w-100'>
                        <p>Name</p>
                        <input className={errors.name !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='name' value={input.name} onChange={handleChange} />
                        <p className='login-error-msg'><small>{errors.name !== undefined ? errors.name[0] : null}</small></p>
                    </label>

                    <label className='w-100 mt-2'>
                        <p>Status</p>
                        <select
                            className={errors.status !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='status' value={input.status} onChange={handleChange}>
                            <option value='1'>Active</option>
                            <option value='0'>Inactive</option>
                        </select>
                        <p className='login-error-msg'><small>{errors.status !== undefined ? errors.status[0] : null}</small></p>
                    </label>


                    <div className='d-grid mt-4'>
                        <button onClick={isEdit ? () => handleEdit(input.id) : handleSubmit} className='btn btn-primary' dangerouslySetInnerHTML={{ __html: isloading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading' : `${modaltitle} Attribute` }}></button>

                    </div>

                </Modal.Body>
            </Modal>

            <Modal
                show={valuemodalShow}
                onHide={() => setValueModalShow(false)}
                aria-labelledby="value-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="value-modal">
                        {valuemodaltitle}  Attribute Value
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className='w-100'>
                        <p>Name</p>
                        <input className={errors.name !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='name' value={input.name} onChange={handleChange} />
                        <p className='login-error-msg'><small>{errors.name !== undefined ? errors.name[0] : null}</small></p>
                    </label>

                    <label className='w-100 mt-2'>
                        <p>Status</p>
                        <select
                            className={errors.status !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='status' value={input.status} onChange={handleChange}>
                            <option value='1'>Active</option>
                            <option value='0'>Inactive</option>
                        </select>
                        <p className='login-error-msg'><small>{errors.status !== undefined ? errors.status[0] : null}</small></p>
                    </label>


                    <div className='d-grid mt-4'>
                        <button onClick={isEdit ? handleValueEdit : handleValueSubmit} className='btn btn-primary' dangerouslySetInnerHTML={{ __html: isloading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading' : `${valuemodaltitle} Attribute Value` }}></button>

                    </div>

                </Modal.Body>
            </Modal>

            <Modal
                show={modalvalueshow}
                onHide={() => setModalValueShow(false)}
                aria-labelledby="value-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="value-modal">
                        Value Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className='my-table table table-hover table-striped table-bordered'>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{modalvalue.id}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{modalvalue.name}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>{modalvalue.status}</td>
                            </tr>
                            <tr>
                                <th>Created By</th>
                                <td>{modalvalue.created_by}</td>
                            </tr>
                            <tr>
                                <th>Created At</th>
                                <td>{modalvalue.created_at}</td>
                            </tr>
                            <tr>
                                <th>Updated At</th>
                                <td>{modalvalue.updated_at}</td>
                            </tr>
                        </tbody>
                    </table>

                </Modal.Body>
            </Modal>
        </div>


    );
};

export default ProductAttributes;