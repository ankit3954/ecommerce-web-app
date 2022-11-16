import { CreateAction } from "../../utils/reducers/createAction";
import { CART_ITEMS_ACTIONS } from "./cart-types";

// export const setUpdateCartItems = (newCartItems) => {
  

//     CreateAction("SET_CART_ITEMS", {cartItems: newCartItems, cartCount:newCartCount, cartTotal:newCartTotal});
// }

export const setisCartOpen = (value) => {
  return  CreateAction(CART_ITEMS_ACTIONS.SET_IS_CART_OPEN, value);
}

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

export const addToCartItems = (productToAdd, cartItems) => {
    const newCartItems = addCartItem(productToAdd, cartItems);
   return CreateAction(CART_ITEMS_ACTIONS.SET_CART_ITEMS, newCartItems);
};

export const removeFromCartItems = (productToRemove, cartItems) => {
    const newCartItems = removeCartItem(productToRemove, cartItems);
   return CreateAction(CART_ITEMS_ACTIONS.SET_CART_ITEMS, newCartItems);
};

export const removeAllFromCart = (productToRemove, cartItems) => {
    const newCartItems = removeAll(productToRemove, cartItems);
   return CreateAction(CART_ITEMS_ACTIONS.SET_CART_ITEMS, newCartItems);
};