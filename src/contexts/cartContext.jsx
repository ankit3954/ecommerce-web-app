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


const removeCartItem = (productToRemove, cartItems) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    }

    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ?
         {...cartItem, quantity:cartItem.quantity - 1} 
         : cartItem);


}

const removeAll = (productToRemove, cartItems) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id );
};



export const CartContext = createContext({
    isCartOpen : false,
    setisCartOpen: () => {},
    cartItems: [],
    addToCartItems: () => {},
    cartCount:0,
    removeFromCartItems: () => {},
    removeAllFromCart: () => {},
    cartTotal: 0
});

export const CartProvider = ({children}) => {

    const [isCartOpen, setisCartOpen] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const [cartCount, setCartCount] = useState(0);

    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0);

        setCartCount(newCartCount);
    }, [cartItems])


    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price;
        }, 0);

        setCartTotal(newCartTotal);
    }, [cartItems])


    const addToCartItems = (productToAdd) => {
        setCartItems(addCartItem(productToAdd, cartItems));
    };

    const removeFromCartItems = (productToRemove) => {
        setCartItems(removeCartItem(productToRemove, cartItems))
    };

    const removeAllFromCart = (productToRemove) => {
        setCartItems(removeAll(productToRemove, cartItems));
    };

    const value = {isCartOpen, setisCartOpen, cartItems, addToCartItems, cartCount, removeFromCartItems, removeAllFromCart, cartTotal};

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

