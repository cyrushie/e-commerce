"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const addProduct = async (data: FormData) => {
  console.log(data);

  const file = data.get("file0") as File;
  const image = data.get("image0") as File;
  const priceInCents = data.get("priceInCents") as string;

  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${file.name}`;
  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await image.arrayBuffer())
  );

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.get("name"),
      priceInCents: parseInt(priceInCents),
      description: data.get("description"),
      filePath,
      imagePath,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
};
