import axios from "axios";
import { useContext, useRef, useState} from "react";
import { Link } from "react-router-dom";

import { Context } from "../../Context/Context";
import Toast from "../../components/CustomToast";
import "./login.css";

export default function Login() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const emailRef = useRef();
  const passRef = useRef();
  const {  dispatch, isFetching } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    setErrorMsg("");
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", {
        email: emailRef.current.value,
        password: passRef.current.value,
      });

      if (res.data) {
        setSuccess(true);
          setTimeout(()=>{
            window.location.replace("/");
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          },1500)
          
       
        
      }
    } catch (err) {
      if(err.response.data.error){
        setErrorMsg(err.response.data.error);
      }
      
      setError(true);
      dispatch({ type: "LOGIN_FAILURE" });
      
    }
  };
  
  return (
    <>
    
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          ref={emailRef}
          placeholder="Enter your email..."
          required
        />
        <label>Password</label>
        <input
          type="Password"
          ref={passRef}
          placeholder="Enter your password..."
          required
          minLength="5"
        />
        <button className="loginButton" type="submit">
          {!isFetching && <div>Login</div>}
          {isFetching && (
            <div
              style={{ marginLeft: "5px" }}
              className="spinner-border spinner-border-sm"
              role="status"
            ></div>
          )}
        </button>
      </form>
      <button className="loginRegisterButtom">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
      
      <div className="error-msg">
        
      {success && <Toast msgType="success" message="Login Succesful !"/>}
      {error && errorMsg && <Toast msgType="error" message={errorMsg}/>}
     { error && !errorMsg && <Toast msgType="error" message="Something Went Wrong !"/>
      }
      </div>
    </div>
    </>
  );
}
