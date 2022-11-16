import {Fragment } from "react";
import CategoryPreview from "../../components/categories-preview/categories-preview";
import { selectCategoriesMap } from "../../store/category/category-selector";
import { useSelector } from "react-redux";

const CategoriesPreview = () => {
    
    const categoriesMap = useSelector(selectCategoriesMap);

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title];
                    return(
                        <CategoryPreview title={title} key={title} products={products}/>
                    );      
                })
            }   
        </Fragment>
        
    );
};

export default CategoriesPreview;