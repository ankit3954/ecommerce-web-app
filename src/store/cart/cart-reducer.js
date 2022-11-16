import { CART_ITEMS_ACTIONS } from "./cart-types";

const CART_INTIAL_STATE = {
    isCartOpen: false,
    cartItems: []
}

export const cartReducer = (state = CART_INTIAL_STATE, action = {}) => {
    const {type, payload} = action;
    
    switch(type){
        case CART_ITEMS_ACTIONS.SET_CART_ITEMS:
            return {
                ...state,
                cartItems:payload
            }
        case CART_ITEMS_ACTIONS.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen:payload
            }
        default:
            return state;
    }
};