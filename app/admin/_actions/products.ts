"use server";

import fs from "fs/promises";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

export const availabilityToggle = async (
  id: string,
  isAvailableForPurchase: boolean
) => {
  await db.product.update({
    where: { id },
    data: { isAvailableForPurchase },
  });

  revalidatePath("/");
  revalidatePath("/products");
};

export const deleteProduct = async (id: string) => {
  const product = await db.product.delete({
    where: { id },
  });

  if (!product) return notFound();

  await fs.unlink(product.filePath);
  await fs.unlink(`public/${product.imagePath}`);

  revalidatePath("/");
  revalidatePath("/products");
};
