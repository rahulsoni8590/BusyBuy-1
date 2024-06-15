import style from "./product.module.css"
import { useCart } from "../../context/cartContext.js"
import { useEffect, useState } from "react"

function ProductDetail(props){
    const {price,title,image,product} = props
    const [extLoad, setextLoad] = useState(false)
    const {addToCart} = useCart()

    useEffect(()=>{
        setTimeout(() => {
            setextLoad(false)
        }, 400);  
    },[extLoad])
    
    const handleCart = (p)=>{
        addToCart(p);
        setextLoad(true)
    }

    return(
        <>
            <div className={style.product}>
                <div className={style.imgcontainer}>
                    <img src={image} alt="productimage"></img>
                </div>
                <div className={style.title}>{title.slice(0,30)}...</div>
                <div className={style.quantity} >Rs. {price}</div>
                <button onClick={()=>{handleCart(product)}} type="button" className = {style.addbutton}>{extLoad?"adding...":"Add to Cart"}</button>
            </div>
        </>
    )
}

export default ProductDetail