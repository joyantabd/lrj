import React from 'react';
import Modal from 'react-bootstrap/Modal';

const CategoryView = (props) => {
    return (
        <Modal
        {...props}
        size={props.size}
        aria-labelledby="category_details_modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="category_details_modal">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <table className='my-table table table-hover table-striped table-bordered'>
          <tbody>
          <tr>
            <th>Code</th>
            <td>POS- {props.category.serial}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{props.category.name}</td>
          </tr>
          <tr>
            <th>Slug</th>
            <td>{props.category.slug}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{props.category.status}</td>
          </tr>
          <tr>
            <th>Created By</th>
            <td>{props.category.created_by}</td>
          </tr>
          {props.category.category_name !== undefined ? 
          <tr>
            <th>Category Name</th>
            <td>{props.category.category_name}</td>
          </tr> : null
          }
          <tr>
            <th>Details</th>
            <td>{props.category.description}</td>
          </tr>
          <tr>
            <th>Photo</th>
            <td><img src={props.category.photo} className='img-thumbnail' alt={props.category.name} /></td>
          </tr>
          </tbody>
          </table>

        </Modal.Body>
      </Modal>
    );
};

export default CategoryView;