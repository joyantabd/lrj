import React from 'react';
import loader from './../../../assets/img/loader.svg'

const Loader = () => {
    return (
        <div>
            <img src={loader} className='loader' alt='Loading'/>
            
        </div>
    );
};

export default Loader;