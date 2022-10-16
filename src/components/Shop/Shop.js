import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../Cart/Cart';
import { AddToLocalStorageWithObject, deleteAllFromLocalStorage, getStoredCart } from '../../utilities/LocalStorage';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    
    // Code for Fetching The data
    // const [products, setProducts] = useState([]);
    // useEffect( () => {
    //     fetch ('products.json')
    //     .then(res => res.json())
    //     .then (data => setProducts(data))
    // },[]);

    const products = useLoaderData();


    //handleAddToCart er jonno ei useState ta use kora hoiche..
    const [cart, setCart] = useState([]);

    //local storage theke data niye kaj korar jonno useEffect use kora holo
    useEffect( () => {
        const storedCart = getStoredCart();
        console.log(storedCart);

        const savedCart = [];

        //Jehetu storedCart er moddhe local storage er data gula ache and shei data gulo object hishebe ache taai amra for in loop use korlam.. 
        for (const id in storedCart){
            console.log(id, storedCart[id]);
            const searchAddedProduct = products.find( product => product.id === id);
            if(searchAddedProduct){
                const quantity = storedCart[id];
                searchAddedProduct.quantity = quantity;
                console.log(searchAddedProduct);
                savedCart.push(searchAddedProduct);
            }
        }
        setCart(savedCart);
    },[products])



    //This was the previous handleAddToCart function code 
    // const handleAddToCart = (product) => {
    //     console.log(product);
    //     //Dont use cart.push(product);
    //     const newCart = [...cart, product];
    //     setCart(newCart);
    // }




    //code for handleAddToCart Button
    // const [cart, setCart] = useState([]);
    const handleAddToCart = (selectedProduct) => {
        console.log("Button Clicked", selectedProduct);
        console.log("Previous Cart",cart);

        let newCart = []; 
        // Amra jokhon cart er moddhe product add korbo tokhon 1ta kore product add korbo.. jehetu 1ta kore product add hobe shei jonno cart.find use kora hoiche to get the single new product
        const existsProduct = cart.find(product => product.id === selectedProduct.id);

        if(!existsProduct){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }

        //jodi cart er moddhe kono product thake, and product kintu onek gulao thakte pare and shei shob product k access korar jonno amra cart.filter use korlam karon loop ta onek gula product er moddhe hobe.. 
        else{
            const remainingProducts = cart.filter(product => product.id !== selectedProduct.id);
            existsProduct.quantity = existsProduct.quantity + 1;
            newCart = [...remainingProducts, existsProduct];
        }
        // Aita kora jabe na => cart.push(product);
        setCart(newCart);
        console.log("New Cart",newCart);
        AddToLocalStorageWithObject(selectedProduct.id);
    }


    const clearCart = () => {
        setCart([]);
        deleteAllFromLocalStorage();
    }








    return (
        <div className='shop-container'>
            <div className="parent-product-container">
                <h1 style={{textAlign:"center"}}> {products.length} Available Products</h1>
                <div className='products-container'>
                    {
                        products.map(product => <Product product = {product} key={product.id} handleAddToCart={handleAddToCart}></Product>)
                    }
                </div>
            </div>
            
            <div className="cart-container">
                <Cart clearCart={clearCart}  cart = {cart}>
                    <Link to='/orders'>
                        <button style={{marginLeft:"30px"}}>Review Selected Items By Children</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;