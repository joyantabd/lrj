import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';

const ShowOrdrConfirmation = ({ handleOrderPlace,handleOrderSummeryInput, ...props }) => {

  const [branch, setBranch] = useState({})

  useEffect(() => {
    if (localStorage.branch != undefined) {
      setBranch(JSON.parse(localStorage.branch))
    }
  }, [])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='order-confirmation'>
          <div className='row px-4 align-item-center'>
            <div className='col-md-6'>
              {Object.keys(branch).length > 0 ?
                <>
                  <img src={branch.photo} alt='logo' className='img-thumbnail w-25' />
                  <h4>{branch.name}</h4>
                  <address>{branch.address.address}, {branch.address.area},{branch.address.district},{branch.address.division} <br></br> <small>Phone: {branch.phone}</small></address>
                </>
                : null}

            </div>
            <div className='col-md-6 text-end'>
              <h4>ORDER DETAILS</h4>

              <div className='mt-5'>
                <strong><Moment format="DD MMM, YY"></Moment></strong>
                <h5>Customer Details</h5>
                <div className='customer-details'>
                  <p>{props.orderSummery.customer.split('-')[0]}<br></br>
                    <small>Phone: {props.orderSummery.customer.split('-')[1]}</small></p>
                </div>
              </div>
            </div>


            <div className='col-md-12 mt-3'>
              <table className='table table-sm table-hover table-stripped table-bordered'>
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(props.carts).map((key, index) => (
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{props.carts[key].name}</td>
                      <td className='text-end'>{props.carts[key].quantity}</td>
                      <td className='text-end' >{props.carts[key].price}</td>
                      <td className='text-end'> {new Intl.NumberFormat('us').format(props.carts[key].original_price * props.carts[key].quantity)} ৳</td>
                    </tr>

                  ))}


                  <tr>
                    <th colSpan={4} className='text-end'>Sub Total</th>
                    <td className='text-end'>{new Intl.NumberFormat('us').format(props.orderSummery.amount)} ৳</td>
                  </tr>

                  <tr>
                    <th colSpan={4} className='text-end'>Discount</th>
                    <td className='text-end'> - {new Intl.NumberFormat('us').format(props.orderSummery.discount)} ৳</td>
                  </tr>

                  <tr>
                    <th colSpan={4} className='text-end'>Total</th>
                    <td className='text-end fw-bold'>{new Intl.NumberFormat('us').format(props.orderSummery.pay_able)} ৳</td>
                  </tr>

                  <tr>
                    <th colSpan={4} className='text-end text-success align-middle'>Paid Amount</th>
                    <td className='text-end'>
                    <div className='input-group'>
                    <input className='form-control-sm  form-control text-end' type='number' name='paid_amount'
                     value={props.orderSummery.paid_amount}
                      placeholder='Paid Amount' style={{width:'20px'}}
                      onChange={handleOrderSummeryInput}/>
                     <div className='input-group-text'>৳</div>
                    </div>

                    </td>
                   
                  </tr>

                  <tr>
                    <th colSpan={4} className='text-end text-danger'>Due Amount</th>
                    <td className='text-end fw-bold'>{new Intl.NumberFormat('us').format(props.orderSummery.due_amount)} ৳</td>
                  </tr>

                  
                  <tr>
                    <th colSpan={4} className='text-end text-warning align-middle'>Payment Method</th>
                    <td style={{width:'160px'}}>
                      <select className='form-select-sm form-select'
                      name='payment_method_id'
                      value={props.orderSummery.payment_method_id} 
                      onChange={handleOrderSummeryInput}
                      >

                        <option>Select Method</option>
                        {props.paymentMethods.map((payment_method,index)=>(
                          <option value={payment_method.id} key={index}>{payment_method.name}</option>
                        ))}
                      </select>
                    </td>
                  </tr>

                  {props.orderSummery.payment_method_id != 1 ?
                   <tr>
                   <th colSpan={4} className='text-end text-danger align-middle'>Transaction Id</th>
                   <td className='align-middle text-center' style={{width:'160px'}}>
                   <input className='form-control-sm  form-control text-end' type='text' name='trx_id'
                    value={props.orderSummery.trx_id}
                     placeholder='Transaction ID' 
                     onChange={handleOrderSummeryInput}/>
                     </td>
                 </tr>
                  : null}
                 

                </tbody>
              </table>
            </div>


          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='px-4'>
          <button onClick={props.onHide} className='btn btn-danger'>Close</button>
          <button className={'btn btn-success ms-4'}
            onClick={handleOrderPlace}
            dangerouslySetInnerHTML={{
              __html: props.isloading ?
                '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' :
                'Confirm Order'
            }} />
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ShowOrdrConfirmation;