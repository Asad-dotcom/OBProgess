"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrderBooker(formData: FormData) {
  const name = formData.get("name") as string;
  const code = formData.get("code") as string;

  if (!name || !code) {
    throw new Error("Missing required fields");
  }

  try {
    await prisma.orderBooker.create({
      data: {
        name,
        code: code.toUpperCase(),
      },
    });
    revalidatePath("/dashboard/order-bookers");
    revalidatePath("/");
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error("An Order Booker with this code already exists.");
    }
    throw new Error("Failed to register Order Booker.");
  }
}

export async function getOrderBookers() {
  return await prisma.orderBooker.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { sales: true, targets: true }
      }
    }
  });
}
