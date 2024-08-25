import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = (password: string) => {
  const newPass = bcrypt.hash(password, saltRounds);
  return newPass;
};
