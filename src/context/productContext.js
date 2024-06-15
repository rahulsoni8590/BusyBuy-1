import { createContext, useContext, useReducer } from "react";
import productReducer from "./productReducer";
import db from "../firebaseConfig/firebase";
import {collection, getDocs } from "firebase/firestore";
const Productcontext = createContext()

export const useProduct = ()=>{
    const value = useContext(Productcontext)
    return value
}

const CustomProductContext = ({children})=>{
    const initialState = {
        products:[],
        filteredProduct:[],
        loading:false,
    }

    const [state, dispatch] = useReducer(productReducer, initialState)
    
    const getProductFromDB = async ()=>{
        dispatch({type:"TOGGLELOADING"})
        const docRef = collection(db, "products")
        const prodSnapShot = await getDocs(docRef)
        // const prodSnapShot = await getDocs(query(docRef))
        const data = prodSnapShot.docs.map((doc)=>{
            return {...doc.data()}
        })
        dispatch({type:"SETPRODUCTS", payload:data})
    }

    const getFilterProductFromDB = async(filterQuery)=>{
        // dispatch({type:"TOGGLELOADING"});
        const {priceRange,category:{
            men,
            women,
            jewel,
            electronic
        },search} = filterQuery
        let filterProduct =  state.products
        if(search){
            filterProduct = filterProduct.filter((p)=>
               p.title.toLowerCase().includes(search.toLowerCase())
            )
        }
        if(priceRange){
            filterProduct = filterProduct.filter((p)=>{
               return p.price < priceRange
            }
            )
        }
        if(men || women || jewel || electronic){
            filterProduct = filterProduct.filter((p)=>{
                if(men && p.category === "men's clothing"){
                    return true
                }

                if(women && p.category === "women's clothing"){   
                    return true
                }
                if(jewel && p.category === "jewelery"){
                    return true
                    }
                if(electronic && p.category === "electronics"){
                    return true
                    }
            return false
            })
        }

        dispatch({type:"FILTERPRODUCT", payload:filterProduct})

    }
    


    return(
    <Productcontext.Provider 
        value={{
            products:state.products,
            filteredProduct:state.filteredProduct,
            loading:state.loading,
            getProductFromDB,
            getFilterProductFromDB
           }}>
        {children}
    </Productcontext.Provider>
    )}


export default CustomProductContext
