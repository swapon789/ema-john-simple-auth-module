import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';

import Product from '../Product/Product';
import './Shoop.css'

const Shoop = () => {
    const products = useLoaderData();
    const [cart, setCart] = useState  ([]);

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart){
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
            
        }
        setCart (savedCart);
    },[products])
    const handleAddToCart = (product) => {
        console.log(product);
        // cart.push(product)
        const newCart = [...cart, product];
        setCart(newCart);
       addToDb(product.id)
    }
    return (
        <div className='shoop-container'>
            <div className="products-container">

                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart ={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}>
                <Link to='/order'>
                        <button>Review Order</button>
                    </Link>
                </Cart>
               
            </div>
        </div>
    );
};

export default Shoop;