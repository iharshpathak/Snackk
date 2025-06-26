import React from 'react'
import './NotFound.css'
import { useNavigate } from 'react-router-dom'

const NotFound = () =>{
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate('/');
    }
    return(
        <div className='not-found'>
            <h1>Oops! Snackk Lost !!</h1>
            <img src="/404.png" alt="Sanckk Not Found" />
            <div className='contents'>
                <h2>Let’s get you back on the tasty trail !</h2>
                <button className="btn" onClick={handleClick}>Take Me to the Buffet !</button>
            </div>
            
        </div>
    )
        
}
export default NotFound;