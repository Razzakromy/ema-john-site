import React from "react";
import logo from "../../images/logo.png";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCoffee } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="header">
      <img src={logo}></img>
      <nav>
        <a href="/shop">Shop</a>
        <a href="/order">Order Review</a>
        <a href="/manage">Manage Inventory</a>
        <a href="#" className="cartIcon" style={{ color: "#fff" }}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </a>
      </nav>
    </div>
  );
};

export default Header;
