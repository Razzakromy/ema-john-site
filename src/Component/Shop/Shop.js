import React, { useState, useEffect } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setproducts] = useState([]);
  const [cart, setcart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then(res => res.json())
      .then(data => {
        setproducts(data)
      })
  }, [])

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productkeys = Object.keys(savedCart)
    if(products.length > 0){
      const prvCart = productkeys.map(existingkey => {
        const product = products.find(pd => pd.key === existingkey);
        product.quantity = savedCart[existingkey]
        return product;
      })
      setcart(prvCart);
    }
  }, [products])

  const handleAddProduct = (product) => {
    const toBeAdded = product.key
    const sameProducts = cart.find(pd => pd.key === toBeAdded);
    let count = 1;
    let newCart;
    if (sameProducts) {
      count = sameProducts.quantity + 1;
      sameProducts.quantity = sameProducts.quantity + 1;
      const others = cart.filter(pd => pd.key !== toBeAdded)
      newCart = [...others, sameProducts]
    }
    else {
      product.quantity = 1;
      newCart = [...cart, product]
    }

    setcart(newCart);

    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="twinContainer">
      <div className="productContainer">
        <h3>
          {products.map((pd) => (
            <Product
              key={pd.key}
              showaddToCart={true}
              handleAddProduct={handleAddProduct}
              product={pd}></Product>
          ))}
        </h3>
      </div>
      <div className="cartContainer">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="cartBtn">Review</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};
export default Shop;
