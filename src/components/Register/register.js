import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const Registration = () => {
  const { user, message, error, loading, handleRegister, clearErrorMsg } =
    useAuth();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {

      console.log(user)
      navigate("/");
      console.log(user)

    }
    if (error) {
      toast.error(error.message);
      clearErrorMsg();
    }
  }, [message, user, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nameRef);
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (name === "" || email === "" || password === "") {
      return toast.error("Pls enter Correct detail");
    }
    const data = { name, email, password };
    await handleRegister(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <input
          ref={nameRef}
          name="name"
          type="text"
          placeholder="Enter Name"
        ></input>
        <input
          ref={emailRef}
          name="email"
          type="text"
          placeholder="Enter Email"
        ></input>
        <input
          ref={passwordRef}
          name="password"
          type="password"
          placeholder="Enter Passwor"
        ></input>
        <button>{loading ? "..." : "Register"}</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Registration;
