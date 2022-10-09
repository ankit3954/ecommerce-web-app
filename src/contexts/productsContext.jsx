import {useState, createContext} from "react";
import PRODUCTS_DATA from "../products-data.json";


export const ProductsContext = createContext({
    products:null,
});

export const ProductsProvider = ({children}) => {

    const [products, setProducts] = useState(PRODUCTS_DATA);
    const value = {products};

    return(
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
   
};

