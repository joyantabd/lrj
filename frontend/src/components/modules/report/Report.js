import React, { useEffect, useState } from 'react';
import CardHeader from '../../partials/minipartials/CardHeader';
import BreadCrumb from '../../partials/BreadCrumb';
import { FaAccessibleIcon, FaAdjust, FaBatteryQuarter, FaBoxOpen, FaCaretDown, FaCaretSquareUp, FaCartPlus, FaDollarSign, FaList, FaRegWindowMinimize, FaSellcast, FaSellsy, FaSignOutAlt } from 'react-icons/fa';
import {TbMoneybag} from 'react-icons/tb';
import {GiReturnArrow} from 'react-icons/gi';
import {BsArrowLeftRight, BsFillBoxFill} from 'react-icons/bs';
import Constants from '../../../Constants';
import axios from 'axios';

const Report = () => {
    const [report,setReport] = useState([])

    const getReport = ()=>{

        axios.get(`${Constants.BASE_URL}/report`).then(res => {
            setReport(res.data);
        })

    }

    useEffect(()=>{
 getReport()
    },[])
    return (
        <div>
        <BreadCrumb title={`Reports`} />

        <div className="row">
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-header'>
                       <CardHeader title={'Report'} button_text={'List'} hide={true} icon={<FaList/>} link={'#'}/>
                    </div>
                    <div className='card-body'>
                        <div className='card'>
                            <div className='card-header'>Sales(Branch)</div>
                            <div className='card-body'>
                            <div className='row'>
                            <div className='col-md-3'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <FaCartPlus color='blue' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Total Sales</h6>
                                               <h5>{report.total_sale}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <FaCaretSquareUp color='blue' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Total Parchase</h6>
                                               <h5>{report.total_purchase}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <GiReturnArrow color='blue' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Today's Total Sale</h6>
                                               <h5>{report.today_total_sale}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <FaSellsy color='green' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Today's Total Purchase</h6>
                                               <h5>{report.today_total_purchase}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className='col-md-3 mt-2'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <FaSellcast color='blue' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Today's Sale</h6>
                                               <h5>346456</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 mt-2'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <FaSellcast color='red' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Today's Purchase</h6>
                                               <h5>346456</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 mt-2'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <BsArrowLeftRight color='red' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Parchace Return</h6>
                                               <h5>346456</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 mt-2'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <FaAdjust color='green' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Today's Purchase Return</h6>
                                               <h5>346456</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            */}


                        </div>
                            </div>
                        </div>

                        <div className='card mt-3'>
                            <div className='card-header'>Stock</div>
                            <div className='card-body'>
                                <div className='row'>
                            <div className='col-md-3'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <BsFillBoxFill color='blue' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Products</h6>
                                               <h5>{report.total_product}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <FaBoxOpen color='pink' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Stock</h6>
                                               <h5>{report.total_stock}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <FaBatteryQuarter color='violet' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Low Stock</h6>
                                               <h5>{report.low_stock}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <FaDollarSign color='red' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Stock Value (Cost)</h6>
                                               <h5>{report.buy_value}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-3 mt-2'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <FaDollarSign color='green' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Stock Value (Sale)</h6>
                                               <h5>{report.sell_value}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-3 mt-2'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <FaDollarSign color='blue' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Possible Profit</h6>
                                               <h5>{report.possible_profit}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            </div>

                            </div>
                        </div>

                        <div className='card mt-3'>
                            <div className='card-header'>Expense (Branch)</div>
                            <div className='card-body'>
                                <div className='row'>
                            <div className='col-md-3'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <FaSignOutAlt color='red' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Today's Total Withdrawal</h6>
                                               <h5>346456</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <TbMoneybag color='green' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Total Withdrawal</h6>
                                               <h5>346456</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            </div>

                            </div>
                        </div>

                        <div className='card mt-3'>
                            <div className='card-header'>WithDrawal (Branch)</div>
                            <div className='card-body'>
                                <div className='row'>
                            <div className='col-md-3'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <FaSignOutAlt color='red' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Today's Total Withdrawal</h6>
                                               <h5>346456</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className='card report-card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <TbMoneybag color='green' size={45}  />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                               <h6>Total Withdrawal</h6>
                                               <h5>346456</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

export default Report;