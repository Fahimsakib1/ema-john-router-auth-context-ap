import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const {cart, clearCart, children} = props;
    console.log("Cart",cart);

    const totalPrice = cart.reduce( (a,b) => a + b.price,0);

    const totalShippingCharge = cart.reduce( (a,b) => a + b.shipping,0);

    const tax = (totalPrice * (10 / 100)).toFixed(2);
    const grandTotal = totalPrice + totalShippingCharge + parseFloat(tax);

    // ei vabe for of diye total price and shipping charge ber kora jabe.
    let total = 0;
    let shippingCharge = 0;
    let quantity = 0;

    // Previously The For Loop was like This
    // for (const product of cart){
    //     total = total + product.price;
    //     shippingCharge = shippingCharge + product.shipping;
    // }


    //jehetu cart er moddhe proti ta product hocche array of object taai for of loop use kora holo
    for (const product of cart){
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shippingCharge = shippingCharge + product.shipping;
    }

    const taxUpdated = (total * (10 / 100)).toFixed(2);
    const grandTotalUpdated = total + shippingCharge + parseFloat(taxUpdated);
    
    return (
        <div className='cart'>
            <h3>Order Summary</h3>
                
                {/* Previously The Order Cart was like this */}
                {/* <div className='cart-info'>
                    <p>Selected Items: {cart.length}</p>
                    <p>Total Price: ${totalPrice}</p>
                    <p>Total Shipping Charge: ${totalShippingCharge}</p>
                    <p>Total Price By For Loop: ${total}</p>
                    <p>Total Shipping Charge By For Loop: ${shippingCharge}</p>
                    <p>Tax: ${tax}</p>
                    <p id='grand-total'>Grand Total ${grandTotal}</p>
                </div> */}

                <div className='cart-info'>
                    <p>Selected Items: <span  style={{color:"red", fontWeight:"bold"}}>{quantity}</span></p>
                    <p>Total Price: <span style={{color:"green", fontWeight:"bold"}}>${total}</span></p>
                    <p>Total Shipping Charge: <span style={{color:"green", fontWeight:"bold"}}> ${shippingCharge}</span></p>
                    {/* <p>Total Price By For Loop: ${total}</p>
                    <p>Total Shipping Charge By For Loop: ${shippingCharge}</p> */}
                    <p>Tax: <span style={{color:"green", fontWeight:"bold"}}>${taxUpdated}</span></p>
                    <p id='grand-total'>Grand Total <span style={{color:"blue", fontWeight:"bold"}}>${grandTotalUpdated.toFixed(2)}</span></p>
                    
                </div>

                <div className='clear-and-review-order-div'>
                    {/* <div className='review-order-div'>
                        <Link style={{textDecoration:"none"}} to="/orders">
                            <button className='review-order-button'>
                                <p>Review Order</p>
                                <FontAwesomeIcon className='ReviewOrder-Icon' icon={faArrowRight}></FontAwesomeIcon>
                            </button>
                        </Link>
                    </div> */}

                    {/* <div className='clear-cart-div'>
                        <button onClick={clearCart} className='clear-cart-button'>
                            <p>Clear Cart</p>
                            <FontAwesomeIcon className='ClearCart-Icon' icon={faTrashAlt}></FontAwesomeIcon>
                        </button>
                    </div> */}
                </div>
                {children}
        </div>
    );
};

export default Cart;