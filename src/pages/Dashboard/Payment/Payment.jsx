import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
  } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const Payment = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
