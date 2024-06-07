import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import PurchaseReceiptEmail from "@/email/PurchaseReceipt";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const productId = charge.metadata.productId;
    const pricePaidInCents = charge.amount;
    const email = charge.billing_details.email;

    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (product == null || email == null) {
      return new NextResponse("BadRequest", {
        status: 400,
      });
    }

    const dataField = {
      email,
      order: { create: { productId, priceInCents: pricePaidInCents } },
    };

    const {
      order: [order],
    } = await db.user.upsert({
      where: { email },
      create: dataField,
      update: dataField,
      select: { order: { orderBy: { createdAt: "desc" }, take: 1 } },
    });

    const downloadVerification = await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Order Confirmation",
      react: PurchaseReceiptEmail({
        order,
        product,
        downloadVerificationId: downloadVerification.id,
      }),
    });
  }

  return new NextResponse();
}
