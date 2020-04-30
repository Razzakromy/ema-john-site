import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";

const Product = (props) => {
  // console.log(props);
  const { name, seller, price, img, stock } = props.product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>

      <div>
        <h4 className="productName">{name}</h4>
        <p className="sellerName">
          <small>by: {seller}</small>
        </p>
        <p className="price">$ {price}</p>
        <p className="stock">only {stock} left in stock</p>
        <button className="cartBtn" onClick={()=>props.handleAddProduct(props.product)}>
          <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
