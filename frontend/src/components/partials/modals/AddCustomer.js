import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Swal from 'sweetalert2'
import Constants from '../../../Constants';


const AddCustomer = ({setModalShow, ...props}) => {

    const [input, SetInput] = useState({})
    const [errors, setErrors] = useState([])
    const [isloading, setIsLoading] = useState(false)


    const handleInput = (e) => {
        SetInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        setIsLoading(true)
        axios.post(`${Constants.BASE_URL}/customer`, input).then(res => {
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
            SetInput([])


        }).catch(errors => {
            if (errors.response.status === 422) {
                setErrors(errors.response.data.errors)
                setIsLoading(false)
            }
        })

    }

    return (
        <Modal
            {...props}
            size={props.size} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label className='w-100'>
                    <p>Name</p>
                    <input className={errors.name !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='name' value={input.name} onChange={handleInput} placeholder='Enter Name' />
                    <p className='login-error-msg'><small>{errors.name !== undefined ? errors.name[0] : null}</small></p>
                </label>

                <label className='w-100 mt-2'>
                    <p>Email</p>
                    <input className={errors.email !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='email' type='email'
                        value={input.email} onChange={handleInput} placeholder='Enter Email Adddress' />
                    <p className='login-error-msg'><small>{errors.email !== undefined ? errors.email[0] : null}</small></p>
                </label>

                <label className='w-100'>
                    <p>Phone</p>
                    <input className={errors.phone !== undefined ? 'is-invalid form-control col-md-5' : 'form-control col-md-5'} name='phone' type='number'
                        value={input.phone} onChange={handleInput} placeholder='Enter Phone Number' />
                    <p className='login-error-msg'><small>{errors.phone !== undefined ? errors.phone[0] : null}</small></p>
                </label>

                <div className="col-md-12">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="d-grid mt-4">
                                <button className={'btn btn-success'} onClick={handleSubmit}
                                    dangerouslySetInnerHTML={{ __html: isloading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : 'Save' }} />
                            </div>
                        </div>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    );
};

export default AddCustomer;