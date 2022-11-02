import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../Cart/Cart';
import { AddToLocalStorageWithObject, deleteAllFromLocalStorage, getStoredCart } from '../../utilities/LocalStorage';
import { Link, useLoaderData } from 'react-router-dom';


/** Pagination korte hole ja ja lagbe
    1. product count ==> Done
    2. per page e koyta data thakbe (for example: per page data 10)
    3. Koyta page lagbe ==> count / per page data
    4. kon page e achi sheieta lagbe (currentPage)
 * 
*/

const Shop = () => {

    // Code for Fetching The data
    // const [products, setProducts] = useState([]);
    // useEffect( () => {
    //     fetch ('products.json')
    //     .then(res => res.json())
    //     .then (data => setProducts(data))
    // },[]);



    //pagination er jonno count ta ke destructure kora holo
    // const { products, count } = useLoaderData();

    //codes for pagination
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const totalPages = Math.ceil(count / size);


    useEffect(() => {
        const url = `http://localhost:5000/products?page=${page}&size=${size}`;
        console.log(page, size);

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setProducts(data.products);
            })
    }, [page, size])

    console.log("Total Products from Shop Page are: ", count);






    //handleAddToCart er jonno ei useState ta use kora hoiche..
    const [cart, setCart] = useState([]);

    //local storage theke data niye kaj korar jonno useEffect use kora holo
    useEffect(() => {
        const storedCart = getStoredCart();
        console.log(storedCart); //storedCart ekta object

        const ids = Object.keys(storedCart);
        console.log("Product IDs in the Stoed Cart: ", ids);

        const savedCart = [];

        //Jehetu storedCart er moddhe local storage er data gula ache and shei data gulo object hishebe ache taai amra for in loop use korlam.. 


        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                console.log("Data By Ids", data);

                for (const id in storedCart) {
                    console.log(id, storedCart[id]);
                    const searchAddedProduct = data.find(product => product._id === id);
                    if (searchAddedProduct) {
                        const quantity = storedCart[id];
                        searchAddedProduct.quantity = quantity;
                        console.log(searchAddedProduct);
                        savedCart.push(searchAddedProduct);
                    }
                }
                setCart(savedCart);
            })

        // for (const id in storedCart) {
        //     console.log(id, storedCart[id]);
        //     const searchAddedProduct = products.find(product => product._id === id);
        //     if (searchAddedProduct) {
        //         const quantity = storedCart[id];
        //         searchAddedProduct.quantity = quantity;
        //         console.log(searchAddedProduct);
        //         savedCart.push(searchAddedProduct);
        //     }
        // }
        // setCart(savedCart);

    }, [products])



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
        console.log("Previous Cart", cart);

        let newCart = [];
        // Amra jokhon cart er moddhe product add korbo tokhon 1ta kore product add korbo.. jehetu 1ta kore product add hobe shei jonno cart.find use kora hoiche to get the single new product
        const existsProduct = cart.find(product => product._id === selectedProduct._id);

        if (!existsProduct) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }

        //jodi cart er moddhe kono product thake, and product kintu onek gulao thakte pare and shei shob product k access korar jonno amra cart.filter use korlam karon loop ta onek gula product er moddhe hobe.. 
        else {
            const remainingProducts = cart.filter(product => product._id !== selectedProduct._id);
            existsProduct.quantity = existsProduct.quantity + 1;
            newCart = [...remainingProducts, existsProduct];
        }
        // Aita kora jabe na => cart.push(product);
        setCart(newCart);
        console.log("New Cart", newCart);
        AddToLocalStorageWithObject(selectedProduct._id);
    }


    const clearCart = () => {
        setCart([]);
        deleteAllFromLocalStorage();
    }








    return (
        <div className='shop-container'>
            <div className="parent-product-container">
                <h1 style={{ textAlign: "center" }}> {products.length} Available Products</h1>
                <div className='products-container'>
                    {
                        products.map(product => <Product product={product} key={product._id} handleAddToCart={handleAddToCart}></Product>)
                    }
                </div>
            </div>

            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to='/orders'>
                        <button style={{ marginLeft: "30px" }}>Review Selected Items By Children</button>
                    </Link>
                </Cart>
            </div>

            <div className='pagination'>
                <p>Currently selected Page: {page} and Data Size per page {size}</p>

                {
                    [...Array(totalPages).keys()].map(number => <button key={number}
                        className={page === number && 'selected'}
                        onClick={() => setPage(number)}
                        style={{ marginRight: "12px", padding: "8px" }}>{number}</button>)
                }
                <select
                    onChange={event => setSize(event.target.value)}
                    className='option-select'>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>

        </div>
    );
};

export default Shop;