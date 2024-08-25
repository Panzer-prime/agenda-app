"use server"
import { PhoneNumber } from "../database";
import { handleSequelizeError } from "./sequelizeError";


export const deleteContact = async (id: number) => {
  try {
    const results = await PhoneNumber.destroy({
      where: {
        id: id,
      },
    });

    if (results === 0) {
      throw new Error(`no record found with id: ${id}`);
    }
  } catch (error: any) {
    handleSequelizeError(error)
  }
};
