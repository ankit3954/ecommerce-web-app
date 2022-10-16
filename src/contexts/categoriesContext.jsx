import {useState, createContext, useEffect} from "react";
import { getCollectionsAndDocuments } from "../utils/firebase.js";


export const CategoriesContext = createContext({
    categoriesMap:{},
});

export const CategoriesProvider = ({children}) => {

    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async() => {
            const categoryMap = await getCollectionsAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        };

        getCategoriesMap();
    }, []);
   
    
    const value = {categoriesMap};

    return(
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
   
};

