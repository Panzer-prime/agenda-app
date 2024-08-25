import { z } from "zod";
import { parsePhoneNumber } from "libphonenumber-js";

export const signUpFormSchema = z.object({
  email: z.string().email("Email format is wrong").trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .trim(),
  description: z
    .string()
    .min(100, "Description must be at least 100 characters long")
    .trim(),
  phone: z
    .string()
    .regex(/^[\d\s\+\-\(\)]+$/, "Phone number format is wrong")
    .min(10, "phone number too short"),
  nume: z.string({ message: "name is required" }).trim(),
  prenume: z.string().trim(),
});

export const phoneSchema = signUpFormSchema.pick({
  phone: true,
});

export const validatePhoneNumber = (phoneNumber: string) => {
  const validate = phoneSchema.safeParse({
    phone: phoneNumber,
  });

  if (!validate.success) {
    const phoneErrors = validate.error.flatten().fieldErrors.phone;
    if (phoneErrors) {
      const flatErrors = phoneErrors
        .flat()
        .filter((err): err is string => !!err);
      return flatErrors;
    }
    return;
  }

  const romanianValidation = parsePhoneNumber(phoneNumber, "RO");
  if (romanianValidation.country !== "RO" || !romanianValidation.isValid())
    return ["Phone number must be Romanian"];
};
