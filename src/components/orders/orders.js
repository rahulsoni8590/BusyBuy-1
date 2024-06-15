import { useEffect } from "react"
import { useCart } from "../../context/cartContext"
import styles from "./order.module.css"

export default function Order () {
    const {getOrders,order} = useCart()
    
    useEffect(()=>{
        getOrders()
    }, [])
    console.log(order)

    return(
        <div class= {styles.orderContainer}>
            <div className={styles.orders}>
            <h1>Your Orders</h1>
            </div>
            { order.map((ord)=>{
                return(
                    <>
                    <div>
                <h3>Order On:</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                {ord.items.map((itm)=>{
                    return(<>
                        <tr>
                        <td>{itm.title.slice(0,30) + "..."}</td>
                        <td>Rs. {itm.price}</td>
                        <td>{itm.quantity}</td>
                        <td>Rs. {itm.price * itm.quantity}</td>
                    </tr>

                    <tr className={styles.totalPrice}>
                        
                        <td>{ord.details.orderAmount}</td>
                    </tr>
                    </>)
                })}
                    
                </tbody>
            </table>
        </div>
                    </>
                )
            })
            }
        </div>
    )
}