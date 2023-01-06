import React from 'react';
import loading from '../../../assets/images/spinner/04de2e31234507.564a1d23645bf.gif';

function Spinner(){
  return (
    <div className='d-flex algin-items-center justify-content-center'>
     <img className='loading' src={loading} alt="loading"/>
    </div>
  )
}

export default Spinner;