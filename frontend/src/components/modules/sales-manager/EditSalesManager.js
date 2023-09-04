import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaList } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2'
import Constants from '../../../Constants';
import Form from 'react-bootstrap/Form';
import CardHeader from '../../partials/minipartials/CardHeader';

const EditSalesManager = () => {

    const navigate = useNavigate();
    const params = useParams()
    const [input, SetInput] = useState([]) //Single Data
    const [errors, setErrors] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [divisions, setDivisions] = useState([])
    const [districts, setDistricts] = useState([])
    const [areas, setAreas] = useState([])
    const [shops,setShops] = useState([])

    const handleChange = (e) => {
        if (e.target.name == 'division_id') {
            setDistricts([])
            setAreas([])
            let division_id = parseInt(e.target.value)
            if (!isNaN(division_id)) getDistricts(division_id)

        }
        else if (e.target.name == 'district_id') {
            setAreas([])
            let district_id = parseInt(e.target.value)
            if (!isNaN(district_id)) getAreas(district_id)
        }
        SetInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    // Photo Take
    const handlePhoto = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = () => {
            SetInput(prevState => ({ ...prevState, [e.target.name]: reader.result }))
        }
        reader.readAsDataURL(file)
    }
    // Photo Take

    const getData = () => {
        axios.get(`${Constants.BASE_URL}/sales_manager/${params.id}`).then(res => {
            SetInput(res.data.data)
            getDistricts(res.data.data.division_id)
            getAreas(res.data.data.district_id)
        })
    }


    const getDivisions = () => {
        axios.get(`${Constants.BASE_URL}/division_info`).then(res => {
            setDivisions(res.data)
        })
    }

    const getDistricts = (division_id) => {
        axios.get(`${Constants.BASE_URL}/district_info/${division_id}`).then(res => {
            setDistricts(res.data)
        })
    }

    const getAreas = (district_id) => {
        axios.get(`${Constants.BASE_URL}/area_info/${district_id}`).then(res => {
            setAreas(res.data)
        })
    }

    const getShops = () => {
        axios.get(`${Constants.BASE_URL}/shop_info`).then(res => {
            setShops(res.data)
        })
    }



    useEffect(() => {
        getData()
        getShops()
        getDivisions()
    }, [])




    const handleSubmit = () => {
        setIsLoading(true)
        axios.put(`${Constants.BASE_URL}/sales_manager/${params.id}`, input).then(res => {

            setIsLoading(false)
            Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
            })
            if (res.data.flag == undefined) {
                navigate('/sales-manager');
            }

        }).catch(errors => {
            if (errors.response.status === 422) {
                setErrors(errors.response.data.errors)
                setIsLoading(false)
            }
        })

    }



    return (
        <div>
        <BreadCrumb title={`Edit Sales Manager`} />

        <div className="row my-4">
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-header'>
                        <CardHeader title={'Edit Sales Manager'} button_text={'List'} icon={<FaList />} link={'/sales-manager'} />
                    </div>
                    <div className='card-body'>

                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h5>Sales Manager Details</h5>
                                    </div>
                                    <div className='card-body'>

                                    <label className='w-100 mt-2'>
                                    <p>Select Shop</p>
                                    <select className={errors.shop_id !== undefined ? 'is-invalid form-select col-md-5' : 'form-select col-md-5'} name='shop_id' value={input.shop_id} onChange={handleChange} >
                                        <option value=''>Select Shop</option>
                                        {shops.map((shop,index)=>(
                                            <option key={index} value={shop.id}>{shop.name}</option>
                                            ))}
                                        </select>
                                    <p className='login-error-msg'><small>{errors.shop_id !== undefined ? errors.shop_id[0] : null}</small></p>
                                </label>
                                
                                        <label className='w-100'>
                                            <p>Name</p>
                                            <input className={errors.name !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='name' value={input.name} onChange={handleChange} placeholder='Enter Name' />
                                            <p className='login-error-msg'><small>{errors.name !== undefined ? errors.name[0] : null}</small></p>
                                        </label>

                                        <label className='w-100 mt-2'>
                                            <p>Phone</p>
                                            <input className={errors.phone !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='phone' value={input.phone} onChange={handleChange} placeholder='Enter Phone Number' />
                                            <p className='login-error-msg'><small>{errors.phone !== undefined ? errors.phone[0] : null}</small></p>
                                        </label>

                                        <label className='w-100 mt-2'>
                                            <p>Email Address</p>
                                            <input className={errors.email !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='email' type='email' value={input.email} onChange={handleChange} placeholder='Enter Email Address' />
                                            <p className='login-error-msg'><small>{errors.email !== undefined ? errors.email[0] : null}</small></p>
                                        </label>


                                        <label className='w-100 mt-2'>
                                            <p>NID / Passport / Driving License Number</p>
                                            <input className={errors.nid !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='nid' type='text' value={input.nid} onChange={handleChange} placeholder='Enter Document Number' />
                                            <p className='login-error-msg'><small>{errors.nid !== undefined ? errors.nid[0] : null}</small></p>
                                        </label>
                                        <label className='w-100 mt-2'>
                                            <p>Status</p>
                                            <select
                                                className={errors.status !== undefined ? 'is-invalid form-select col-md-5' : 'form-select col-md-5'} name='status' value={input.status} onChange={handleChange}>
                                                <option value='1'>Active</option>
                                                <option value='0'>Inactive</option>
                                            </select>
                                            <p className='login-error-msg'><small>{errors.status !== undefined ? errors.status[0] : null}</small></p>
                                        </label>

                                        <label className='w-100 mt-2'>
                                            <p>Bio</p>
                                            <textarea className={errors.description !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='description' value={input.description} onChange={handleChange} placeholder='Enter Bio'>
                                            </textarea>
                                            <p className='login-error-msg'><small>{errors.description !== undefined ? errors.description[0] : null}</small></p>
                                        </label>

                                       

                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h5>Sales Manager Address</h5>
                                    </div>
                                    <div className='card-body'>
                                        <label className='w-100'>
                                            <p>Address <small>(House/Road/Village/Ward)</small></p>
                                            <input className={errors.address !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='address' value={input.address} onChange={handleChange} placeholder='Enter Street Address' />
                                            <p className='login-error-msg'><small>{errors.address !== undefined ? errors.address[0] : null}</small></p>
                                        </label>

                                        <label className='w-100 mt-2'>
                                            <p>Select Division</p>
                                            <Form.Select
                                                className={errors.division_id !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='division_id' value={input.division_id} onChange={handleChange}>
                                                <option value={''}>Select Division</option>
                                                {divisions.map((division, index) => (
                                                    <option key={index} value={division.id}>{division.name}</option>
                                                ))}
                                            </Form.Select>
                                            <p className='login-error-msg'><small>{errors.division_id !== undefined ? errors.division_id[0] : null}</small></p>
                                        </label>

                                        <label className='w-100 mt-2'>
                                            <p>Select City</p>
                                            <Form.Select
                                                className={errors.district_id !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='district_id'
                                                value={input.district_id} onChange={handleChange} disabled={Object.keys(districts).length < 1}>

                                                <option value={''}>Select City</option>
                                                {districts.map((district, index) => (
                                                    <option key={index} value={district.id}>{district.name}</option>
                                                ))}
                                            </Form.Select>
                                            <p className='login-error-msg'><small>{errors.district_id !== undefined ? errors.district_id[0] : null}</small></p>
                                        </label>

                                        <label className='w-100 mt-2'>
                                            <p>Select Area</p>
                                            <Form.Select
                                                className={errors.area_id !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='area_id'
                                                value={input.area_id} onChange={handleChange} disabled={Object.keys(areas).length < 1}>
                                                <option value={''}>Select Area</option>
                                                {areas.map((area, index) => (
                                                    <option key={index} value={area.id}>{area.name}</option>
                                                ))}
                                            </Form.Select>
                                            <p className='login-error-msg'><small>{errors.area_id !== undefined ? errors.area_id[0] : null}</small></p>
                                        </label>

                                        <label className='w-100 mt-2'>
                                            <p>Land Mark</p>
                                            <input className={errors.landmark !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='landmark' value={input.landmark} onChange={handleChange} placeholder='Enter Land Mark' />
                                            <p className='login-error-msg'><small>{errors.landmark !== undefined ? errors.landmark[0] : null}</small></p>
                                        </label>

                                    </div>
                                </div>

                                <div className='card mt-4'>
                                    <div className='card-header'>
                                        <h5>Photo Section</h5>
                                    </div>
                                    <div className='card-body'>
                                    <label className='w-100 mt-2'>
                                            <p>Photo</p>
                                            <input className={errors.photo !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} type='file' name='photo' onChange={handlePhoto} />
                                            <p className='login-error-msg'><small>{errors.photo !== undefined ? errors.photo[0] : null}</small></p>
                                        </label>
                                        {input.photo !== undefined  || input.photo_full !== undefined ?
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='photo-preview mt-3'>
                                                    <img alt='Image Preview' src={input.photo == undefined ? input.photo_full : input.photo} className='img-thumbnail aspect-one' />
                                                </div>
                                            </div>
                                        </div>
                                        : null}

                                        <label className='w-100 mt-2'>
                                            <p>NID / Passport / Driving License</p>
                                            <input className={errors.nid_photo !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} type='file' name='nid_photo' onChange={handlePhoto} />
                                            <p className='login-error-msg'><small>{errors.nid_photo !== undefined ? errors.nid_photo[0] : null}</small></p>
                                        </label>
                                        {input.nid_photo !== undefined  || input.nid_photo_full !== undefined ?
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='photo-preview mt-3'>
                                                    <img alt='Image Preview' src={input.nid_photo == undefined ? input.nid_photo_full : input.nid_photo} className='img-thumbnail aspect-one' />
                                                </div>
                                            </div>
                                        </div>
                                        : null}


                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="col-md-12">
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="d-grid mt-4">
                                            <button className={'btn btn-success'} onClick={handleSubmit}
                                                    dangerouslySetInnerHTML={{__html: isloading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : 'Update Sales Manager'}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
};

export default EditSalesManager;