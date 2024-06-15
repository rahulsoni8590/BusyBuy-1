import style from "./filter.module.css"
import { useEffect, useState } from "react"

export default function Filter(props){
   const {setCategory,setPriceRange,priceRange} = props
    return(
        <>
        <div className={style.side}>
            <div className={style.filtercontainer}>
                <div className={style.filter}>
                    <h1>Filter</h1>
                    <div>
                    <label for="filter">Price:{priceRange} </label>
                    <div>
                    </div>
                    <input type="range" id="price" name="filter" min="1" max="30000" value={priceRange} onChange={(e) => setPriceRange(parseInt(e.target.value))} step="10" />
                    </div>
                </div>
                <div className={style.category}>
                    <h1>category</h1>
                    <ul >
                        <li>
                            <input onChange={(e)=>{setCategory((prev)=>({
                                ...prev, men:e.target.checked
                            }))}} type="checkbox" name="men" id="men"></input>
                            <label for="men">Men's Clothing</label>
                        </li>
                        <li>
                            <input onChange={(e)=>{setCategory((prev)=>({
                                ...prev,women:e.target.checked
                            }))}} type="checkbox" name="women" id="women"></input>
                            <label for="women">Women's Clothing</label>
                        </li>
                        <li>
                            <input onChange={(e)=>{setCategory((prev)=>({
                                ...prev,jewel:e.target.checked
                            }))}} type="checkbox" name="jewel" id="jewel"></input>
                            <label for="jewel">Jewelery</label>
                        </li>
                        <li>
                            <input onChange={(e)=>{setCategory((prev)=>({
                                ...prev,electronic:e.target.checked
                            }))}}  type="checkbox" name="electronic" id="electronic"></input>
                            <label for="electronic">Electronics</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
    )
}