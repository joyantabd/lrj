import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaList } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2'
import Constants from '../../../Constants';
import CardHeader from '../../partials/minipartials/CardHeader';

const EditSubCategory = () => {

    const navigate = useNavigate();
    const params = useParams()
    const [input, SetInput] = useState({status:1})
    const [errors, setErrors] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [categories,setCategories] = useState([])

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            let slug = e.target.value
            slug = slug.toLowerCase()
            slug = slug.replaceAll(' ', '-')
            SetInput(prevState => ({ ...prevState, slug: slug }))
        }
        SetInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }


    const handlePhoto = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = () => {
        SetInput(prevState => ({...prevState, photo: reader.result}))
        }
        reader.readAsDataURL(file)
    }


    const getCategory = () =>{
        axios.get(`${Constants.BASE_URL}/sub_category/${params.id}`).then(res => {
            SetInput(res.data.data)
        })
    }

    const getCategories = () =>{
        axios.get(`${Constants.BASE_URL}/category_info`).then(res => {
            setCategories(res.data)
        })
    }

    useEffect(()=>{
        getCategory()
        getCategories()
    },[])

    const handleSubmit = () =>{
        setIsLoading(true)
        axios.put(`${Constants.BASE_URL}/sub_category/${params.id}`, input).then(res => {

            setIsLoading(false)
            Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
            })
            navigate('/sub_category');

        }).catch(errors => {
            if (errors.response.status === 422) {
                setErrors(errors.response.data.errors)
                setIsLoading(false)
            }
        })
    }

    return (
        <div>
            <BreadCrumb title={`Edit Category`} />

            <div className="row my-3">
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header'>
                           <CardHeader title={'Edit Category'} button_text={'List'} icon={<FaList/>} link={'/sub_category'}/>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                            <div className='col-md-6'>
                                    <label className='w-100 mt-2'>
                                        <p>Select Category</p>
                                        <select className={errors.category_id !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='category_id' value={input.category_id} onChange={handleChange} >
                                            <option value=''>Select Category</option>
                                            {categories.map((category,index)=>(
                                                <option key={index} value={category.id}>{category.name}</option>
                                                ))}
                                            </select>
                                        <p className='login-error-msg'><small>{errors.category_id !== undefined ? errors.category_id[0] : null}</small></p>
                                    </label>
                                </div>

                                <div className='col-md-6'>
                                    <label className='w-100 mt-2'>
                                        <p>Name</p>
                                        <input className={errors.name !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='name' value={input.name} onChange={handleChange} />
                                        <p className='login-error-msg'><small>{errors.name !== undefined ? errors.name[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <label className='w-100 mt-2'>
                                        <p>Slug</p>
                                        <input className={errors.slug !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='slug' value={input.slug} onChange={handleChange} />
                                        <p className='login-error-msg'><small>{errors.slug !== undefined ? errors.slug[0] : null}</small></p>
                                    </label>
                                </div>

                                <div className='col-md-6'>
                                    <label className='w-100 mt-2'>
                                        <p>Product Code</p>
                                        <input className={errors.serial !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} type='number' name='serial' value={input.serial} onChange={handleChange} />
                                        <p className='login-error-msg'><small>{errors.serial !== undefined ? errors.serial[0] : null}</small></p>
                                    </label>
                                </div>

                                <div className='col-md-6'>
                                    <label className='w-100 mt-2'>
                                        <p>Status</p>
                                        <select
                                            className={errors.status !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='status' value={input.status} onChange={handleChange}>
                                            <option value={1}>Active</option>
                                            <option value={0}>Inactive</option>
                                        </select>
                                        <p className='login-error-msg'><small>{errors.status !== undefined ? errors.status[0] : null}</small></p>
                                    </label>
                                </div>

                                <div className='col-md-6'>
                                    <label className='w-100 mt-2'>
                                        <p>Description</p>
                                        <textarea className={errors.description !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='description' value={input.description} onChange={handleChange}>
                                        </textarea>
                                        <p className='login-error-msg'><small>{errors.description !== undefined ? errors.description[0] : null}</small></p>
                                    </label>
                                </div>

                                <div className='col-md-6'>
                                    <label className='w-100 mt-2'>
                                        <p>Photo</p>
                                        <input className={errors.photo !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} type='file' name='photo' onChange={handlePhoto} />
                                        <p className='login-error-msg'><small>{errors.photo !== undefined ? errors.photo[0] : null}</small></p>
                                    </label>
                                    {input.photo !== undefined  || input.photo_preview !== undefined ?
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='photo-preview mt-3'>
                                                    <img alt='Image Preview' src={input.photo == undefined ? input.photo_preview : input.photo} className='img-thumbnail aspect-one' />
                                                </div>
                                            </div>
                                        </div>
                                        : null}

                                </div>
                                <div className='col-md-6'>
                                    <div className='row justify-content-center'>
                                        <div className='d-grid mt-4'>
                                            <button onClick={handleSubmit} className='btn btn-primary' dangerouslySetInnerHTML={{ __html: isloading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : 'Update' }}></button>

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

export default EditSubCategory;