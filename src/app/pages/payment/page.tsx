"use client";
import CheckoutForm from "@/components/Payment/CheckoutForm";
import { useUserLocation } from "@/context/UserLocationContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Currency } from "lucide-react";
import React from "react";

const page = () => {


  const stripePromise = loadStripe('pk_test_51QshrvHgbFAfKWq8XTmTkbf05hhMIbamEv2y7HXCoamXWJt9DJy281E9Sd3oDuWPATAmtuqujmUTgAbpLivwyXXn00VQc2zHWQ');

  const option: any = {
    mode: 'payment',
    amount: 1000,
    currency : "usd",
  };

  return (
    <Elements stripe={stripePromise} options={option}>
      <CheckoutForm/>
    </Elements>
  )
};

export default page;
