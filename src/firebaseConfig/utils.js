import data from "./data";

import db from "./firebase";
import { doc,writeBatch } from "firebase/firestore";


// adding data to firebase
const addDataToCollection = async ()=>{
    try{
        const batch = writeBatch(db);
        data.forEach((prod)=>{
            const docRef = doc(db,"products", prod.id.toString())
            batch.set(docRef, prod)
        });

        await batch.commit();
    }catch(err){
        console.log(err)
    }

}

export default addDataToCollection