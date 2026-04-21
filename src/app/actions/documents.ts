"use server";

import { put } from "@vercel/blob";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function uploadStockPdf(formData: FormData) {
  const file = formData.get("file") as File;
  const title = formData.get("title") as string;

  if (!file || !title) {
    throw new Error("Missing file or title");
  }

  // On Vercel, this uses the BLOB_READ_WRITE_TOKEN
  // For local development, we fallback to public/uploads
  try {
    let url = "";

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(file.name, file, {
        access: "public",
      });
      url = blob.url;
    } else {
      // Local development fallback
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      
      // Ensure directory exists
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const filePath = path.join(uploadDir, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
      
      await fs.writeFile(filePath, buffer);
      url = `/uploads/${filename}`;
    }

    await prisma.stockPdf.create({
      data: {
        title,
        url,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Failed to upload PDF coordinate storage.");
  }
}

export async function getStockPdfs() {
  return await prisma.stockPdf.findMany({
    orderBy: { createdAt: 'desc' }
  });
}
