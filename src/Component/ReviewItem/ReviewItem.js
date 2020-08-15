import React from "react";

const ReviewItem = (props) => {
  const { name, quantity, key, price} = props.product;
  const reviewItemStyle = {
    borderBottom: "1px solid lightgray",
    paddingBottom: "5px",
    marginBottom: "5px",
    marginLeft: "200px"
  }
      
  
  return (
    <div style={reviewItemStyle}>
      <h4 className="productName">{name}</h4>
      <p>Quantity: {quantity}</p>
  <p><small>$ {price}</small></p>
      <button 
      className="cartBtn"
      onClick={()=>props.removeProduct(key)}
      >Remove</button>
    </div>
  );
};

export default ReviewItem;
