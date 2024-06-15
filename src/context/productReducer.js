const productReducer = (state,action)=>{
    switch(action.type){
        case "SETPRODUCTS":
            return{
                ...state,
                products:action.payload,
                filteredProduct:action.payload,
                loading:false,
            };
        case "TOGGLELOADING":
            return {
                ...state,
                loading:!state.loading
            };
        case "FILTERPRODUCT":
            return{
                ...state,
                filteredProduct:action.payload,
                loading:false
            }
        default:
            return state;
    }
}

export default productReducer