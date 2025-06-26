import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { useState, useEffect } from 'react'
import LoginPopup from './components/LoginPopup/LoginPopup'
import SearchBarPopup from './components/SearchBarPopup/SearchBarPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import NotFound from './pages/NotFound/NotFound'
import { ToastContainer } from 'react-toastify';

function App(){
  const [showLogin, setShowLogin] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery]= useState("");

  return(
    <>
      <ToastContainer/>
      {showLogin? <LoginPopup setShowLogin={setShowLogin}/> :<></>}
      {showSearchBar? <SearchBarPopup setShowSearchBar={setShowSearchBar} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> :<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} setShowSearchBar={setShowSearchBar}/>
        <Routes>
          < Route path='/' element={<Home searchQuery={searchQuery}setSearchQuery={setSearchQuery}/>} />
          < Route path='/cart' element={<Cart />} />
          < Route path='/order' element={<PlaceOrder />} />
          < Route path='/verify' element={<Verify />} />
          < Route path='/myorders' element={<MyOrders />} />
          < Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
export default App