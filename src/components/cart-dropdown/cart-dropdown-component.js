import "./cart-dropdown-component.scss";
import Button from "../button/button-component";
import CartItem from "../cart-item/cart-item-component";
import { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const checkOutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => {
          return <CartItem key={item.id} cartItem={item} />;
        })}
      </div>
      <Button onClick={checkOutHandler}>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
