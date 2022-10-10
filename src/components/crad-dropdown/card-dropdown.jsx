import { useContext } from "react";

import Button from "../button/button";
import CartItem from "../cart-items/cart-items";
import { CartContext } from "../../contexts/cartContext";

import "./card-dropdown.scss";


const CardDropdown = () => {

    const {cartItems} = useContext(CartContext);

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item) =>  <CartItem key={item.id} cartItem={item}/> )}
            </div>
            <Button>CheckOut</Button>
        </div>
    );
};

export default CardDropdown;