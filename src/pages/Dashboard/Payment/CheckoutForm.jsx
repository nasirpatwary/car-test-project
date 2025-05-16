import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useMyCars } from "../../../hooks/useCollection";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { succesToast, warningToast } from "../../../components/CustomNotification";
import { useNavigate } from "react-router";
const CheckoutForm = () => {
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cars,,, refetch] = useMyCars();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const totalPrice = cars.reduce((total, item) => total + item.price, 0);
  useEffect(() => {
    paymentFun();
  }, [axiosSecure, totalPrice]);
  const paymentFun = async () => {
    if (totalPrice > 0) {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price: totalPrice
      });
      setClientSecret(data.clientSecret);
    }
  };
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    if (!stripe || !elements) return;

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);
    if (card == null) return;

    // Use your card Element with other Stripe.js APIs

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    // confirmPayment
    const {paymentIntent, error: confirmErr} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous"
          },
        },
      },
    );
    if (confirmErr) {
      console.log("confirmErr", confirmErr);
      warningToast(confirmErr.message)
    }
    else  {
      console.log("paymentIntent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const payments = {
          email: user?.email,
          image: user?.photoURL,
          price: parseFloat(totalPrice.toFixed(2)),
          category: cars[0]?.category && cars[0]?.category,
          transitionId: paymentIntent.id,
          date: new Date(),
          carIds: cars.map(car => car._id),
          productIds: cars.map(car => car.productId),
          status: "pending"
        }
        const {data} = await axiosSecure.post("/payments", payments)
        console.log(data);
        refetch()
        if(data.payResult.insertedId){
          succesToast(`payment successfully`)
          navigate("/dashboard/pay-history")
        }
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          disabled={!stripe || !clientSecret}
          className="relative px-5 py-2 cursor-pointer font-medium text-white group mt-4"
        >
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-45 bg-black group-hover:bg-green-600 group-hover:skew-x-45"></span>
          <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-black -rotate-45"></span>
          <span className="relative">Pay</span>
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
