import { Product } from "@prisma/client";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(
  req: NextRequest,
  {
    params: { downloadVerificationId },
  }: { params: { downloadVerificationId: string } }
) {
  if (downloadVerificationId == null) return notFound();

  const downloadVerification = await db.downloadVerification.findUnique({
    where: {
      id: downloadVerificationId,
      expiresAt: { gt: new Date() },
    },
    select: { product: { select: { filePath: true, name: true } } },
  });

  if (!downloadVerification) {
    return NextResponse.redirect(
      new URL("/products/download/expired", req.url)
    );
  }

  const data = downloadVerification.product;

  const { size } = await fs.stat(data.filePath);
  const file = await fs.readFile(data.filePath);
  const extension = data.filePath.split(".")[1];

  return new NextResponse(file, {
    headers: {
      "Content-Disposition": `attachment; filename="${data.name}.${extension}"`,
      "Content-Length": size.toString(),
    },
  });
}
