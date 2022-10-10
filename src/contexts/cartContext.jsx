import { createContext, useEffect, useState } from "react";



const addCartItem = (productToAdd, cartItems) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id); 

    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
         {...cartItem, quantity:cartItem.quantity + 1} 
         : cartItem);
    }

    return [...cartItems, {...productToAdd, quantity:1}];
};

export const CartContext = createContext({
    isCartOpen : false,
    setisCartOpen: () => {},
    cartItems: [],
    addToCartItems: () => {},
    cartCount:0
});

export const CartProvider = ({children}) => {

    const [isCartOpen, setisCartOpen] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0);

        setCartCount(newCartCount);
    }, [cartItems])


    const addToCartItems = (productToAdd) => {
        setCartItems(addCartItem(productToAdd, cartItems));
    };


    const value = {isCartOpen, setisCartOpen, cartItems, addToCartItems, cartCount};

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

