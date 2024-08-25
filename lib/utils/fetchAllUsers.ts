"use server";

import { User, PhoneNumber } from "../database";

type PhoneNumberResults = {
  userID: number;
  phone: string;
  savedName: string;
  id: number;
};

type UserResults = {
  id: number;
  nume: string;
  prenume: string;
  numar: string;
  description: string;
};

type UserWithPhoneNumbers = {
  userID: number;
  nume: string;
  prenume: string;
  numar: string;
  description: string;
  phoneNumbers: PhoneNumberResults[];
};

export const fetchAllUsers = async (): Promise<UserWithPhoneNumbers[]> => {
  try {
    const resultsUsers = await User.findAll({
      attributes: ["id", "nume", "prenume", "numar", "description"],
    });

    const resultsPhoneNumbers = await PhoneNumber.findAll({
      attributes: ["id", "phone", "savedName", "userID"],
    });
    console.log(resultsPhoneNumbers, "here is the phone numbers");
    const formattedPhoneResults = resultsPhoneNumbers.map(
      (res) => res.toJSON() as PhoneNumberResults
    );
    console.log(formattedPhoneResults, "here is the formatted formatted");

    const userMap: { [key: number]: UserWithPhoneNumbers } = {};

    resultsUsers.forEach((user) => {
      const userJson = user.toJSON() as UserResults;
      userMap[userJson.id] = {
        userID: userJson.id,
        nume: userJson.nume,
        prenume: userJson.prenume,
        numar: userJson.numar,
        description: userJson.description,
        phoneNumbers: [],
      };
    });

    formattedPhoneResults.forEach((phoneResult) => {
      const userID = phoneResult.userID;
      if (userMap[userID]) {
        userMap[userID].phoneNumbers.push(phoneResult);
      }
    });
    console.log(formattedPhoneResults);
    const resultArray = Object.values(userMap);
    if (resultArray.length === 0) throw new Error("no user couldnt be found");

    console.log(resultArray);
    return resultArray;
  } catch (error: any) {
    console.error("Error fetching users and phone numbers:", error.message);
    throw new Error(error.message);
  }
};
