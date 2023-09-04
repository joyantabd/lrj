
import React from 'react';
import Modal from 'react-bootstrap/Modal';

const SalesManager = (props) => {
    return (
        <Modal
        {...props}
        size={props.size}
        aria-labelledby="supplier_details_modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="supplier_details_modal">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <table className='my-table table table-hover table-striped table-bordered'>
          <tbody>
          <tr>
            <th>ID:</th>
            <td>{props.data.id}</td>
          </tr>

          <tr>
            <th>Shop:</th>
            <td>{props.data.shop}</td>
          </tr>

          <tr>
            <th>Name</th>
            <td>{props.data.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{props.data.email}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{props.data.phone}</td>
          </tr>
          <tr>
            <th>Document Number</th>
            <td>{props.data.nid}</td>
          </tr>
          <tr>
            <th>Bio :</th>
            <td>{props.data.description}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{props.data.address?.address} ({props.data.address?.landmark}) ,
            {props.data.address?.area} , {props.data.address?.district} , {props.data.address?.division}
            </td>
          </tr>
          <tr>
            <th>Photo</th>
            <th>Document Photo</th>
          </tr>
          <tr>
            <td><img src={props.data.photo} className='img-thumbnail' alt={props.data.name} /></td>
            <td><img src={props.data.nid_photo} className='img-thumbnail' alt={props.data.name} /></td>
          </tr>
          </tbody>
          </table>

        </Modal.Body>
      </Modal>
    );
};

export default SalesManager;