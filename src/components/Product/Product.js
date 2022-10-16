import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    //console.log(props.product)
    const {img, name, seller, price, ratings} = props.product;

    const {handleAddToCart} = props;
    //console.log(handleAddToCart);
    
    return (
        <div className='individual-product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <h3 className='product-name'>{name}</h3>
                <h4 className='product-price'>Price: ${price}</h4>
                <p className='product-Manufacturer'><small>Manufacturer: {seller}</small></p>
                <p className='product-ratting'><small>Rating: {ratings} Stars</small></p>
            </div>
            <button onClick={() => handleAddToCart(props.product)}  className='addToCartButton'>
                <p>Add to Cart</p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;