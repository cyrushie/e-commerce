"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { Resend } from "resend";
import OrderHistoryEmail from "@/email/OrderHistory";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailSchema = z.string().email();

export const ordersHistory = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message?: string; error?: string }> => {
  const validatedFields = emailSchema.safeParse(formData.get("email"));

  if (!validatedFields.success) {
    return { error: "Invalid Email ;)" };
  }

  const user = await db.user.findUnique({
    where: { email: validatedFields.data },
    select: {
      email: true,
      order: {
        select: {
          id: true,
          priceInCents: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              imagePath: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return {
      message: "Check your emai to view your Order History and Download Links",
    };
  }

  const orders = user.order.map(async (order: any) => {
    return {
      ...order,
      downloadVerificationId: (
        await db.downloadVerification.create({
          data: {
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            productId: order.product.id,
          },
        })
      ).id,
    };
  });

  const data = await resend.emails.send({
    from: `Support <${process.env.SENDER_EMAIL}>`,
    to: user.email,
    subject: "Your Order History",
    react: OrderHistoryEmail({ orders: await Promise.all(orders) }),
  });

  if (data.error) {
    return {
      error: "There was a problem sending your email. please try again",
    };
  }

  return {
    message: "Check your emai to view your Order History and Download Links",
  };
};
