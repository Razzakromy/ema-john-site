import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  
  const { name, seller, price, img, stock, key } = props.product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>

      <div>
        <h4 className="productName"> <Link to={"/product/key/"+key}>{name}</Link></h4>
        <p className="sellerName">
          <small>Seller: {seller}</small>
        </p>
        <p className="price">$ {price}</p>
        <p className="stock"> <small> only <span style={{color: 'red'}}>{stock}</span>  left in stock </small></p>
       { props.showaddToCart && 
       <button className="cartBtn" onClick={()=>props.handleAddProduct(props.product)}>
          <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
        </button>}
      </div>
    </div>
  );
};

export default Product;
