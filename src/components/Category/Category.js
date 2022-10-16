import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.scss"

const Category = (props) => {

    const {imageUrl, title, route} = props.item;

    const navigate = useNavigate();

    const routeHandler = () => navigate(route);
    
    return(
        <div className="category" onClick={routeHandler}>
            <div className="background-image" style={{backgroundImage:`url(${imageUrl})`}}/>
            <div className="category-body">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>     
        </div>
    );
};

export default Category;