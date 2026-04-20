"use server";

import prisma from "@/lib/prisma";
import { login, logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export type AuthState = {
  error?: string;
  success?: boolean;
};

export async function authenticate(prevState: AuthState | null, formData: FormData): Promise<AuthState> {
  const username = (formData.get("username") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Missing username or password" };
  }

  try {
    // Check for admin user in DB
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return { error: "Invalid credentials" };
    }

    // SIMPLE PLAINTEXT COMPARISON
    if (admin.password !== password) {
      return { error: "Invalid credentials" };
    }

    await login(username);
  } catch (e) {
    return { error: "Something went wrong" };
  }

  // Redirect occurs outside the try-catch for better Next.js behavior
  redirect("/admin");
}

export async function signout() {
  await logout();
  redirect("/");
}

// Helper to create initial admin if none exists
export async function seedAdmin() {
  const count = await prisma.admin.count();
  if (count === 0) {
    await prisma.admin.create({
      data: {
        username: "admin",
        password: "admin123", // Store as plaintext
      }
    });
    return { message: "Admin created with username 'admin' and password 'admin123'" };
  }
}
