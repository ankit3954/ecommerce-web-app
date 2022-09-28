import React from "react";
import "./Category.scss"

const Category = (props) => {

    const {imageUrl, title} = props.item;
    return(
        <div className="category">
            <div className="background-image" style={{backgroundImage:`url(${imageUrl})`}}/>
            <div className="category-body">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>     
        </div>
    );
};

export default Category;