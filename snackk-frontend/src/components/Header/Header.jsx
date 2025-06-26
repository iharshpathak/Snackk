import React from 'react'
import './Header.css'

const Header = () =>{
  return(
    <div className='header'>
      <div className="header-contents">
        <h2>Order Your Cravings Here !</h2>
        <p>"Craving something delicious? We've got you covered! Snack is your go-to spot for irresistible bites, made with top-tier ingredients and packed with flavor. Whether it's a midnight snack or a feast with friends, we bring the best straight to your doorstep—fast, fresh, and oh-so-satisfying !!"</p>
        <a href='#explore-menu'><button>Order Now</button></a>
      </div>
    </div>
  )
}
export default Header