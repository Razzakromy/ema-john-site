import React from "react";
import "./Cart.css";

const Cart = (props) => {
  const cart = props.cart;
  // const total = cart.reduce((total,prdcts) => total+prdcts.price,0)
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price;
  }
  let shippingCost = 0;
  if (total >50) {
    shippingCost = 0;
  } else if (total > 35) {
    shippingCost = 5.99;
  } else if (total > 25) {
    shippingCost = 9.99;
  } else if (total > 0) {
    shippingCost = 12.99;
  }
  let tax = total / 10;

  const formatNumber = num => {
      const format = num.toFixed(2);
      return Number(format)
  }

  return (
    <div>
      <h1>Cart Item</h1>
      <p>Order Summary: {cart.length} Pcs</p>
      <h4 className="product-price">Product Price: {formatNumber(total)} $</h4>
      <p className="shipping">
        <small>Shipping Cost: {formatNumber(shippingCost)} $</small>
      </p>
      <p className="taxVat">Tax+VAT: {formatNumber(tax)} $ </p>
      <hr/>
      <h3 className='totalPrice'>Total Price: {formatNumber(total + shippingCost + tax)}$</h3>
    </div>
  );
};

export default Cart;
