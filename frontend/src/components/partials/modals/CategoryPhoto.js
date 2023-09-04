import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CategoryPhoto = (props) => {
    return (
        <Modal
        {...props}
        size={props.size}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={props.photo} alt='Photo' className='img-thumbnail'/>
        </Modal.Body>
      </Modal>
    );
};

export default CategoryPhoto;