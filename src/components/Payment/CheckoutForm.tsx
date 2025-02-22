import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  
  const [buttonText, setButtonText] = useState("Pay");

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
    
    setButtonText("Processing...");
    const submitResult = await elements.submit();
    
    if (submitResult?.error) {
      setButtonText("Pay");
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

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://${window.location.host}/pages/checkout-success`, // Ensure this URL is where you want to redirect
        // return_url: `http://localhost:3000/pages/checkout-success`, // Ensure this URL is where you want to redirect
      },
      clientSecret,
    });

    if (result.error) {
      console.log(result.error, "error");
    } else if (result.paymentIntent?.status === "succeeded") {
      alert("Payment Successful!");
    } else {
      console.log(result.paymentIntent?.status);
      setButtonText("Pay");
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
          {buttonText}
        </button>
      </form>
      <div className="bg-red-100 m-2 p-2 text-sm rounded-lg shadow-lg border border-red-300">
        <p className="text-gray-800 mb-2">
          <span className="font-medium">Note:</span> This is for testing
          purposes, please use the Testing data.
        </p>
        <div className="bg-red-50 p-3 rounded-md border border-red-200 text-xs">
          <p className="text-gray-700 mb-1">
            <span className=" text-xs">Card No:</span> 4242 4242 4242 4242
          </p>
          <p className="text-gray-700 mb-1">
            <span className=" text-xs">Expiration Date:</span> 12/34
          </p>
          <p className="text-gray-700 mb-1">
            <span className=" text-xs">Country:</span> United States
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
