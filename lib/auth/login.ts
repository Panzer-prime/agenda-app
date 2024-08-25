"use server";

import bcrypt from "bcrypt";
import User from "@/lib/database/user";
import { createSession } from "../utils/session";

export default async function login(formData: FormData) {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const user = await User.findOne({
      where: { email: email },
      attributes: ["password", "id", "isAdmin"],
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const formatUser = user.toJSON() as { isAdmin: boolean; id: number };

    await createSession(`${formatUser.id}`, formatUser.isAdmin);

    return { success: true };
  } catch (error: any) {
    console.error("Login error:", error);
    throw new Error(error.message);
  }
}
