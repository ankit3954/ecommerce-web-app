import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview-route";
import Category from "../category/category-route";

const Shop = () => {

    return (
        <div className="shop-container">
          <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
          </Routes>
        </div>
        
    );
};

export default Shop;