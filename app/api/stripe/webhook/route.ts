import { NextRequest } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.arrayBuffer();
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Stripe webhook error:", err);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};
    console.log("Webhook received", metadata);
    let cart = [];
    try {
      cart = JSON.parse(metadata.cart || "[]");
    } catch {}
    const userId = metadata.userId ? parseInt(metadata.userId) : undefined;
    const totalPrice = session.amount_total ? session.amount_total / 100 : 0;
    try {
      await prisma.order.create({
        data: {
          totalPrice,
          products: cart,
          userId: userId || null,
        },
      });
    } catch (err) {
      console.error("Order save error", err);
    }
  }
  return new Response("ok", { status: 200 });
} 