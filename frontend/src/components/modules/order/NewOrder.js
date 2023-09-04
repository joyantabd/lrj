import React from 'react';
import { useEffect, useState } from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaList, FaPlus, FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2'
import Constants from '../../../Constants';
import CardHeader from '../../partials/minipartials/CardHeader';
import AddCustomer from '../../partials/modals/AddCustomer';
import ShowOrdrConfirmation from '../../partials/modals/ShowOrdrConfirmation';

const NewOrder = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [modalOrderShow, setOrderModalShow] = useState(false)
    const [products, setproducts] = useState([])
    const [customers, setCustomers] = useState([])
    const [carts, setCarts] = useState([])
    const [order,setOrder] = useState({})
    const [paymentMethods,setPaymentMethods] = useState([])
    const [orderSummery, setOrderSummery] = useState({ 
        items: 0, amount: 0, discount: 0, pay_able: 0, customer : '', customer_id:0,paid_amount:0,due_amount:0 ,payment_method_id:1,trx_id:''})
    const [input, SetInput] = useState({ search: '', order_by: 'id', per_page: '10', direction: 'desc' })
    const [customerSearch, SetCustomerSearch] = useState({ search: '', order_by: 'id', per_page: '10', direction: 'desc' })
    

    const handleChange = (e) => {
        SetInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleCustomerSerch = (e) => {
        SetCustomerSearch(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const getCustomers = () => {
        setIsLoading(true)
        axios.get(`${Constants.BASE_URL}/customer?order_by=${input.order_by}&search=${input.search}&per_page=${input.per_page}&dirrection=${input.direction}`).then(res => {
            setCustomers(res.data.data);
            setIsLoading(false)
        })

    }

    const handleCart = (id) => {
        products.map((product, index) => {
            if (product.id == id) {
                if(carts[id] === undefined){
                    setCarts(prevState => ({ ...prevState, [id]: product }))
                    setCarts(prevState=>({...prevState,[id]:{...prevState[id], quantity:1}}))
                }else{
                    if(carts[id].stock > carts[id].quantity){
                        setCarts(prevState=>({...prevState,[id]:{...prevState[id], quantity:carts[id].quantity+1}}))
                    }
                }
               

            }
        })

    }

    const selectCustomer =(customer) =>{
        setOrder(prevState => ({ ...prevState, customer_id: customer.id }))
        setOrderSummery(prevState => ({ ...prevState, customer: customer.name+' - '+customer.phone }))
        setOrderSummery(prevState => ({ ...prevState, customer_id: customer.id }))

    }

    const removeItem = (id) => {
        setCarts(current => {
            const copy = { ...current }; delete copy[id];
            return copy;
        })

    }

    const getProducts = (pageNumber) => {
        setIsLoading(true)
        axios.get(`${Constants.BASE_URL}/product?order_by=${input.order_by}&search=${input.search}&per_page=${input.per_page}&dirrection=${input.direction}`).then(res => {
            setproducts(res.data.data);
            setIsLoading(false)
        })

    }

    const handleView = () => {
        setModalShow(true)
    }

    const handleDecrease = (id) => {
        if(carts[id].quantity > 1){
            setCarts(prevState=>({...prevState,[id]:{...prevState[id], quantity:carts[id].quantity-1}}))
        }
    }
    
    const handleIncrease = (id) => {
        if(carts[id].stock > carts[id].quantity){
            setCarts(prevState=>({...prevState,[id]:{...prevState[id], quantity:carts[id].quantity+1}}))
        }

    }

    const calaculateOrderSummer = () =>{
        let items = 0
        let amount = 0
        let discount = 0
        let pay_able = 0
        let paid_amount = 0
        Object.keys(carts).map((key) => {
            amount += carts[key].original_price * carts[key].quantity
            discount += carts[key].sell_price.discount * carts[key].quantity
            pay_able += carts[key].sell_price.price * carts[key].quantity
            items += carts[key].quantity
        })
        setOrderSummery( prevState =>({ ...prevState, items: items, amount: amount, discount: discount, pay_able: pay_able,paid_amount:pay_able }))
    }

    const handleOrderSummeryInput = (e) =>{
        if(e.target.name ==  'paid_amount' && orderSummery.pay_able >= e.target.value){
        setOrderSummery( prevState =>({ 
            ...prevState,
            paid_amount:e.target.value ,
            due_amount:orderSummery.pay_able - e.target.value
        }))
        }else if (e.target.name ==  'payment_method_id'){
            setOrderSummery( prevState =>({ ...prevState,payment_method_id : e.target.value }))
            if(e.target.value ==1){
                setOrderSummery( prevState =>({ ...prevState,trx_id :'' }))
            }

        }
        else if (e.target.name ==  'trx_id'){
            setOrderSummery( prevState =>({ ...prevState,trx_id : e.target.value }))

        }

    }

    const handleOrderPlace = ()=>{
        setIsLoading(true)
        axios.post(`${Constants.BASE_URL}/order`,{carts:carts,'order_summery':orderSummery}).then(res => {
            setOrderModalShow(false)
            Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
            })
            navigate(`/order/${res.data.order_id}`);

        }).catch(errors => {
            if (errors.response.status === 422) {
                setErrors(errors.response.data.errors)
                setIsLoading(false)
            }
        })

    }

    const getPaymentMethods = () =>{
        axios.get(`${Constants.BASE_URL}/get_payment_methods`).then(res => {
            setPaymentMethods(res.data);
        })
    }


    useEffect(() => {
        getProducts()
        getPaymentMethods()
    }, [])

    useEffect(() => {
      calaculateOrderSummer()
    }, [carts])


    return (
        <div>
            <BreadCrumb title={`New Order`} />

            <div className="row">
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <CardHeader title={'Place New Order'} button_text={'List'} icon={<FaList />} link={'/order'} />
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='card'>
                                        <div className='card-header'>Product List</div>
                                        <div className='card-body p-1'>
                                            <div className='product-search-area mb-3 mt-2'>
                                                <div className='input-group'>
                                                    <input className='form-control form-control-sm' name='search' value={input.search} placeholder='Search...' onChange={handleChange} />
                                                    <button className='input-group-text btn btn-sm btn-success' onClick={() => getProducts(1)}><FaSearch /></button>
                                                </div>
                                            </div>

                                            <ul class="list-unstyled">
                                                {products.map((product, index) => (
                                                    <div class="d-flex p-2  position-relative order-product-container" key={index}>
                                                        <div className='details-area'>
                                                            <button className='btn btn-sm ms-1 btn-success'><FaEye /></button>
                                                            <button className='btn btn-sm ms-1 btn-info' onClick={() => handleCart(product.id)}><FaPlus /></button>
                                                        </div>
                                                        <div class="flex-shrink-0">
                                                            <img className='product-order-photo img-thumbnail' src={product.primary_photo} alt={product.name} />
                                                        </div>
                                                        <div class="flex-grow-1 ms-2">
                                                            <p className='text-black'>
                                                                {product.name}<br></br>
                                                                <small>Original Price: {product.price}</small><br></br>
                                                                <small>Price: {product.sell_price.price} {product.sell_price.symbol} | Discount: {product.sell_price.discount} {product.sell_price.symbol}</small><br></br>
                                                                <small>SKU: {product.sku} | Stock: {product.stock}</small>


                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}




                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='card '>
                                        <div className='card-header'>Cart</div>
                                        <div className='card-body p-1'>
                                            <div className='order-summery'>
                                                <p className='pb-2 ms-1'><strong>Customer:</strong> {orderSummery.customer}</p>
                                                <table className='table table-sm table-hover table-stripped table-bordered'>
                                                    <tbody>
                                                        <tr>
                                                            <th>Items</th>
                                                            <td className='text-end'>{orderSummery.items}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Price</th>
                                                            <td className='text-end'>{orderSummery.amount} ৳</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Discount</th>
                                                            <td className='text-end'>-{orderSummery.discount} ৳</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Net Payable</th>
                                                            <td className='text-end fw-bold'>{orderSummery.pay_able} ৳</td>
                                                        </tr>
                                                    </tbody>

                                                </table>

                                            </div>
                                            {Object.keys(carts).map((key) => (
                                                <div class="d-flex py-2 border-bottom  order-product-container position-relative" key={key}>
                                                    <div className='details-area'>
                                                        <button className='btn btn-sm ms-1 btn-success'><FaEye /></button>
                                                        <button className='btn btn-sm ms-1 btn-danger' onClick={() => removeItem(key)}><FaTimes /></button>
                                                    </div>
                                                    <div class="flex-shrink-0">
                                                        <img className='product-order-photo img-thumbnail' src={carts[key].primary_photo} alt={carts[key].name} />
                                                    </div>
                                                    <div class="flex-grow-1 ms-2">
                                                        <p className='text-black'>
                                                            {carts[key].name}<br></br>
                                                            <small>Original Price: {carts[key].price}</small><br></br>
                                                            <small>Price: {carts[key].sell_price.price} {carts[key].sell_price.symbol} | Discount: {carts[key].sell_price.discount} {carts[key].sell_price.symbol}</small><br></br>
                                                            <small>SKU: {carts[key].sku} | Stock: {carts[key].stock}</small>
                                                        </p>
                                                        <p>
                                                            Quantity:
                                                            <button onClick={()=>handleDecrease(carts[key].id)} disabled={carts[key].quantity <= 1} className='quantity-button'>-</button>
                                                            <span>{carts[key].quantity}</span>
                                                            <button onClick={()=>handleIncrease(carts[key].id)} disabled={carts[key].stock <= carts[key].quantity} className='quantity-button'>+</button>
                                                        </p>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <div className='d-flex justify-content-between'>
                                                Customer Details
                                                <button className='btn btn-sm btn-success py-0 px-2' onClick={handleView}><FaPlus /></button>
                                            </div>
                                        </div>
                                        <div className='card-body'>
                                            <div className='product-search-area mb-3'>
                                                <div className='input-group'>
                                                    <input className='form-control form-control-sm' name='cus_search' value={input.cus_search} placeholder='Search...' onChange={handleCustomerSerch} />
                                                    <button className='input-group-text btn btn-sm btn-success' onClick={getCustomers}><FaSearch /></button>
                                                </div>
                                            </div>

                                            <ul className='customer-list'>
                                            {customers.map((customer, index) => (
                                                <li className={orderSummery.customer_id == customer.id ? 'text-success order-product-container px-2' : 'order-product-container px-2'} onClick={()=>selectCustomer(customer)} key={index}>{customer.name} - {customer.phone}</li>
                                                ))}
                                            </ul>

                                            <div className='d-grid mt-4'>
                                                <button disabled={orderSummery.items == 0 || orderSummery.customer_id == 0}  onClick={()=>setOrderModalShow(true)} className='btn btn-info'>PLACE ORDER</button>
                                            </div>



                                        </div>
                                    </div>
                                </div>


                                <AddCustomer show={modalShow} size='' title='Add New User' onHide={() => setModalShow(false)} setModalShow={setModalShow} />
                                <ShowOrdrConfirmation show={modalOrderShow} size='' title='Order Confirmation' onHide={() => setOrderModalShow(false)}  
                                orderSummery={orderSummery} 
                                carts={carts} handleOrderPlace={handleOrderPlace}
                                isloading = {isloading}
                                handleOrderSummeryInput={handleOrderSummeryInput}
                                paymentMethods={paymentMethods}
                                />



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewOrder;