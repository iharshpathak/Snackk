import React from 'react'
import './SearchBarPopup.css'
import { assets } from '../../assets/assets'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js'

const SearchBarPopup = ({setShowSearchBar,searchQuery, setSearchQuery}) =>{
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();


  const searchHandler = (event) => {
    const searchInput = event.target.value;
    setInputValue(searchInput);

    const normalized = searchInput.trim().toLowerCase();

    const categories = [
      "Burgers",
      "Rolls",
      "Dessert",
      "Sandwich",
      "Cake",
      "Pure Veg",
      "Pasta",
      "Noodles"
    ];

    const fuse = new Fuse(categories, {
      includeScore: false,
      threshold: 0.4
    });

    const results = fuse.search(normalized);
    if (results.length > 0) {
      setSearchQuery(results[0].item);
    } else {
      setSearchQuery("");
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputValue.trim() !== "") {
      if (!searchQuery) {
        toast.warn("No matching category found.");
        return;
      }

      setShowSearchBar(false);
      setInputValue("");
      const target = document.getElementById("food-display");
      navigate("/");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      toast.info("Please Type Something to Search");
    }
  }

  
  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  
  return(
      <div className='search-bar-popup'onClick={() => setShowSearchBar(false)}>
        <form className='search-bar-popup-container' 
          onSubmit={handleSubmit} 
          onClick={(e) => e.stopPropagation()}>
          <div className='search-bar-popup-title'>
            <h2>Search The Delicacies</h2>
            <img onClick={()=>setShowSearchBar(false)} src={assets.cross_icon} alt="close"/>
          </div>
          <div className='search-bar-popup-inputs'>
            <div className='input-wrapper'>
              <input onChange={searchHandler} type="text" placeholder='Search Here' required/>
                <img onClick={handleSubmit} src={assets.search_icon} alt="search" />
              <button type="submit" style={{ display: "none" }}></button>
            </div>
          </div>
        </form>
      </div>
  )
}
export default SearchBarPopup;