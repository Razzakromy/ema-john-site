import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const CheckoutForm = (props) => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
      setPaymentError(error.message)
      setPaymentSuccess(null);
    } else {
      setPaymentSuccess(paymentMethod)
      const payment = {id: paymentMethod.id, last4: paymentMethod.card.last4};
      props.handlePlaceOrder(payment)
      setPaymentError(null)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {
        paymentError && <p style={{ color: "red" }}><FontAwesomeIcon icon={faTimesCircle} /> {paymentError}</p>
      }
      {
        paymentSuccess && <p style={{ color: "green" }}> <FontAwesomeIcon icon={faCheckCircle}/> Payment Successfully Done :) </p>
      }
    </form>
  );
};
export default CheckoutForm;