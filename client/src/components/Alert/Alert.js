import React from 'react';
import './Alert.css';

const Alert = ({ status }) => {
  return (
    <div className={status.error ? 'flex error' : 'flex success'}>
      <div className='flex-col'>
        <p>{status.title}</p>
        <p>{status.description}</p>
      </div>
      {status.error ? <i className="bi bi-exclamation-circle error-handling-icon"></i> : <i className="bi bi-check-lg error-handling-icon"></i>}
    </div>
  )
};

export default Alert;