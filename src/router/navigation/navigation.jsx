import { Fragment} from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon";
import CardDropdown from "../../components/crad-dropdown/card-dropdown";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase";
import "./navigation.scss"
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user-selector";
import { selectIsCartOpen } from "../../store/cart/cart-selector";

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
 

    return (
    <Fragment>  
    <div className="navigation">
        <Link className="logo-container" to={"/"}>
          <div className="logo">
            <CrwnLogo />
          </div>
        </Link>
      <div className="nav-links-container">
        <Link className="nav-link" to={"/shop"}>
            SHOP
        </Link>

        {currentUser ? (
          <span className="nav-link" onClick={signOutUser}>
            SIGN-OUT
          </span>
        ) : (
          <Link className="nav-link" to={"/auth"}>
            SIGN-IN
          </Link>
        )}
        <CartIcon/>
      </div>

      {isCartOpen && (<CardDropdown/>)}
    </div> 
    <Outlet />
    </Fragment>
    );
}

export default Navigation;