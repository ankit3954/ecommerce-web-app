import { useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import ProductCard from "../../components/products-card/product-card";
import { selectCategoriesMap } from "../../store/category/category-selector";
import "./category-route.scss"
import { useSelector } from "react-redux";


const Category = () => {

    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    

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