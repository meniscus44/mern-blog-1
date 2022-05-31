import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import "./topbar.css"

export default function TopBar() {
    const {user,dispatch} = useContext(Context);
    const handleLogout=()=>{
        localStorage.clear();
        dispatch({type:"LOGOUT"});
        window.location.replace("/login");

    }
return (
<>
    <div className="top">
        <div className="topLeft">
            <i className=" topIcon fab fa-facebook"></i>
            <i className=" topIcon fab fa-twitter"></i>
            <i className=" topIcon fab fa-pinterest"></i>
            <i className=" topIcon fab fa-instagram"></i>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem"><Link className="link" to="/">HOME</Link></li>
                {/* <li className="topListItem"><Link className="link" to="/">ABOUT</Link></li> */}
                {/* <li className="topListItem"><Link className="link" to="/">CONTACT</Link></li> */}
                <li className="topListItem"><Link className="link" to="/write">{user && "WRITE"}</Link></li>
                <li className="topListItem" onClick={handleLogout}>
                    {user && "LOGOUT"}
                </li>
            </ul>
        </div>
        <div className="topRight">
            {
                user ? (
                    <img className="topImage" src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                ) : (
                    <ul className="topList">
                        <li className="topListItem">
                            <Link className="link" to="/login">LOGIN</Link>
                        </li>
                        <li className="topListItem">
                            <Link className="link" to="/register">REGISTER</Link>
                        </li>
                    </ul>
                )
            }
            
            <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
</>
)
}
