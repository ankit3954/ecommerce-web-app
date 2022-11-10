import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview-route";
import Category from "../category/category-route";
import { useEffect} from "react";
import { getCollectionsAndDocuments } from "../../utils/firebase";
import { setCategoriesMap } from "../../store/category/category-action";
import { useDispatch } from "react-redux";

const Shop = () => {


const dispatch = useDispatch();

useEffect(() => {
  const getCategoriesMap = async() => {
      const categoryMap = await getCollectionsAndDocuments();
      dispatch(setCategoriesMap(categoryMap));
  };

  getCategoriesMap();
}, []);


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