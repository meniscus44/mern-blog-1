import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/api/cat/getAllCategories/");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Me</span>
        <img
          className="sidebarImg"
          src="https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio soluta
          quod labore incidunt.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => {
            return (
              <li key={c.name} className="sidebarListItem">
                <Link to={`/?cat=${c.name}`} className="link">
                  {c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow Us</span>
        <div className="sidebarSocial">
          <i className=" sidebarIcon fab fa-facebook"></i>
          <i className=" sidebarIcon fab fa-twitter"></i>
          <i className=" sidebarIcon fab fa-pinterest"></i>
          <i className=" sidebarIcon fab fa-instagram"></i>
        </div>
      </div>
    </div>
  );
}
