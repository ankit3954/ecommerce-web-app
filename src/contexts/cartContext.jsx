import { createContext, useReducer} from "react";

import { CreateAction } from "../utils/reducers/createAction";

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

const CART_ITEMS_ACTIONS = {
    SET_CART_ITEMS:"SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
}
 
const INTIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const {type, payload} = action;
    
    switch(type){
        case CART_ITEMS_ACTIONS.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ITEMS_ACTIONS.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen:payload
            }
        default:
            throw new Error(`Unhandle type of ${Error} in set cart items`);
    }
};


export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, INTIAL_STATE);

    const {cartCount, cartItems, cartTotal, isCartOpen} = state;

    const setUpdateCartItems = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price;
        }, 0);

        dispatch(CreateAction("SET_CART_ITEMS", {cartItems: newCartItems, cartCount:newCartCount, cartTotal:newCartTotal}))
    }

    const setisCartOpen = (value) => {
        dispatch(CreateAction("SET_IS_CART_OPEN",value));
    }

    const addToCartItems = (productToAdd) => {
        const newCartItems = addCartItem(productToAdd, cartItems);
        setUpdateCartItems(newCartItems);
    };

    const removeFromCartItems = (productToRemove) => {
        const newCartItems = removeCartItem(productToRemove, cartItems);
        setUpdateCartItems(newCartItems);
    };

    const removeAllFromCart = (productToRemove) => {
        const newCartItems = removeAll(productToRemove, cartItems);
        setUpdateCartItems(newCartItems);
    };

    const value = {isCartOpen, setisCartOpen, cartItems, addToCartItems, cartCount, removeFromCartItems, removeAllFromCart, cartTotal};

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

