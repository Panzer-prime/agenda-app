"use server";

import { PhoneNumber } from "../database";
import { handleSequelizeError } from "./sequelizeError";

interface EditContactProps {
  id: number;
  savedName?: string;
  phone?: string;
}

export const editContacts = async ({
  id,
  savedName,
  phone,
}: EditContactProps) => {
  try {
    if (!savedName && !phone) {
      throw new Error("Please add at least one field.");
    }

    const updateData: Partial<EditContactProps> = {};

    if (savedName) {
      updateData.savedName = savedName;
    }
    if (phone) {
      updateData.phone = phone;
    }

    const updatedRows = await PhoneNumber.update(updateData, {
      where: { id: id },
      returning: true,
    });
    const test = await PhoneNumber.findByPk(id);

    console.log(test);
    console.log(updateData);
    console.log(updatedRows);
    if (!updatedRows) {
      throw new Error(`No contact found with ID ${id} ${typeof id}`);
    }

    console.log(`Contact with ID ${id} updated successfully`);
  } catch (error: any) {
    handleSequelizeError(error);
  }
};
