"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const CheckoutSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const payment_intent = searchParams.get("payment_intent");
  const payment_intent_client_secret = searchParams.get(
    "payment_intent_client_secret"
  );
  const redirect_status = searchParams.get("redirect_status");

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
                alert("Payment Successful!");
              } else {
                alert("Payment failed or was not completed.");
              }
            });
        })
        .catch((error) => console.error(error));
    }
  }, [payment_intent, payment_intent_client_secret]);

  return (
    <div className="flex flex-col space-y-5 justify-center items-center h-screen">
      {redirect_status == "succeeded" ? (
        <>
          <Image src="/success.gif" alt="LOGO" height="340" width="340" />
          <button
            onClick={() => router.push(`/?status=${redirect_status}`)}
            className="bg-yellow-400 hover:bg-yellow-600 px-9 py-2  rounded-lg"
          >
            Track Your Cab
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

export default CheckoutSuccess;
