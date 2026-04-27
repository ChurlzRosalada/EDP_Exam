import React, { createContext, useState } from "react"; 
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i <= PRODUCTS.length; i++) {
        cart[i] = 0;
    }
    return cart;
};

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : getDefaultCart();
    }); 

    const saveCart = (newCart) => {
        setCartItems(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.price;
            }  
        }    
        return totalAmount;
    };  

    const addToCart = (itemId) => {
        const newCart = { ...cartItems, [itemId]: cartItems[itemId] + 1 };
        saveCart(newCart);
    };

    const removeFromCart = (itemId) => {
        const newAmount = cartItems[itemId] - 1 < 0 ? 0 : cartItems[itemId] - 1;
        const newCart = { ...cartItems, [itemId]: newAmount };
        saveCart(newCart);
    };

    const updateCartItemCount = (newAmount, itemId) => {
        if (newAmount < 0) newAmount = 0;
        const newCart = { ...cartItems, [itemId]: newAmount };
        saveCart(newCart);
    };

    const clearCart = () => {
        saveCart(getDefaultCart());
    };

    const contextValue = { cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount, clearCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};