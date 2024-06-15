const cartReducer = (state,action)=>{
switch (action.type){
    case "GET":
        return{
            ...state,
            cart:action.payload.data,
            cartPrice:action.payload.price
        }
    case "LOAD":
        return{
            ...state,
            load:!state.load
        }
    case "GET_ORDER":
        return{
            ...state,
            load:false,
            order:action.payload
        }
    default:
        return state
}
}

export default cartReducer