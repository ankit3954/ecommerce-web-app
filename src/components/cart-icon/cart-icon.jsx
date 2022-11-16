import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg" 
import "./cart-icon.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart-selector";
import { setisCartOpen } from "../../store/cart/cart-action";


const CartIcon = () => {

    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    
    const toggleisCartOpen = () => dispatch(setisCartOpen(!isCartOpen));


    return (
        <div className="cart-icon-container" onClick={toggleisCartOpen}>
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">{cartCount}</span>
        </div>
    );
};

export default CartIcon;