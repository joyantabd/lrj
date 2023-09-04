import React, { useEffect, useRef, useState } from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import CardHeader from '../../partials/minipartials/CardHeader';
import { FaList } from 'react-icons/fa';
import Constants from '../../../Constants';
import axios from 'axios';
import GlobalFunction from '../../../GlobalFunction';
import Barcode from 'react-barcode';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import BarCodePage from '../../partials/modals/BarCodePage';


const BarCode = () => {
    const [input, SetInput] = useState({ name: '', category_id: '', sub_category_id: '' })
    const [products, SeProducts] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [paperSize, setPaperSize] = useState({ a4: { width: 595, height: 842 } })

    const handleChange = (e) => {
        if (e.target.name == 'category_id') {
            let category_id = parseInt(e.target.value);
            if (!Number.isNaN(category_id)) {
                getSubCategories(e.target.value)
            }
        }
        SetInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const getCategories = () => {
        axios.get(`${Constants.BASE_URL}/category_info`).then(res => {
            setCategories(res.data)
        })
    }
    const getSubCategories = (category_id) => {
        axios.get(`${Constants.BASE_URL}/sub_category_info/${category_id}`).then(res => {
            setSubCategories(res.data)
        })
    }

    const handleSubmit = () => {
        axios.get(`${Constants.BASE_URL}/product_barcode?name=${input?.name}&category_id=${input?.category_id}&sub_category_id=${input?.sub_category_id}`).then(res => {
            SeProducts(res.data.data)
        })

    }

    const componentRef = useRef()
    const handlePrint = useReactToPrint({ content: () => componentRef.current })

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div>
            <BreadCrumb title={`Bar Code`} />

            <div className="row">
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <CardHeader title={'Bar Code Generator'} button_text={'List'} hide={true} icon={<FaList />} link={'/#'} />
                        </div>
                        <div className='card-body'>
                            <div className='row align-items-baseline'>
                                <div className='col-md-3'>
                                    <label className='w-100  mt-4 mt-md-0'>
                                        <p>Category</p>
                                        <select
                                            className='form-select' name='category_id' value={input.category_id} onChange={handleChange}>
                                            <option>Select Category</option>
                                            {categories.map((category, index) => (
                                                <option value={category.id} key={index}>{category.name}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className='col-md-3'>
                                    <label className='w-100  mt-4 mt-md-0'>
                                        <p>Sub Category</p>
                                        <select
                                            className='form-select' name='sub_category_id'
                                            value={input.sub_category_id} onChange={handleChange} disabled={input.category_id == undefined}>
                                            <option>Select Sub Category</option>
                                            {subCategories.map((sub_category, index) => (
                                                <option value={sub_category.id} key={index}>{sub_category.name}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className='col-md-4'>
                                    <label className='w-100 mt-4 mt-md-0'>
                                        <p>Product Name</p>
                                        <input className='form-control' name='name' value={input.name} onChange={handleChange} placeholder='Enter Product Name'></input>
                                    </label>
                                </div>
                                <div className='col-md-2'>
                                    <div className='d-grid mt-4 '>
                                        <button onClick={handleSubmit} className='btn btn-primary' dangerouslySetInnerHTML={{ __html: isloading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading' : 'Search' }}></button>

                                    </div>
                                </div>
                            </div>
                            <div className='print-area-barcode' style={{display:Object.keys(products).length > 0 ? 'block' : 'none'}}>
                            <button className='btn btn-info mt-3 float-end' onClick={handlePrint} >Print BarCode</button>

<div className='bar-code-area-wrapper'>
    <BarCodePage products={products} paperSize={paperSize} ref={componentRef} />
</div>
                            </div>
                            





                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default BarCode;