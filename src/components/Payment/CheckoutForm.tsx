import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";
import { useRouter } from "next/navigation";


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    if (elements === null || stripe === null) {
      return;
    }
  
    const paymentElement = elements.getElement(PaymentElement);
    if (!paymentElement) {
      console.error("Payment element not found.");
      return;
    }
  
    const submitResult = await elements.submit();
  
    if (submitResult?.error) {
      console.log(submitResult?.error);
      return;
    }
  
    const res = await fetch("/api/create-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 100, // specify the amount
      }),
    });
  
    const { clientSecret } = await res.json();
  
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/pages/checkout-success", // Ensure this URL is where you want to redirect
      },
      clientSecret,
    });
  
    if (error) {
      console.log(error, "error");
    } else if (paymentIntent?.status === "succeeded") {
      // Handle successful payment
      alert("Payment Successful!");
      // You can store data in localStorage or redirect manually if needed
    } else {
      // Handle other payment statuses (if necessary)
      console.log(paymentIntent?.status);
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center w-full mt-5">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button
          type="submit"
          disabled={!stripe || !elements}
          className="w-full bg-yellow-500 p-2 rounded-lg mt-2"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
