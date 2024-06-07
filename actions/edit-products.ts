"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const editProduct = async (data: FormData) => {
  console.log(data);

  const image = data.get("image0") as File;
  const priceInCents = data.get("priceInCents") as string;
  const file = data.get("file0") as File;

  const product = await db.product.findUnique({
    where: {
      id: data.get("id"),
    },
  });
  if (!product) return notFound();

  let filePath = product.filePath;
  if (file && file.size > 0) {
    await fs.unlink(product.filePath);
    filePath = `products/${crypto.randomUUID()}-${file.name}`;
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
  }

  let imagePath = product.imagePath;
  if (image && image.size > 0) {
    await fs.unlink(`public${product.imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await image.arrayBuffer())
    );
  }

  await db.product.update({
    where: {
      id: data.get("id"),
    },
    data: {
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
