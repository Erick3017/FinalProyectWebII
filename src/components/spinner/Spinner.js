import React from 'react';
import './spinner.css';

const Spinner = ({message}) => {
    return (
        <div>
            <div className="spinner-overlay">
                <h2>{message}</h2>
                <div className="spinner"></div>
            </div>
        </div>
    );
}

export default Spinner;