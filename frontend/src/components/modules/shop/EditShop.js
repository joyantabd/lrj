import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaList } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2'
import Constants from '../../../Constants';
import CardHeader from '../../partials/minipartials/CardHeader';

const EditShop = () => {

    const navigate = useNavigate();
    const params = useParams()
    const [input, SetInput] = useState([]) //Single Data
    const [errors, setErrors] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [divisions, setDivisions] = useState([])
    const [districts, setDistricts] = useState([])
    const [areas, setAreas] = useState([])

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
            SetInput(prevState => ({ ...prevState, photo: reader.result }))
        }
        reader.readAsDataURL(file)
    }
    // Photo Take

    const getShop = () => {
        axios.get(`${Constants.BASE_URL}/shop/${params.id}`).then(res => {
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



    useEffect(() => {
        getShop()
        getDivisions()
    }, [])




    const handleSubmit = () => {
        setIsLoading(true)
        axios.put(`${Constants.BASE_URL}/shop/${params.id}`, input).then(res => {

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
                navigate('/shop');
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
            <BreadCrumb title={`Update Shop`} />

            <div className="row my-3">
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header'>
                            <CardHeader title={'Update Shop'} button_text={'List'} icon={<FaList />} link={'/shop'} />
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <h5>Shop Details</h5>
                                        </div>
                                        <div className='card-body'>
                                            <label className='w-100'>
                                                <p>Shop Name</p>
                                                <input className={errors.name !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='name' value={input.name} onChange={handleChange} />
                                                <p className='login-error-msg'><small>{errors.name !== undefined ? errors.name[0] : null}</small></p>
                                            </label>

                                            <label className='w-100 mt-2'>
                                                <p>Phone</p>
                                                <input className={errors.phone !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='phone' value={input.phone} onChange={handleChange} />
                                                <p className='login-error-msg'><small>{errors.phone !== undefined ? errors.phone[0] : null}</small></p>
                                            </label>

                                            <label className='w-100 mt-2'>
                                                <p>Email Address</p>
                                                <input className={errors.email !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='email' type='email' value={input.email} onChange={handleChange} />
                                                <p className='login-error-msg'><small>{errors.email !== undefined ? errors.email[0] : null}</small></p>
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

                                            <label className='w-100 mt-2'>
                                                <p>Details</p>
                                                <textarea className={errors.description !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='description' value={input.description} onChange={handleChange}>
                                                </textarea>
                                                <p className='login-error-msg'><small>{errors.description !== undefined ? errors.description[0] : null}</small></p>
                                            </label>

                                                <label className='w-100 mt-2'>
                                                    <p>Photo</p>
                                                    <input className={errors.photo !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} type='file' name='photo' onChange={handlePhoto} />
                                                    <p className='login-error-msg'><small>{errors.photo !== undefined ? errors.photo[0] : null}</small></p>
                                                </label>
                                                {input.photo !== undefined || input.photo_preview !== undefined ?
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <div className='photo-preview mt-3'>
                                                                <img alt='Image Preview' src={input.photo == undefined ? input.photo_preview : input.photo} className='img-thumbnail aspect-one' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : null}

                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <h5>Shop Address</h5>
                                        </div>
                                        <div className='card-body'>
                                            <label className='w-100'>
                                                <p>Address <small>(House/Road/Village/Ward)</small></p>
                                                <input className={errors.address !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='address' value={input.address} onChange={handleChange} />
                                                <p className='login-error-msg'><small>{errors.address !== undefined ? errors.address[0] : null}</small></p>
                                            </label>

                                            <label className='w-100 mt-2'>
                                                <p>Select Division</p>
                                                <select
                                                    className={errors.division_id !== undefined ? 'is-invalid form-select col-md-5' : 'form-select col-md-5'} name='division_id' value={input.division_id} onChange={handleChange}>
                                                    <option value={''}>Select Division</option>
                                                    {divisions.map((division, index) => (
                                                        <option key={index} value={division.id}>{division.name}</option>
                                                    ))}
                                                </select>
                                                <p className='login-error-msg'><small>{errors.division_id !== undefined ? errors.division_id[0] : null}</small></p>
                                            </label>

                                            <label className='w-100 mt-2'>
                                                <p>Select City</p>
                                                <select
                                                    className={errors.district_id !== undefined ? 'is-invalid form-select col-md-5' : 'form-select col-md-5'} name='district_id'
                                                    value={input.district_id} onChange={handleChange} disabled={Object.keys(districts).length < 1}>

                                                    <option value={''}>Select City</option>
                                                    {districts.map((district, index) => (
                                                        <option key={index} value={district.id}>{district.name}</option>
                                                    ))}
                                                </select>
                                                <p className='login-error-msg'><small>{errors.district_id !== undefined ? errors.district_id[0] : null}</small></p>
                                            </label>

                                            <label className='w-100 mt-2'>
                                                <p>Select Area</p>
                                                <select
                                                    className={errors.area_id !== undefined ? 'is-invalid form-select col-md-5' : 'form-select col-md-5'} name='area_id'
                                                    value={input.area_id} onChange={handleChange} disabled={Object.keys(areas).length < 1}>
                                                    <option value={''}>Select Area</option>
                                                    {areas.map((area, index) => (
                                                        <option key={index} value={area.id}>{area.name}</option>
                                                    ))}
                                                </select>
                                                <p className='login-error-msg'><small>{errors.area_id !== undefined ? errors.area_id[0] : null}</small></p>
                                            </label>

                                            <label className='w-100 mt-2'>
                                                <p>Land Mark</p>
                                                <input className={errors.landmark !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='landmark' value={input.landmark} onChange={handleChange} />
                                                <p className='login-error-msg'><small>{errors.landmark !== undefined ? errors.landmark[0] : null}</small></p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='row justify-content-center'>
                                        <div className='d-grid mt-4'>
                                            <button onClick={handleSubmit} className='btn btn-primary' dangerouslySetInnerHTML={{ __html: isloading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading' : 'Update' }}></button>
                                        </div>
                                    </div>

                                </div>

                            </div>


                        </div>  {/* Card Body */}

                    </div>

                </div>

            </div>

        </div>

    );
};
export default EditShop;