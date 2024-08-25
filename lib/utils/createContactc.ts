"use server";

import { PhoneNumber } from "../database";
import { decrypt } from "./session";
import { cookies } from "next/headers";
import { handleSequelizeError } from "./sequelizeError";

export const createContact = async (phone: string, name: string) => {
  try {
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);
    console.log(session?.userId);

    const existingPhoneNumber = await PhoneNumber.findOne({
      where: {
        phone: phone,
        userID: session?.userId,
      },
    });

    if (existingPhoneNumber) {
      throw new Error("Phone number already saved for this user.");
    }

    await PhoneNumber.create({
      phone: phone,
      savedName: name,
      userID: session?.userId,
    });
  } catch (error: any) {
    handleSequelizeError(error);
  }
};
