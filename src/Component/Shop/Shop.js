import React, { useState } from "react";
import fakeData from "../../fakeData";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setproducts] = useState(first10);
  const [cart, setcart] = useState([]);
  
  const handleAddProduct = (product) => {
    console.log("Product Added", product);
    const newCart = [...cart, product];
    setcart(newCart);
    };

  return (
    <div className="shopContainer">
      <div className="productContainer">
        <h3>
          {products.map((pd) => (
            <Product handleAddProduct={handleAddProduct} product={pd}></Product>
          ))}
        </h3>
      </div>
      <div className="cartContainer">
       <Cart cart={cart}></Cart>
        
      </div>
    </div>
  );
};
export default Shop;
