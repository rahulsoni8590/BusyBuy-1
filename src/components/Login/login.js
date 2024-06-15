// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useEffect, useRef } from "react"
// import { toast } from "react-toastify";
// import { useAuth } from "../../context/AuthContext";

// const Login = ()=>{
//     const{user,message,error,loading,handleLogin,clearErrorMsg = useRef} = useAuth()
//     const emailRef = useRef()
//     const passwordRef = useRef()
//     const navigate = useNavigate()
//     console.log(user)
//     if(user){
//         navigate("/")
//     }

//     useEffect(()=>{
//         if(user){
//             navigate("/")
//         }
//         if(error){
//             toast.error(error.message)
//             clearErrorMsg()
//         }
//     },[message,user,error])

//     const handleSubmit = async (e)=>{
//         e.preventDefault()

//         const email = emailRef.current.value
//         const password = passwordRef.current.value
//         if(email === "" || password === ""){
//             return toast.error("Pls enter Correct detail")
//         }
//         const data = {email,password}
//         console.log("login")
//         await handleLogin(data)
//     }

//     return(
//         <div>
//         <form onSubmit={handleSubmit}>
//             <h2>Login</h2>
//             <input ref={emailRef} name="email" type="text" placeholder="Enter Email"></input>
//             <input ref={passwordRef} name="password" type="password" placeholder="Enter Passwor"></input>
//             <button >{loading?"...":"Login"}</button>
//             <Link to={"/register"}>
//                 <div>Register, if not</div>
//             </Link>
//         </form>
//         {error && <p>{error}</p>}
//         </div>
//     )
// }

// export default Login;

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const { user, error, loading, handleLogin, clearErrorMsg } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
        if (error) {
            toast.error(error.message);
            clearErrorMsg();
        }
    }, [user, error, navigate, clearErrorMsg]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (email === "" || password === "") {
            return toast.error("Please enter correct details");
        }
        const data = { email, password };
        await handleLogin(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input ref={emailRef} name="email" type="text" placeholder="Enter Email" />
                <input ref={passwordRef} name="password" type="password" placeholder="Enter Password" />
                <button type="submit">{loading ? "..." : "Login"}</button>
                <Link to={"/register"}>
                    <div>Register, if not</div>
                </Link>
            </form>
            {error && <p>{error.message}</p>}
        </div>
    );
};

export default Login;