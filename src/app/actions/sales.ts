"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSale(formData: FormData) {
  const orderBookerId = formData.get("orderBookerId") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const dateInput = formData.get("date") as string;
  const date = new Date(dateInput);

  if (!orderBookerId || isNaN(amount) || isNaN(date.getTime())) {
    throw new Error("Missing or invalid fields");
  }

  // Normalize date to start of day for consistent matching
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);

  try {
    // Check if a sale already exists for this booker on this date
    const existingSale = await prisma.sale.findFirst({
      where: {
        orderBookerId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existingSale) {
      await prisma.sale.update({
        where: { id: existingSale.id },
        data: { amount: existingSale.amount + amount },
      });
    } else {
      await prisma.sale.create({
        data: {
          orderBookerId,
          amount,
          date: startOfDay,
        },
      });
    }

    revalidatePath("/admin/sales");
    revalidatePath("/admin/reports");
    revalidatePath("/admin");
    revalidatePath("/");
  } catch (error) {
    console.error("Sale logging error:", error);
    throw new Error("Failed to log sale.");
  }
}

export async function addToExistingSale(saleId: string, amountToAdd: number) {
  if (isNaN(amountToAdd) || amountToAdd <= 0) {
    throw new Error("Invalid amount");
  }

  try {
    const sale = await prisma.sale.findUnique({
      where: { id: saleId }
    });

    if (!sale) throw new Error("Sale not found");

    await prisma.sale.update({
      where: { id: saleId },
      data: { amount: sale.amount + amountToAdd }
    });

    revalidatePath("/admin/sales");
    revalidatePath("/admin/reports");
    revalidatePath("/admin");
    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to update sale.");
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
  revalidatePath("/admin/sales");
  revalidatePath("/admin/reports");
  revalidatePath("/admin");
  revalidatePath("/");
}
