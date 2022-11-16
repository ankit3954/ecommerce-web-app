import Button from "../button/button";
import "./product-card.scss"
import { addToCartItems } from "../../store/cart/cart-action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart-selector";

const ProductCard = ({product}) => {

    const {name, price, imageUrl} = product;
   const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => dispatch(addToCartItems(product, cartItems));

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt = {`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}$</span>
            </div>
            <Button buttonType="inverted" onClick={addProductToCart}>Add to cart</Button>
        </div>
    );
};

export default ProductCard;