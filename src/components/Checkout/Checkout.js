import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import swal from 'sweetalert';

import './Checkout.css';
import STRIPE_PUBLISHABLE from '../../constants/stripe';
// import PAYMENT_SERVER_URL from '../../constants/server';

const CURRENCY = 'USD';

const fromUsdToCent = amount => amount * 100;

const successPayment = data => {
    alert('Payment Successful');
};

const errorPayment = data => {
    alert('Payment Error');
};

const onToken = (amount, description) => token =>
    axios.post("/pay",
    {
        description,
        source: token.id,
        currency: CURRENCY,
        amount: fromUsdToCent(amount)
    })
    .then(response =>  {
          swal({
        title: "Payment Successful",
        text: '',
        icon: "success",
        button: "THANK YOU",
      })})
    .catch(response => {
        swal({
            title: "Payment Unsuccessful",
            text: '',
            icon: "error",
            button: "TRY AGAIN",
          })
    });

    const Checkout = ({ name, description, amount }) =>
    <StripeCheckout
        name={name}
        description={description}
        amount={fromUsdToCent(amount)}
        token={onToken(amount, description)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
        shippingAddress
        billingAddress={true}>
        <button className="checkout-btn"> CHECKOUT </button>
    </StripeCheckout>

export default Checkout;