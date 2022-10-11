import {useContext } from "react";
import { CartContext } from "../../contexts/cartContext";
import "./checkout-items-card.scss"

const CheckOutCards = ({cartItem}) => {

    const {name, price, quantity, imageUrl} = cartItem;

    const { removeFromCartItems, addToCartItems, removeAllFromCart} = useContext(CartContext);

    const addItemHandler = () => addToCartItems(cartItem);
    const removeItemHandler = () => removeFromCartItems(cartItem);
    const clearItemHandler = () => removeAllFromCart(cartItem);


    return (
        <div className="checkout-item-container">
            <div className="image-container">
            <img src={imageUrl} alt={`${name}`}></img>
            </div>
            
            <span className="name">{name}</span>

            <span className="quantity">
                <div className="arrow" onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>

            <span className="price">{price}</span>

            <div className="remove-button" onClick={clearItemHandler}>
                 &#10005;
            </div>
            


        </div>
    );
};

export default CheckOutCards;