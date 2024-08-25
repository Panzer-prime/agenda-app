"use server";

import { PhoneNumber } from "../database";
import { decrypt } from "./session";
import { cookies } from "next/headers";
import { handleSequelizeError } from "./sequelizeError";

interface ContactProps {
  savedName: string;
  phone: string;
  id: number;
}

export const fetchContacts = async () => {
  try {
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);

    const contacts = await PhoneNumber.findAll({
      where: {
        userID: session?.userId,
      },
      attributes: ["phone", "savedName", "id"],
    });
    let fetchedContacts = contacts.map(
      (contact) => contact.toJSON() as ContactProps
    );
    if (contacts.length === 0) {
      return (fetchedContacts = []);
    }
    // Return the plain objects
    return fetchedContacts;
  } catch (error) {
    handleSequelizeError(error);
  }
};
