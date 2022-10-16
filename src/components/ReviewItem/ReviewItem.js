import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ReviewItem.css';

const ReviewItem = ({product, handleRemoveItem}) => {
    const {id, img, name, price, shipping, quantity} = product;
    return (
        <div className='reviewItem-Parent-div'>
            <div>
                <img className='reviewItem-image' src={img} alt="" />
            </div>

            <div className="review-details-container">

                <div className='review-details'>
                    <p><strong>{name}</strong></p>
                    <p><small>Price: <span style={{color:"blue", fontWeight:"bold"}}> ${price}</span></small></p>
                    <p><small>Quantity: <span style={{color:"blue", fontWeight:"bold"}}>{quantity}</span></small></p>
                    <p><small>Shipping: <span style={{color:"green", fontWeight:"bold"}}>${shipping}</span></small></p>
                </div>

                <div className='delete-button-container'>
                    <button onClick={()=> handleRemoveItem(id)} className='delete-button'><FontAwesomeIcon className='deleteIcon' icon ={faTrashAlt}></FontAwesomeIcon></button>
                </div>

            </div>
        </div>
    );
};

export default ReviewItem;