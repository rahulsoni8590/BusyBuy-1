import { useEffect } from "react";
import { useCart } from "../../context/cartContext";
import CartCard from "./cartdetails";
import style from "./cart.module.css";
import { Link } from "react-router-dom";
export default function Cart() {
  const {
    getProductFromCart,
    removeFromCart,
    increaseQuantity,
    descreaseQuantity,
    cart,
    cartPrice,
    addOrder
  } = useCart();

  useEffect(() => {
    getProductFromCart();
  }, []);

  return (
    <>
      <div className={style.main}>
        <div className={style.purchase}>
          <div className={style.priceDetail}>Total Price</div>
          <div className={style.price}>Rs. {cartPrice}</div>
          <Link to={"/order"} >
          <button onClick={addOrder} className={style.placeOrder}>Place Order</button>
          </Link>
        </div>
        <div className={style.products}>
          {cart.map((p, i) => {
            return (
              <CartCard
                key={i}
                product={p}
                increaseQuantity={increaseQuantity}
                descreaseQuantity={descreaseQuantity}
                removeFromCart={removeFromCart}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
