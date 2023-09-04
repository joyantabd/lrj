import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import CardHeader from '../../partials/minipartials/CardHeader';
import { FaList } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../../Constants';
import GlobalFunction from '../../../GlobalFunction'

const OrderDetails = () => {

    const params = useParams()
    const [orders,setOrders] = useState({})
    const [errors, setErrors] = useState([])
    const [isloading, setIsLoading] = useState(false)

    const getOrderDetails = () =>{
        setIsLoading(true)
        axios.get(`${Constants.BASE_URL}/order/${params.id}`).then(res => {
            setOrders(res.data.data);
            setIsLoading(false)
        })

    }

    useEffect(() => {
        getOrderDetails()

    },[])






    return (
        <div>
        <BreadCrumb title={`Order Details`} />

        <div className="row">
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-header'>
                       <CardHeader title={`${orders?.order_number}`} button_text={'List'} icon={<FaList/>} link={'/order'}/>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h4>Customer Details</h4>
                                    </div>
                                    <div className='card-body'>
                                        <table className='table table-hover table-bordered table-striped'>
                                            <tbody>
                                                <tr>
                                                <th>Name</th>
                                                <td>{orders.customer?.name}</td>
                                                </tr>
                                                <tr>
                                                <th>Phone</th>
                                                <td>{orders.customer?.phone}</td>
                                                </tr>
                                                <tr>
                                                <th>Email</th>
                                                <td>{orders.customer?.email}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h4>Shop Details</h4>
                                    </div>
                                    <div className='card-body'>
                                        <table className='table table-hover table-bordered table-striped'>
                                            <tbody>
                                                <tr>
                                                <th className='align-middle'>Shop</th>
                                                <td  className='align-middle'><img src={orders.shop?.photo} alt={orders.shop?.name} className='table-image img-thumbnail'/> {orders.shop?.name} </td>
                                                </tr>
                                                <tr>
                                                <th>Address</th>
                                                <td>{orders.shop?.address.address}</td>
                                                </tr>
                                                <tr>
                                                <th className='align-middle'>Sales Manager</th>
                                                <td className='align-middle'><img src={orders.sales_manager?.photo} alt={orders.sales_manager?.name} className='table-image img-thumbnail'/>{orders.sales_manager?.name}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='col-md-12 mt-4'>
                            <div className='card h-100'>
                                <div className='card-header'>
                                    <h4>Order Summery</h4>
                                </div>
                                <div className='card-body'>
                                    <table className='table table-hover table-bordered table-stripped'>
                                        <tbody>
                                            <tr>
                                                <th className='align-middle'>Order Number</th>
                                                <td className='align-middle'><strong>{orders.order_number}</strong></td>
                                                <th className='align-middle'>Total Items</th>
                                                <td className='align-middle'>{orders.quantity}</td>
                                            </tr>
                                            <tr>
                                                <th className='align-middle'>Order Status</th>
                                                <td className='align-middle'>{orders.order_status_text}</td>
                                                <th className='align-middle'>Payment Status</th>
                                                <td className='align-middle'>{orders.payment_status}</td>
                                            </tr>
                                            <tr>
                                                <th className='align-middle'>Payment Method</th>
                                                <td className='align-middle'>{orders.payment_method?.name}</td>
                                                <th className='align-middle'>Account Number</th>
                                                <td className='align-middle'>{orders.payment_method?.account_number}</td>
                                            </tr>
                                            <tr>
                                                <th className='align-middle'>Sub Total</th>
                                                <td className='align-middle'>{GlobalFunction.formatPrice(orders.sub_total)}</td>
                                                <th className='align-middle'>Discount</th>
                                                <td className='align-middle'>{GlobalFunction.formatPrice(orders.discount)}</td>
                                            </tr>
                                            <tr>
                                                <th className='align-middle'>Total</th>
                                                <td className='align-middle fw-bold'>{GlobalFunction.formatPrice(orders.total)}</td>
                                            </tr>
                                            <tr>
                                                <th className='align-middle'>Paid Amount</th>
                                                <td className='align-middle text-success fw-bold'>{GlobalFunction.formatPrice(orders.paid_amount)}</td>
                                                <th className='align-middle'>Due Amount</th>
                                                <td className='align-middle text-danger fw-bold'>{GlobalFunction.formatPrice(orders.due_amount)}</td>
                                            </tr>
                                            <tr>
                                                <th className='align-middle'>Order Placed</th>
                                                <td className='align-middle'>{orders.created_at}</td>
                                                <th className='align-middle'>Order Updated</th>
                                                <td className='align-middle'>{orders.updated_at}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-12 mt-4 mb-5'>
                            <div className='card h-100'>
                                <div className='card-header'>
                                    <h4>Cart Items Details</h4>
                                </div>
                                <div className='card-body'>
                                    <table className='table sm-table table-hover table-bordered table-stripped'>
                                        <thead>
                                            <tr>
                                                <th>SL</th>
                                                <th>Name</th>
                                                <th>Info</th>
                                                <th>Quantity</th>
                                                <th>Photo</th>
                                                <th>Amount</th>
                                                <th>Sub Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.order_details?.map((product,index)=>(
                                                <tr key={index}>
                                                    <td className='align-middle'>{++index}</td>
                                                    <td className='align-middle'>
                                                        <th>SKU:{product.sku}</th>
                                                        <p>{product.product_name}</p>
                                                        <p>Supplier:{product.supplier}</p>
                                                    </td>
                                                    <td className='align-middle'>
                                                        <p >Brand:{product.brand}</p>
                                                        <p>Category:{product.category}</p>
                                                        <p>Sub Category:{product.sub_category}</p>
                                                    </td>
                                                    <td className='align-middle'>{product.quantity}</td>
                                                    <td className='align-middle'><img src={product.photo} alt={product.name} className='img-thumbnail order-details-img'/></td>
                                                    <td className='align-middle'>
                                                        <p>Original Price:{product.price}</p>
                                                        <p>Discount:{GlobalFunction.formatPrice(product.sell_price.discount)}</p>
                                                        <p>Sell Price:  {GlobalFunction.formatPrice(product.sell_price.price)}</p>
                                                    </td>
                                                    <td className='align-middle'>
                                                        <p>{GlobalFunction.formatPrice(product.sell_price.price * product.quantity)}</p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-12 mt-4 mb-5'>
                            <div className='card h-100'>
                                <div className='card-header'>
                                    <h4>Transaction Details</h4>
                                </div>
                                <div className='card-body'>
                                    <table className='table sm-table table-hover table-bordered table-stripped'>
                                        <thead>
                                            <tr>
                                                <th>SL</th>
                                                <th>Trx</th>
                                                <th>Amount</th>
                                                <th>Customer</th>
                                                <th>Payment Method</th>
                                                <th>Status</th>
                                                <th>Manager</th>
                                                <th>DateTime</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.transactions?.map((trx,index)=>(
                                                <tr key={index}>
                                                    <td className='align-middle'>{++index}</td>
                                                    <th className='align-middle'>{trx.trx_id}</th>
                                                    <th className='align-middle'>{GlobalFunction.formatPrice(trx.amount)}</th>
                                                    <td className='align-middle'>
                                                        <th>{trx.customer_name}</th>
                                                        <p>{trx.customer_phone}</p>
                                                    </td>
                                                    <td className='align-middle'>
                                                        <p>Payment Method:<strong>{trx.payment_method}</strong></p>
                                                        <p>Account Number:{trx.account_number}</p>
                                                        <p>Trx Type:{trx.trx_type}</p>
                                                    </td>
                                                    <td className='align-middle'>{trx.status}</td>
                                                    <td className='align-middle'>{trx.transaction_by}</td>
                                                    <td className='align-middle'>{trx.created_at}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
};

export default OrderDetails;