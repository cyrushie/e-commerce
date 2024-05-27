"use server";

import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export const availabilityToggle = async (
  id: string,
  isAvailableForPurchase: boolean
) => {
  await db.product.update({
    where: { id },
    data: { isAvailableForPurchase },
  });
};

export const deleteProduct = async (id: string) => {
  const product = await db.product.delete({
    where: { id },
  });

  if (!product) return notFound();
};
