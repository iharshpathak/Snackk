import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets"

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Snackk Logo"/>
          <p>"Hungry? We've got you covered. From comfort food to gourmet treats, we bring flavors straight to your door. Whether it's midnight munchies or weekend feasts, Snackk is here to satisfy every craving. Just a tap away from deliciousness—order now and let the feast begin!"</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook"/>
            <img src={assets.twitter_icon} alt="X"/>
            <img src={assets.linkedin_icon} alt="LinkedIn"/>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@snackk.com</li>
          </ul>
        </div>
      </div>
      <hr/>
        <p className="footer-copyright">Copyright 2025 © Snackk.com - All Rights Reserved.</p>
    </div>
  );
};
export default Footer;
