import React, { useState, useEffect } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";
import axios from "axios";
import {toast} from 'react-toastify'

const LoginPopup =({url})=>{
  const {login, setShowLogin} = useContext(AdminContext);
  const {token, setToken} = useContext(AdminContext);
  const [currState, setCurrState] = useState(false);

  
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const onChangeHandler = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }

  const onLogin = async (event)=>{
    event.preventDefault();
    const newUrl = url + "/api/admin/login";
    const response = await axios.post(newUrl, data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("Token", response.data.token);
      setShowLogin(false);
      setData({ email: "", password: "" });
    }else{
      toast.error("Invalid Credentials")
    }
    
  }

  //disable scrolling when popup is open
  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  
    return (
      login === true ? (
        <div className='login-popup' onClick={() => setShowLogin(false)}>
          <form onSubmit={onLogin} className='login-popup-container' onClick={(e) => e.stopPropagation()}>
            <div className='login-popup-title'>
              <h2>Log In</h2>
              <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close"/>
            </div>
            <div className='login-popup-inputs'>
              <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required/>
              <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
            </div>
            <button type='submit'> Log In</button>
          </form>
        </div>
      ) : null
    );

}

export default LoginPopup;