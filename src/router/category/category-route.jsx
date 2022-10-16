import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categoriesContext";
import ProductCard from "../../components/products-card/product-card";

import "./category-route.scss"


const Category = () => {

    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext)

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <div className="category-title">{category.toUpperCase()}</div>
            <div className="category-container">
                { products && products.map((product) => {
                    return <ProductCard key={product.id} product={product}/>
                })}
            </div>
        </Fragment>
        
    );


};

export default Category;