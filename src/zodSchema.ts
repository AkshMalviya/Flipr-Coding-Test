import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name should be atleast 6 Character" })
    .max(25, { message: "Should not exceed 25 character" }),
  email: z.string().email({ message: "Please enter the proper email" }),
  password: z
    .string()
    .min(8, { message: "Password should be atleast 8 characters" })
    .regex(
      RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
      {
        message: "Your password does not match our criteria",
      }
    ),
  gender: z.enum(["Male", "Female"]),
});
