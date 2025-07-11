import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import {StoreContext} from '../../context/StoreContext'
import { useNavigate } from "react-router-dom";

// const Navbar = ({setShowLogin, setShowSearchBar, menu, setMenu}) =>
const Navbar = ({setShowLogin, setShowSearchBar}) => {
  const [menu, setMenu] = useState("home");
  const {getTotalCartAmount, token, setToken} = useContext(StoreContext);
  const navigate = useNavigate();

  const logOut = () =>{
    localStorage.removeItem("Token");
    setToken("");
    navigate("/");
  }
  
  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} alt="snackk logo" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=> setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={()=> setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={()=> setMenu("mobile app")} className={menu === "mobile app" ? "active" : ""}>mobile app</a>
        <a href="#footer" onClick={()=> setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img onClick={()=>setShowSearchBar(true)} src={assets.search_icon} alt="search icon" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="basket icon" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?
          <button onClick={()=>setShowLogin(true)}>Log In | Sign Up</button>
        :<div className="navbar-profile">
          <img src={assets.profile_icon} alt="User Profile"/>
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="Orders"/><p>Orders</p></li>
            <hr/>
            <li onClick={logOut}><img src={assets.logout_icon} alt="Logout"/><p>Logout</p></li>
          </ul>
        </div>}
      </div>
    </div>
  );
};
export default Navbar;
