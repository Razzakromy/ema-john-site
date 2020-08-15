import React, { useEffect, useState } from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';



const Review = () => {
    const [cart, setCart] = useState([]);
    const auth = useAuth();
    
    const handleRemoveProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
   
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productkeys = Object.keys(savedCart);

        fetch("http://localhost:4000/getProductsByKey", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productkeys)
            })
        .then (res => res.json())
        .then (data => {
            const cartProducts = productkeys.map(key => {
                const product = data.find( pd => pd.key === key);
                product.quantity = savedCart[key];
                return product
            });
            setCart(cartProducts);
        })
    }, [])
  
    return (
        <div className="twinContainer">
            
           <div className="productContainer">
           
                {
                    cart.map(pd => <ReviewItem 
                        key={pd.key}
                        removeProduct = {handleRemoveProduct}
                        product={pd}></ReviewItem>)
                        
                }
                {
                    !cart.length && 
                    <h1>Your Cart is Empty.... <a href="/shop">Keep Shoping</a> </h1>
                }
           </div>
           <div className="cartContainer">
               <Cart cart={cart}>
                   <Link to="/shipment">
                   { auth.user ? <button className="cartBtn"> Proceed to Checkout</button>:
                       <button className="cartBtn"> Login to Checkout</button>
                       }
                   </Link>
               </Cart>
               
           </div>
        </div>
    );
};

export default Review;