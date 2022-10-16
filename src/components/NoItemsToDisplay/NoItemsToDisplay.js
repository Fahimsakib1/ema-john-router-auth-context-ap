import { faSadCry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './NoItemsToDisplay.css';

const NoItemsToDisplay = () => {
    return (
        <div className='noItemsDisplayContainer'>
            <div className='parent-div'>
                <div className='title-sad-icon'>
                    <h1 className='title'>No Selected Items to Display</h1>
                    <FontAwesomeIcon className='sad-icon' icon={faSadCry}></FontAwesomeIcon>
                </div>
            </div>
            <Link title='visit to shop' className='link' to='/'>Visit Here For Shopping</Link>
        </div>
    );
};

export default NoItemsToDisplay;