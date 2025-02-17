import { Stripe } from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(
  "sk_test_51QshrvHgbFAfKWq8vubtpRNXAeZYf8uM0I3yanCI7zpbw8bFEKFFFIMj6nO9AXcPVf6tbK9EkXEP0LgO3ueHXV6A00vikwfTrt",
  {
    apiVersion: "2025-01-27.acacia",
  }
);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const amount = data.amount;

    
    if (!amount || typeof amount !== "number") {
      return NextResponse.json(
        { status: 400, message: "Invalid amount" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), 
      currency: "usd",
    });

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { status: 400, message: error.message },
      { status: 400 }
    );
  }
}
