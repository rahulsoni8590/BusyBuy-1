import { useEffect, useState } from "react"
import style from "./product.module.css"
import Loader from "../Loader/loader.js"
import Filter from "../filter/filter.js"
import addDataToCollection from "../../firebaseConfig/utils.js"
import { useProduct } from "../../context/productContext.js"
import ProductDetail from "./productDetail.js"
import { toast } from "react-toastify"

export default function Product(){
    const {filteredProduct,loading, getFilterProductFromDB, getProductFromDB} = useProduct()

    const [search, setSearch] = useState("")
    const [priceRange, setPriceRange] = useState(20000)
    const [category, setCategory] = useState({
        men:false,
        women:false,
        jewel:false,
        electronic:false
    })

    useEffect(()=>{
        addDataToCollection() 
        getProductFromDB() 
    },[])

    useEffect(()=>{
        // addDataToCollection() 
        const filterQuery = {priceRange,category,search}
        getFilterProductFromDB(filterQuery)
    },[category,priceRange,search])

    
    if(loading){
        return <Loader/>
    }

    return(
        <>
        <div className={style.searchbar}>
            <input value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search"></input>
        </div>
        <div className={style.main}>
        <div id="Filter">
            <Filter setPriceRange={setPriceRange} setCategory={setCategory} priceRange={priceRange}/> 
        </div>
        <div id="Product">
            <div className={style.products}>
                {filteredProduct.map((p,index)=>{
                    return(
                
                    <ProductDetail 
                        key={index}
                        product= {p}
                        image = {p.image}
                        title = {p.title}
                        price = {p.price}
                    />
                    
                
                    )
                })}
            </div>
        </div>
    </div>
    </>
    )
}