import { object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    email: string({ required_error: "Email is required" }).email(
      "Not a valid email"
    ),
    password: string({
      required_error: "Name is required",
    }).min(6, "Password should be 6 chars minimum"),
    passwordConfirm: string({
      required_error: "Password confirm is required",
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  }),
});
