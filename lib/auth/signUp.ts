"use server";

import { signUpFormSchema } from "../definitions/signFormSchema";
import User from "@/lib/database/user";
import { hashPassword } from "../utils/hashPassword";
import { createSession } from "../utils/session";
import { parsePhoneNumber } from "libphonenumber-js";
import { handleSequelizeError } from "@/lib/utils/sequelizeError";

type SignUpErrors = {
  email?: string;
  password?: string;
  description?: string;
  phone?: string;
  nume?: string;
  prenume?: string;
};
const adminEmail = process.env.ADMIN_EMAIL;

const SignUp = async (
  formData: FormData
): Promise<{ success: boolean; message: string; errors?: SignUpErrors }> => {
  const phone = formData.get("phone") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;
  const description = formData.get("description") as string | null;
  const nume = formData.get("nume") as string | null;
  const prenume = formData.get("prenume") as string | null;

  // Validate form fields against schema
  const validationResult = signUpFormSchema.safeParse({
    email,
    password,
    description,
    phone,
    nume,
    prenume,
  });

  if (!validationResult.success) {
    const errors: SignUpErrors = {};
    for (const issue of validationResult.error.issues) {
      const key = issue.path[0] as keyof SignUpErrors;
      errors[key] = issue.message;
    }
    return { success: false, message: "Validation errors occurred", errors };
  }

  // Validate phone number
  if (phone) {
    const parsedPhone = parsePhoneNumber(phone, "RO");
    if (parsedPhone.country !== "RO" || !parsedPhone.isValid()) {
      return {
        success: false,
        message: "Validation errors occurred",
        errors: {
          phone: "Phone number must be a valid Romanian number",
        },
      };
    }
  }

  const hashedPassword = await hashPassword(password!);

  try {
    const isAdmin = email === adminEmail;
    console.log(isAdmin, "here is admin ")
    // Attempt to create a new user
    const newUser = await User.create({
      nume: nume,
      prenume: prenume,
      description: description,
      numar: phone,
      email: email,
      password: hashedPassword,
      isAdmin: isAdmin,
    });

    console.log("User created:", newUser.toJSON(), newUser.id);

    await createSession(`${newUser.id}`, isAdmin);

    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.log(error);

    const handleError = handleSequelizeError(error);
    return {
      success: false,
      message: "Failed to create user",
      errors: handleError,
    };
  }
};

export default SignUp;
