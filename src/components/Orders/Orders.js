import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css';
import Swal from "sweetalert2";
import { deleteAllFromLocalStorage, removeItemFromLocalStorage } from '../../utilities/LocalStorage';
import NoItemsToDisplay from '../NoItemsToDisplay/NoItemsToDisplay';

const Orders = () => {
    
    //jehetu productsAndCartLoader file theke products, initialCart object er moddhe return kora hoiche taai ai kahneo same vabe object er destructure kore {products, initialCart} k useLoaderData er moddhe rakha holo
    const {products, initialCart} = useLoaderData();
    console.log("Initial Cart", initialCart);

    const [cart, setCart] = useState(initialCart);

    //remove the product after clicking on delete button on ReviewItem.js file
    const handleRemoveItem = (id) => {
        console.log(id);
        const remainingItems = cart.filter(item => item.id !== id);
        console.log(remainingItems);
        setCart(remainingItems); 
        Swal.fire("Done!","This Item is Removed Form The Cart" , "success");  
        removeItemFromLocalStorage(id);   
    }

    const clearCart = () => {
        setCart([]);
        deleteAllFromLocalStorage();
    }
    

    return (
        <div className='shop-container'>
            <div className='orders-container'>
                {
                    cart.map(product => <ReviewItem product ={product} key ={product.id} handleRemoveItem={handleRemoveItem}></ReviewItem>)
                }
                {
                    cart.length === 0 && <NoItemsToDisplay></NoItemsToDisplay>
                }
            </div>

            <div className='cart-container'>
                <Cart cart = {cart} clearCart ={clearCart}>
                    <Link to='/shipping'>
                        <button>Proceed Shipping</button>
                    </Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Orders;