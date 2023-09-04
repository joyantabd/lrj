import React from 'react';
import { Link } from 'react-router-dom';

const CardHeader = (props) => {
    return (
        <div className='d-flex justify-content-between align-items-center'>
            <h4>{props.title}</h4>
            {props.hide == undefined ?
            <button className='btn theme-button'><Link to={props.link}>{props.icon}  {props.button_text} </Link></button>
            : null}
            
        </div>
    );
};

export default CardHeader;