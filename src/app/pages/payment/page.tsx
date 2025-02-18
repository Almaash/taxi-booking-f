"use client";
import CheckoutForm from "@/components/Payment/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const searchParams = useSearchParams();

  const totCost = searchParams.get("totCost");

  const stripePromise = loadStripe(
    "pk_test_51QshrvHgbFAfKWq8XTmTkbf05hhMIbamEv2y7HXCoamXWJt9DJy281E9Sd3oDuWPATAmtuqujmUTgAbpLivwyXXn00VQc2zHWQ"
  );

  const amountInPaise = totCost ? Math.round(parseFloat(totCost) * 100) : 0;

  console.log(amountInPaise)

  const option: any = {
    mode: "payment",
    amount: amountInPaise,
    currency: "usd",
  };

  return (
    <Elements stripe={stripePromise} options={option}>
      <CheckoutForm />
    </Elements>
  );
};

export default page;
