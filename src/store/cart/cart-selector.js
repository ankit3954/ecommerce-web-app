import { createSelector } from "reselect";

const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (newCartItems) => newCartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity;
    }, 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (newCartItems) => newCartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity * cartItem.price;
    }, 0)
);

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
);