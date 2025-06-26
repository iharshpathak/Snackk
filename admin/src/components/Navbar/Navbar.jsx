import React, { useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../Context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () =>{
  const {token, setToken} = useContext(AdminContext);
  const {login, setShowLogin} = useContext(AdminContext);
  const navigate = useNavigate();  
 
  const onLoginClick = () =>{
    setShowLogin(true);
  }
  const logOut = () =>{
    localStorage.removeItem("Token");
    setToken("");
    navigate("/");
  }
  

  return(
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt=""/>
      {!token?
        <button className="btn" onClick={onLoginClick}>Log In</button>
        :
        <div className='logout-profile'>
        <img className='profile' src={assets.profile_image} alt=""/>
          <ul className="logout-profile-dropdown">
          <li onClick={logOut}><img src={assets.logout_icon} alt="Logout"/><p>Logout</p></li>
          </ul>
        </div>
      }
    </div>
  )
}
export default Navbar