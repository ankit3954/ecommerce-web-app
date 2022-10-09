import Button from "../button/button";
import "./card-dropdown.scss";


const CardDropdown = () => {

    return (
        <div className="cart-dropdown-container">
            <div className="card-items" />
            <Button>CheckOut</Button>
        </div>
    );
};

export default CardDropdown;