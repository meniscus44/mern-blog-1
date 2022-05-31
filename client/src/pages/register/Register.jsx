import { Link } from "react-router-dom";
import { useState } from "react";
import "./register.css";
import axios from "axios";
import Toast from "../../components/CustomToast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setSuccess(false);
    setError(false);
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      if(res.data.data){
        res.data.data && setSuccess(true);
        setTimeout(()=>{
          window.location.replace("/login");
        },1500)
      }
      

    } catch (err) {
      if (err.response.status === 400) setEmailError(true);
      else setError(true);
      
    }
  };

  return (
    <>
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name..."
          onChange={(e) => setName(e.target.value)}
          required
          minLength="5"
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="Password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="5"
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButtom">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      <div className="error-msg">
      {success && <Toast msgType="success" message="User Registration Succesful !"/> }
      {emailError && <Toast msgType="error" message="Email Already Exists !"/> }
      {error &&  <Toast msgType="error" message="Something Went Wrong !"/> }
      </div>
    </div>
    </>
  );
}
