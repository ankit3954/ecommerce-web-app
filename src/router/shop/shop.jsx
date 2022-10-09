import { useContext } from "react";
import { ProductsContext } from "../../contexts/productsContext";
import ProductCard from "../../components/products-card/product-card";
import "./shop.scss"

const Shop = () => {

    const {products} = useContext(ProductsContext);


    return (
        <div className="products-container">
            {products.map((product) => 
            <div key={product.id}>
                <ProductCard product={product}/>
            </div>)}
        </div>
    );
};

export default Shop;