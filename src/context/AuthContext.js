import { createContext, useContext, useEffect, useReducer } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import AuthReducer from "./authReducer";
import { toast } from "react-toastify";
// import { auth } from "../firebaseConfig/firebase";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import db from "../firebaseConfig/firebase";

const AuthContext = createContext();

export const useAuth = () => {
  const value = useContext(AuthContext);
  return value;
};

const AuthProvider = ({ children }) => {
  const auth = getAuth()

  const initialState = {
    user: null,
    userid:null,
    error: false,
    message: "",
    loading: false,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setUser = (user) => {
    dispatch({ type: "SETUSER", payload: user });
  };

  const handleRegister = async (data) => {
    try {
      dispatch({ type: "LOADING" });
      const { name, email, password } = data;
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // await updateProfile(auth.currentUser,{displayName:name})
      dispatch({ type: "REGISTRATION", payload: result.user });
    } catch (error) {
      console.log(error);
      dispatch({ type: "REGISTRATION_FAIL", payload: error.message });
    }
  };

  const handleLogin = async (data) => {
    const {email, password} = data
    try {
      dispatch({ type: "LOADING" });
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      console.log("Login successfull");
      dispatch({ type: "LOGIN", payload: result.user });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAIL", payload: error.message });
    }
  };

  const handleLogout = async () => {
    try {
      console.log("initial handlelogout");
      const result = signOut(auth);
      toast.message("Logout successfull");
      console.log(result);
      dispatch({ type: "LOGOUT", payload: "Logout successfull" });
    } catch (error) {
      dispatch({ type: "CLEAR" });
    }
  };

  const clearErrorMsg = () => {
    dispatch({ type: "CLEAR" });
  };

  const changeLoadingState = () => {
    dispatch({ type: "LOADING" });
  };

  useEffect(() => {
    dispatch({ type: "LOADING" });
    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      // if (currUser) {
      //   const docSnap = await getDoc(doc(db, "users", currUser.email));
      //   const user = docSnap.data();
      //   setUser(user);
      // }

    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        message: state.message,
        error: state.error,
        loading: state.loading,
        handleLogin,
        handleRegister,
        handleLogout,
        clearErrorMsg,
        changeLoadingState,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
