import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import { useAuth } from "../Login/useAuth";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import "./Shipment.css";
import { getDatabaseCart, clearLocalShoppingCart } from "../../utilities/databaseManager";
import CheckoutForm from "../CheckoutForm/CheckoutForm";




const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [shipInfo, setshipInfo] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const auth = useAuth();
  const stripePromise = loadStripe('pk_test_51H9lH3CqJX770BQ2PDiTfCb3ClR9TBkTD4FtMz5RtSvaAamHijGlTDb4x3Ank5mK8m2RdrDMOGsYDi18iGhqJRJP00r03iRyvX');

  const onSubmit = (data) => {
    setshipInfo(data);
  }

  const handlePlaceOrder = (payment) => {

    const savedCart = getDatabaseCart();
    const orderDetails = { email: auth.user.email, cart: savedCart, shipment: shipInfo, payment: payment }
    fetch("http://localhost:4000/orderPlaced", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(order => {
        // alert(" successfully place your order with order id: " + order._id)
        // clearLocalShoppingCart();
        setOrderId(order._id)
        clearLocalShoppingCart();
      })
  }



  return (
    <div className="container">
      <div className="row">
        <div style={{ display: shipInfo && "none" }} className="col-md-6">
          <h3>Shipment Information</h3>
          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="your Name" />
            {errors.name ? <span className="text-danger"> <FontAwesomeIcon icon={faTimesCircle} /> Name is required</span> : <span className="text-success">  <FontAwesomeIcon icon={faCheckCircle} />
      Done </span>}

            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Your Email" />
            {errors.email ? <span className="text-danger"><FontAwesomeIcon icon={faTimesCircle} /> Email is required</span> : <span className="text-success">  <FontAwesomeIcon icon={faCheckCircle} />
      Done </span>}

            <input name="Address" ref={register({ required: true })} placeholder="Your Address" />
            {errors.Address ? <span className="text-danger"><FontAwesomeIcon icon={faTimesCircle} /> Address is required</span> : <span className="text-success">  <FontAwesomeIcon icon={faCheckCircle} />
      Done </span>}

            <input name="Address2" ref={register} placeholder="Add more address if you need" />

            <input name="city" ref={register({ required: true })} placeholder="Add City" />
            {errors.city ? <span className="text-danger"><FontAwesomeIcon icon={faTimesCircle} /> City is required</span> : <span className="text-success">  <FontAwesomeIcon icon={faCheckCircle} />
      Done </span>}

            <input name="country" ref={register({ required: true })} placeholder="Your Country" />
            {errors.country ? <span className="text-danger"><FontAwesomeIcon icon={faTimesCircle} /> Country is required</span> : <span className="text-success">  <FontAwesomeIcon icon={faCheckCircle} />
      Done </span>}

            <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code" />
            {errors.zipcode ? <span className="text-danger"><FontAwesomeIcon icon={faTimesCircle} /> Zip Code is required</span> : <span className="text-success">  <FontAwesomeIcon icon={faCheckCircle} />
      Done </span>}

            <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
            {errors.phone ? <span className="text-danger"><FontAwesomeIcon icon={faTimesCircle} /> Phone Number is required</span> : <span className="text-success">  <FontAwesomeIcon icon={faCheckCircle} />
    Done </span>}

            <input type="submit" />
          </form>
        </div>
        <div style={{ display: shipInfo ? "block" : "none" }} className="col-md-6">
          <h3>Payment Information</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
          </Elements> 
       <hr/>
         {
          orderId && <div style={{display: "block"}}><p>amar sonar bangla </p></div> 
         }
        </div>
      </div>
    </div>
  );
};

export default Shipment;
