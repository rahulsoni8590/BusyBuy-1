import { collection, deleteDoc, doc, onSnapshot, setDoc,runTransaction, addDoc} from "firebase/firestore";
import { toast } from "react-toastify";

import db from "../firebaseConfig/firebase";
import { createContext, useContext, useReducer } from "react";
import cartReducer from "./cartReducer";
const cartContext = createContext();

export const useCart = ()=>{
    const value = useContext(cartContext)
    return value;
}

const initialState = {
    cart:[],
    load:false,
    message:"",
    cartLength:0,
    cartPrice:0,
    order:[]
}


const CartProvider = ({children})=>{
    const [state, dispatch] = useReducer(cartReducer, initialState)

    //mount cart/price
    const getProductFromCart = ()=>{
        const ref = collection(db,"cart")
        const snap = onSnapshot(ref, (snap)=>{
            const dataArray = snap.docs.map((doc)=>{return doc.data()})
            const price = dataArray.reduce((ans,p)=> {return (ans + (p.quantity * p.price))}, 0)
            dispatch({type:"GET", payload:{data:dataArray,price:price}})
        })

    }
//firebase
    const addToCart = async (product)=>{
        const id = product.id.toString()
        product.quantity = 1
        const ref = doc(db, "cart", id)
        const add = await setDoc(ref, product) 
        // getProductFromCart() //this will set the state to current product cart items
        return 
    }

    const removeFromCart = async (productid)=>{
        const id = productid.toString()
        const ref = doc(db,"cart",id)
        const result = await deleteDoc(ref)
        toast.success("Item Removed from Cart")
        return
    }

    const increaseQuantity = async (productid)=>{
        const id = productid.toString()
    // Create a reference to the SF doc.
        const sfDocRef = doc(db, "cart", id);
    try {
        const updateQuantity = await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);
        if (!sfDoc.exists()) {
        return "Document does not exist!";
        }
        const newQuantity = sfDoc.data().quantity + 1;
        transaction.update(sfDocRef, { quantity: newQuantity });
    });
        } catch (e) {
        console.error(e);
        }
    }
    
const descreaseQuantity = async (productid)=>{
    const id = productid.toString()
    const ref = doc(db,"cart",id)
    try{
        const updateQuantity = await runTransaction(db, async(transaction)=>{
        const getdoc = await transaction.get(ref);
        if(!getdoc.exists()){
            return "Doc not present"
        }
        const newQuantity = getdoc.data().quantity - 1
        if(newQuantity>0){
            return transaction.update(ref, {quantity:newQuantity})
        }else{   
            removeFromCart(productid)
            return Promise.reject("Can't complete")
        }
        })  
        }catch(error){
            console.log(error)
        }
    }


    const setLoad = ()=>{
        dispatch({type:"LOAD"})
    }

    const addOrder = async() => {
        dispatch({type:"LOAD"})
        const order = {items:[...state.cart],details:{orderDate:new Date(),orderAmount:state.cartPrice}}
        const ref = collection(db,"order")
        const add = await addDoc(ref, order)
        await emptyCart()
        dispatch({type:"LOAD"})
    }

    const emptyCart = async ()=>{
        state.cart.map( async (obj)=>{
            const id = obj.id.toString()
            const ref = doc(db,'cart',id)
            await deleteDoc(ref)
        })
        dispatch({type:"GET", payload:{data:[],price:0}})
        return
    }

    const getOrders = async ()=>{
        const ref = collection(db, "order")
        const snapShot = await onSnapshot(ref,(snap)=>{
            const data = snap.docs.map((doc)=> doc.data())
            dispatch({type:"GET_ORDER", payload:data})
        })
    }

    return(
        <cartContext.Provider
            value={{
                getProductFromCart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                descreaseQuantity,
                setLoad,
                addOrder,
                getOrders,
                order:state.order,
                cart:state.cart,
                load:state.load,
                cartLength:state.cartLength,
                cartPrice:state.cartPrice
            }}
            >
            {children}
        </cartContext.Provider>
    )
}


export default CartProvider;



