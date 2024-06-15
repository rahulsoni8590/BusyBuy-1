import style from "./cart.module.css";

function CartCard(props) {
  const {product, removeFromCart,increaseQuantity,descreaseQuantity} = props;
  return (
    <div className={style.product}>
      <div className={style.imgcontainer}>
        <img src={product.image} alt="productimage"></img>
      </div>
      <div className={style.title}>{product.title.slice(0,15)}...</div>
      <div className={style.quantity}>
        <div>Rs. {product.price}</div>
        <div>{product.quantity}</div>
        <button type="button" onClick={()=>{descreaseQuantity(product.id)}} className="button">
          -
        </button>
        <button type="button" onClick={()=>{increaseQuantity(product.id)}} className="button">
          +
        </button>
      </div>
      <div>
        <button type="button" onClick={()=>{removeFromCart(product.id)}} className={style.revbutton}>
          Remove From Cart
        </button>
      </div>
    </div>
  );
}


export default CartCard