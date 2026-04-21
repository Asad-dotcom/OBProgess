"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSale(formData: FormData) {
  const orderBookerId = formData.get("orderBookerId") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const date = new Date(formData.get("date") as string);

  if (!orderBookerId || isNaN(amount) || isNaN(date.getTime())) {
    throw new Error("Missing or invalid fields");
  }

  try {
    await prisma.sale.create({
      data: {
        orderBookerId,
        amount,
        date,
      },
    });
    revalidatePath("/dashboard/sales");
    revalidatePath("/dashboard");
    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to log sale.");
  }
}

export async function getSales(limit = 10) {
  return await prisma.sale.findMany({
    take: limit,
    orderBy: { date: 'desc' },
    include: {
      orderBooker: {
        select: { name: true, code: true }
      }
    }
  });
}

export async function deleteSale(id: string) {
  await prisma.sale.delete({ where: { id } });
  revalidatePath("/dashboard/sales");
  revalidatePath("/dashboard");
  revalidatePath("/");
}
