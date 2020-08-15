import React from "react";
import "./Header.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Login/useAuth";
import welcome from "../../images/welcome.gif";



const Header = () => {
  const auth = useAuth();

  // const [Count, setCount] = useState(0);
  // const previous = usePrevious(Count);

  return (
    <div className="header">
      <nav>
        <a href="/shop">Shop</a>
        <a href="/review">Order Review</a>
        <a href="/manage">Manage Inventory</a>
        {/* <a href="#" className="cartIcon" style={{ color: "#fff" }}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </a> */}
        { auth.user ? 
          <span style={{ color: "yellow" }}> <small style={{color:"gray"}}> <img style={{width:"12%", height:"1.5%"}} src={welcome} alt=""/> </small>{auth.user.name} <a href="/login">Sign Out</a> </span>
        :
        <a href="/login">
          Sign in Please
        </a>
        }

        {/* <button className="btn btn-primary" onClick={() => setCount(Count + 1)}>
          +
        </button>
        <span style={{ color: "green" }}>
          Count: {Count} Previous Count: {previous}
        </span>
        <button className="btn btn-warning" onClick={() => setCount(Count - 1)}>
          -
        </button> */}
      </nav>
    </div>
  );
};

export default Header;
