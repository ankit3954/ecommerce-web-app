import { createContext, useReducer} from "react";



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
 
const INTIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const {type, payload} = action;
    
    switch(type){
        case "SET_CART_ITEMS":
            return {
                ...state,
                ...payload
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

        dispatch({type:"SET_CART_ITEMS", payload:{cartItems: newCartItems, cartCount:newCartCount, cartTotal:newCartTotal } })
    }

    const setisCartOpen = (value) => {
        dispatch({type:"SET_CART_ITEMS", payload:{isCartOpen: value}});
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

