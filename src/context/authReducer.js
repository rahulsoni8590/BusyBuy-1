const AuthReducer = (state,action)=>{
    switch (action.type){
        case "REGISTRATION":
            return{
                ...state,
                user:action.payload,
                error:false,
                loading:false
            }
        case "REGISTRATION_FAIL":
            return{
                ...state,
                error:true,
                message:action.payload,
                loading:false
            }
        case "LOGIN":
            return {
                ...state,
                user:action.payload,
                error:false,
                loading:false
            }
        case "LOGIN_FAIL":
            return{
                ...state,
                user:null,
                error:true,
                message:action.payload,
                loading:false
            }
        case "LOADING":
            return{
                ...state,
                loading:!state.loading
            }
        case "CLEAR":
            return{
                ...state,
                error:false,
                message:""
            }
        case "LOGOUT":
            return{
                ...state,
                user:null,
                error:false,
                message:action.payload,
                loading:false
            }
        case "SETUSER":
            return{
                ...state,
                user:action.payload
            }
        default:
            return state
    }
}

export default AuthReducer