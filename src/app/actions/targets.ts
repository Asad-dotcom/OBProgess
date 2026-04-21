"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function upsertTarget(formData: FormData) {
  const orderBookerId = formData.get("orderBookerId") as string;
  const month = parseInt(formData.get("month") as string);
  const year = parseInt(formData.get("year") as string);
  const amount = parseFloat(formData.get("amount") as string);

  if (!orderBookerId || isNaN(month) || isNaN(year) || isNaN(amount)) {
    throw new Error("Missing or invalid fields");
  }

  try {
    await prisma.target.upsert({
      where: {
        orderBookerId_month_year: {
          orderBookerId,
          month,
          year,
        },
      },
      update: {
        amount,
      },
      create: {
        orderBookerId,
        month,
        year,
        amount,
      },
    });
    revalidatePath("/dashboard/targets");
    revalidatePath("/dashboard");
    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to assign target.");
  }
}

export async function getTargets() {
  return await prisma.target.findMany({
    orderBy: [
      { year: 'desc' },
      { month: 'desc' },
    ],
    include: {
      orderBooker: {
        select: { name: true, code: true }
      }
    }
  });
}
