import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categoriesContext";
import CategoryPreview from "../../components/categories-preview/categories-preview";

const CategoriesPreview = () => {

    const {categoriesMap} = useContext(CategoriesContext);


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