import React from "react";
import Category from "../Category/Category.js";
import "./Categories.scss"


const Categories = (props) => {
   const {items} = props; 
    return(
        <div className="categories">
            {items.map((elem) => {
               return <Category key={elem.id} item={elem}/>
            })}
        </div>
    );
};

export default Categories;