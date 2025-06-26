import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import { useEffect } from "react"

const ExploreMenu = ({ category, setCategory, searchQuery, setSearchQuery }) => {

  useEffect(() => {
    if (searchQuery === "") {
      setCategory("All");
    } else {
      setCategory(searchQuery);
    }
  }, [searchQuery]);
  
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Find Your Next Bite</h1>
      <p className="explore-menu-text">
        From mouthwatering bites to indulgent feasts, our menu is packed with
        flavors that hit the spot. We’re here to turn your cravings into pure
        satisfaction—one delicious order at a time !
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name,
                )
              }
              className="explore-menu-list-item"
              key={index}
            >
              <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};
export default ExploreMenu;
