import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import CardHeader from '../../partials/minipartials/CardHeader';
import { FaList } from 'react-icons/fa';
import { FcSwitchCamera } from 'react-icons/fc';
import $ from 'jquery'
import axios from 'axios';
import Swal from 'sweetalert2'
import Constants from '../../../Constants';
import { useNavigate, useParams } from 'react-router-dom';

const AddProductPhoto = () => {

    const [photos, setPhotos] = useState({})
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [progress,setProgress] = useState(0)
    const params = useParams()
    const navigate = useNavigate()

    const handlePhotoInput = () => {

        $('#photo_input').trigger('click')
    }

    const handlePhotoUploadInput = (e) => {
        let images = e.target.files;
        for (let i = 0; i < images.length; i++) {
            let reader = new FileReader()
            reader.onloadend = () => {
                setPhotos(prevState => ({ ...prevState, [i]: { ...prevState[i], photo: reader.result, ...prevState[i], is_primary: i == 0 ? 1 : 0 } }))
            }
            reader.readAsDataURL(images[i])
        }


    }

    const handlePrimaryPhoto = (key) => {

        for (let i = 0; i < Object.keys(photos).length; i++) {
            setPhotos(prevState => ({ ...prevState, [i]: { ...prevState[i], is_primary: i == key ? 1 : 0 } }))
        }


    }

    useEffect(() => {
        console.log(photos)

    }, [photos])


    const handleUpload = ()=>{
        setIsLoading(true)
        axios.post(`${Constants.BASE_URL}/product_photo_upload/${params.id}`, {photos},{
            onUploadProgress: (progressEvent) =>{
                const progress = Math.round(progressEvent.loaded * 100 / progressEvent.total)
            setProgress(progress)
        }
        }).then(res => {
            setIsLoading(false)
            Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
            })
            navigate('/product');

        }).catch(errors => {
            if (errors.response.status === 422) {
                setErrors(errors.response.data.errors)
                setIsLoading(false)
            }
        })
    }

    return (
        <div>
            <BreadCrumb title={`Product Photo`} />

            <div className="row">
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header'>
                            <CardHeader title={'Add Product Photo'} button_text={'List'} icon={<FaList />} link={'/product'} />
                        </div>
                        <div className='card-body'>
                            <div className='product-upload-container'>
                                <div className='icon' onClick={handlePhotoInput}>
                                    <FcSwitchCamera style={{ fontSize: '35px' }} />
                                </div>
                            </div>
                            <input id='photo_input'
                                className='d-none'
                                type='file'
                                multiple={true}
                                accept='image/png,image/jpg,image/jpeg,image/webp'
                                onChange={handlePhotoUploadInput}
                            />
                            <div className='row'>

                                {Object.keys(photos).map((key) => (
                                    <div className='col-md-2 my-2' key={key}>
                                        <img onClick={() => handlePrimaryPhoto(key)} src={photos[key].photo} className={photos[key].is_primary == 1 ? 'primary-photo img-thumbnail preview-photo' : 'img-thumbnail preview-photo'} alt='Photo Preview' />
                                    </div>
                                ))}

                                <div className='row align-items-center'>
                                    <div className='col-md-9'>
                                        <div className='progress' style={{display: `${progress < 1 ? 'none' : 'block'}`}}>
                                            <div className='progress-bar progress-bar-striped progress-bar-animated bg-danger' style={{width : `${progress} %`}}>
                                            {`${progress} %`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                    <button className={'btn btn-success'} disabled={isLoading} onClick={handleUpload}
                                        dangerouslySetInnerHTML={{ __html: isLoading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : 'Upload' }} />
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

export default AddProductPhoto;