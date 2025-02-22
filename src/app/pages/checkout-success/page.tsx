"use client";
import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const CheckoutSuccess = () => {
  const [buttonText, setButtonText] = useState("Track Your Cab");
  const router = useRouter();
  const searchParams = useSearchParams();

  const payment_intent = searchParams.get("payment_intent");
  const payment_intent_client_secret = searchParams.get(
    "payment_intent_client_secret"
  );
  const redirect_status = searchParams.get("redirect_status");

  const handleClick = () => {
    setButtonText("Redirecting...");
    
    setTimeout(() => {
      router.push(`/?status=${redirect_status}`);
    }, 1000); 
  };

  useEffect(() => {
    if (payment_intent && payment_intent_client_secret) {
      const stripe = loadStripe(
        "pk_test_51QshrvHgbFAfKWq8XTmTkbf05hhMIbamEv2y7HXCoamXWJt9DJy281E9Sd3oDuWPATAmtuqujmUTgAbpLivwyXXn00VQc2zHWQ"
      );

      stripe
        .then((stripeInstance: any) => {
          stripeInstance
            .retrievePaymentIntent(payment_intent_client_secret)
            .then(({ paymentIntent }: any) => {
              if (paymentIntent.status === "succeeded") {
                console.log("Payment Successful!");
              } else {
                alert("Payment failed or was not completed.");
              }
            });
        })
        .catch((error) => console.error(error));
    }
  }, [payment_intent, payment_intent_client_secret]);

  return (
    <div className="flex flex-col justify-center items-center h-screen max-sm:h-full max-sm:mt-20">
      {redirect_status == "succeeded" ? (
        <>
          <Image src="/success2.gif" alt="LOGO" height="300" width="300" />
          <button
            onClick={handleClick}
            className="bg-yellow-400 hover:bg-yellow-600 px-9 py-2  rounded-lg"
          >
            {buttonText}
          </button>
        </>
      ) : (
        <>
          <Image src="/loader.gif" alt="LOGO" height="40" width="40" />
          <h1>Processing Payment</h1>
        </>
      )}
    </div>
  );
};

const CheckoutSuccessWithSuspense = () => (
  <Suspense fallback={<h1>Loading...</h1>}>
    <CheckoutSuccess />
  </Suspense>
);

export default CheckoutSuccessWithSuspense;
